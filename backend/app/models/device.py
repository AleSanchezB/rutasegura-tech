# models/gps_device.py
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel
from typing import Optional

class GPSDevice(BaseModel):
    __tablename__ = "gps_devices"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    serial_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True)

    route_id: Mapped[Optional[int]] = mapped_column(ForeignKey("routes.id"))
    route: Mapped[Optional["Route"]] = relationship("Route", back_populates="gps_devices")

    def __repr__(self):
        return f"<GPSDevice(serial={self.serial_number}, active={self.is_active})>"
