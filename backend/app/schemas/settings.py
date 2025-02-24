from pydantic import BaseModel, Field
from typing import Literal

class ThemeSettings(BaseModel):
    """Theme settings schema"""
    mode: Literal["light", "dark"] = "light"
    primary_color: str = Field(
        "#007AFF",
        pattern="^#[0-9a-fA-F]{6}$"
    )
    secondary_color: str = Field(
        "#5856D6",
        pattern="^#[0-9a-fA-F]{6}$"
    )
    background: str = Field(
        "gradient-1",
        pattern="^gradient-[1-5]$"
    )

class NotificationSettings(BaseModel):
    """Notification settings schema"""
    sound_enabled: bool = True
    notification_type: Literal["sound", "browser", "both"] = "both"
    volume: float = Field(
        0.7,
        ge=0.0,
        le=1.0,
        description="Volume level between 0.0 and 1.0"
    )

class Settings(BaseModel):
    """Combined settings schema"""
    theme: ThemeSettings
    notifications: NotificationSettings 