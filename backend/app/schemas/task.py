from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from app.models.task import PriorityLevel

class TaskBase(BaseModel):
    """Base Task Schema"""
    title: str = Field(..., min_length=1, max_length=200)
    priority: PriorityLevel
    reminder_time: datetime

class TaskCreate(TaskBase):
    """Task Creation Schema"""
    pass

class TaskUpdate(BaseModel):
    """Task Update Schema - all fields optional"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    priority: Optional[PriorityLevel] = None
    reminder_time: Optional[datetime] = None

class TaskResponse(TaskBase):
    """Task Response Schema"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 