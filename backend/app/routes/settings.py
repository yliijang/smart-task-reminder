from fastapi import APIRouter, HTTPException
from app.schemas.settings import Settings, ThemeSettings, NotificationSettings
from typing import Dict
import json
import os
from pathlib import Path

router = APIRouter()

# In a production environment, this would be stored in a database
SETTINGS_FILE = Path("settings.json")

def load_settings() -> Dict:
    """Load settings from file"""
    if not SETTINGS_FILE.exists():
        default_settings = {
            "theme": {
                "mode": "light",
                "primary_color": "#007AFF",
                "secondary_color": "#5856D6",
                "background": "gradient-1"
            },
            "notifications": {
                "sound_enabled": True,
                "notification_type": "both",  # "sound", "browser", or "both"
                "volume": 0.7
            }
        }
        save_settings(default_settings)
        return default_settings
    
    with open(SETTINGS_FILE, "r") as f:
        return json.load(f)

def save_settings(settings: Dict) -> None:
    """Save settings to file"""
    with open(SETTINGS_FILE, "w") as f:
        json.dump(settings, f, indent=2)

@router.get("/", response_model=Settings)
async def get_settings():
    """Get all settings"""
    return load_settings()

@router.put("/theme", response_model=ThemeSettings)
async def update_theme_settings(settings: ThemeSettings):
    """Update theme settings"""
    current_settings = load_settings()
    current_settings["theme"] = settings.dict()
    save_settings(current_settings)
    return settings

@router.put("/notifications", response_model=NotificationSettings)
async def update_notification_settings(settings: NotificationSettings):
    """Update notification settings"""
    current_settings = load_settings()
    current_settings["notifications"] = settings.dict()
    save_settings(current_settings)
    return settings 