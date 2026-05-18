from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, schemas, crud
from .schemas import SubmissionCreate, SubmissionOut
from .crud import create_submission
from typing import List
from fastapi.responses import StreamingResponse
import csv
from io import StringIO
import threading
import grpc
from concurrent import futures
import app.lms_pb2 as lms_pb2
import app.lms_pb2_grpc as lms_pb2_grpc



app = FastAPI()

class LMSCoreServicer(lms_pb2_grpc.LMSCoreServicer):
    def IsEnrolled(self, request, context):
        with SessionLocal() as db:
            found = db.query(models.Enrollment).filter_by(user_id=request.user_id, course_id=request.course_id).first()
            return lms_pb2.IsEnrolledReply(enrolled=bool(found))

def serve_grpc():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    lms_pb2_grpc.add_LMSCoreServicer_to_server(LMSCoreServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

@app.on_event("startup")
def start_grpc_server():
    threading.Thread(target=serve_grpc, daemon=True).start()

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Users
@app.post("/users/", response_model=schemas.UserOut)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)

# Courses
@app.post("/courses/", response_model=schemas.CourseOut)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    return crud.create_course(db, course)

# Enrollments
@app.post("/enrollments/")
def enroll_user(enrollment: schemas.EnrollmentCreate, db: Session = Depends(get_db)):
    return crud.enroll_user(db, enrollment.user_id, enrollment.course_id)

# Assignment
@app.post("/assignments/")
def create_assignment(assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)):
    return crud.create_assignment(db, assignment)

@app.post("/submissions/", response_model=SubmissionOut)
def submit_assignment(submission: SubmissionCreate, db: Session = Depends(get_db)):
    return create_submission(db, submission)

@app.get("/submissions/{assignment_id}", response_model=List[SubmissionOut])
def get_submissions(assignment_id: int, db: Session = Depends(get_db)):
    return db.query(models.Submission).filter(models.Submission.assignment_id == assignment_id).all()

@app.get("/grades/export/{course_id}")
def export_grades(course_id: int, db: Session = Depends(get_db)):
    results = (
        db.query(models.Submission, models.User.name.label('student_name'), models.Assignment.title.label('assignment_title'))
        .join(models.User, models.Submission.student_id == models.User.id)
        .join(models.Assignment, models.Submission.assignment_id == models.Assignment.id)
        .join(models.Course, models.Assignment.course_id == models.Course.id)
        .filter(models.Course.id == course_id)
        .all()
    )

    def iter_csv():
        si = StringIO()
        cw = csv.writer(si)
        cw.writerow(['Student', 'Assignment', 'Grade'])
        for submission, student_name, assignment_title in results:
            cw.writerow([student_name, assignment_title, submission.grade if submission.grade is not None else ''])
        yield si.getvalue()
        si.seek(0)
        si.truncate(0)

    return StreamingResponse(iter_csv(), media_type="text/csv")