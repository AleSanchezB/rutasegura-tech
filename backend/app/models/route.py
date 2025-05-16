# models/route.py
from typing import Optional, List
from sqlalchemy import String, Integer, Time, ForeignKey, Table, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel

class Route(BaseModel):
    __tablename__ = "routes"
    __table_args__ = (Index("idx_route_name", "name"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    start_time: Mapped[Optional[str]] = mapped_column(Time, nullable=False)
    end_time: Mapped[Optional[str]] = mapped_column(Time, nullable=False)

    # Relaciones
    stops: Mapped[List["Stop"]] = relationship("Stop", back_populates="route", cascade="all, delete-orphan")
    gps_devices: Mapped[List["GPSDevice"]] = relationship("GPSDevice", back_populates="route")

    def __repr__(self):
        return f"<Route(name={self.name}, start={self.start_time}, end={self.end_time})>"

class Stop(BaseModel):
    __tablename__ = "stops"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    order: Mapped[int] = mapped_column(Integer, nullable=False)

    route_id: Mapped[int] = mapped_column(ForeignKey("routes.id"), nullable=False)
    route: Mapped["Route"] = relationship("Route", back_populates="stops")

    def __repr__(self):
        return f"<Stop(name={self.name}, order={self.order})>"
