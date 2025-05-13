from typing import Optional
from sqlalchemy import Boolean, Integer, String, Index, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import BaseModel

class User(BaseModel):
    __tablename__ = 'users'
    __table_args__ = (Index('idx_user_email', 'email'),)
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    second_last_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    phone_number: Mapped[Optional[str]] = mapped_column(String(15), nullable=True)
    password: Mapped[str] = mapped_column(String, nullable=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"<User(name={self.first_name}, email={self.email}, is_admin={self.is_admin})>"
