from datetime import datetime
from app.models.task import Task, PriorityLevel
from app.main import scheduler
import logging

logger = logging.getLogger(__name__)

def get_notification_settings(priority: PriorityLevel) -> dict:
    """Get notification settings based on task priority"""
    settings = {
        PriorityLevel.HIGH: {
            "sound": "alert.mp3",
            "volume": 1.0,
            "repeat_interval": 5  # minutes
        },
        PriorityLevel.MEDIUM: {
            "sound": "notification.mp3",
            "volume": 0.7,
            "repeat_interval": 10
        },
        PriorityLevel.LOW: {
            "sound": "subtle.mp3",
            "volume": 0.5,
            "repeat_interval": 15
        }
    }
    return settings.get(priority, settings[PriorityLevel.MEDIUM])

def send_notification(task: Task):
    """Send notification for a task"""
    settings = get_notification_settings(task.priority)
    
    # Log notification (in production, this would trigger actual notifications)
    logger.info(
        f"Notification for task '{task.title}' (Priority: {task.priority})\n"
        f"Sound: {settings['sound']}, Volume: {settings['volume']}"
    )
    
    # In a real implementation, this would:
    # 1. Send browser notification
    # 2. Play sound
    # 3. Update UI
    return True

def schedule_task_reminder(task: Task):
    """Schedule a reminder for a task"""
    # Generate a unique job ID for the task
    job_id = f"task_{task.id}_reminder"
    
    # Remove existing job if it exists
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)
    
    # Only schedule if reminder time is in the future
    if task.reminder_time > datetime.utcnow():
        settings = get_notification_settings(task.priority)
        
        # Schedule the initial notification
        scheduler.add_job(
            send_notification,
            'date',
            run_date=task.reminder_time,
            args=[task],
            id=job_id
        )
        
        # Schedule repeating notifications based on priority
        scheduler.add_job(
            send_notification,
            'interval',
            minutes=settings['repeat_interval'],
            start_date=task.reminder_time,
            args=[task],
            id=f"{job_id}_repeat"
        ) 