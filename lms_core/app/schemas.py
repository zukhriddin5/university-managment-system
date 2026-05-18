from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    is_instructor: Optional[bool] = False

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    is_instructor: bool

    class Config:
        orm_mode = True

class CourseCreate(BaseModel):
    name: str
    description: Optional[str] = None
    instructor_id: int

class CourseOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    instructor_id: int

    class Config:
        orm_mode = True

class EnrollmentCreate(BaseModel):
    user_id: int
    course_id: int

class AssignmentCreate(BaseModel):
    course_id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class AssignmentOut(BaseModel):
    id: int
    course_id: int
    title: str
    description: Optional[str]
    due_date: Optional[datetime]

    class Config:
        orm_mode = True

class SubmissionCreate(BaseModel):
    assignment_id: int
    student_id: int
    content: str

class SubmissionOut(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    content: str
    submitted_at: datetime
    grade: Optional[int]

    class Config:
        orm_mode = True