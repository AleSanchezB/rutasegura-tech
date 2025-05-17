from pydantic import BaseModel, Field
from typing import List
from datetime import time

class RouteBase(BaseModel):
    name: str = Field(..., example="Ruta 1")
    start_time: time = Field(..., example="06:00")
    end_time: time = Field(..., example="10:00")
    stops: List[str] = Field(..., example=["Parada A", "Parada B", "Parada C"])

class RouteInput(RouteBase):
    pass

class RouteUpdate(BaseModel):
    name: str | None = None
    start_time: time | None = None
    end_time: time | None = None
    stops: List[str] | None = None

class RouteOutput(RouteBase):
    id: int

    class Config:
        orm_mode = True
