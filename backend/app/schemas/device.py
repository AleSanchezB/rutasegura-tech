from pydantic import BaseModel, Field
from typing import Optional

class DeviceBase(BaseModel):
    name: str = Field(..., example="GPS Tracker 123")
    type: str = Field(..., example="GPS")
    identifier: str = Field(..., example="ABC123XYZ")

class DeviceInput(DeviceBase):
    assigned_to: Optional[int] = Field(None, example=1)

class DeviceUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    identifier: Optional[str] = None
    assigned_to: Optional[int] = None

class DeviceOutput(DeviceBase):
    id: int
    assigned_to: Optional[int]

    class Config:
        orm_mode = True
