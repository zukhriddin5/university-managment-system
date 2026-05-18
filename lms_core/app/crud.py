from sqlalchemy.orm import Session
from . import models, schemas

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=user.password,  # Use real hashing for production!
        is_instructor=user.is_instructor,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_course(db: Session, course: schemas.CourseCreate):
    db_course = models.Course(
        name=course.name,
        description=course.description,
        instructor_id=course.instructor_id,
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

def enroll_user(db: Session, user_id: int, course_id: int):
    db_enrollment = models.Enrollment(user_id=user_id, course_id=course_id)
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment

def create_assignment(db: Session, assignment: schemas.AssignmentCreate):
    db_assignment = models.Assignment(
        course_id=assignment.course_id,
        title=assignment.title,
        description=assignment.description,
        due_date=assignment.due_date,
    )
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

def create_submission(db: Session, submission: schemas.SubmissionCreate):
    db_submission = models.Submission(
        assignment_id=submission.assignment_id,
        student_id=submission.student_id,
        content=submission.content,
        grade=None
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission