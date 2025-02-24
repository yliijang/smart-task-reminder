from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List
import uvicorn
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

app = FastAPI(
    title="Smart Task Reminder Assistant",
    description="A modern web application for managing tasks and receiving intelligent reminders",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.start()

# Import routers after app initialization
from app.routes import tasks, settings

# Include routers
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Smart Task Reminder Assistant API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 