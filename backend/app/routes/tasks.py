from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.models.task import Task, PriorityLevel
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.database import get_db
from app.services.reminder import schedule_task_reminder

router = APIRouter()

@router.post("/", response_model=TaskResponse)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task with reminder"""
    db_task = Task(
        title=task.title,
        priority=task.priority,
        reminder_time=task.reminder_time
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    # Schedule reminder for the task
    schedule_task_reminder(db_task)
    
    return db_task

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    skip: int = 0,
    limit: int = 100,
    sort_by: str = "reminder_time",
    db: Session = Depends(get_db)
):
    """Get all tasks with optional sorting and pagination"""
    query = db.query(Task)
    
    if sort_by == "priority":
        query = query.order_by(Task.priority.desc())
    elif sort_by == "reminder_time":
        query = query.order_by(Task.reminder_time.asc())
    
    tasks = query.offset(skip).limit(limit).all()
    return tasks

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a specific task by ID"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db)
):
    """Update a task"""
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    
    # Reschedule reminder if reminder_time was updated
    if "reminder_time" in update_data:
        schedule_task_reminder(db_task)
    
    return db_task

@router.delete("/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"} 