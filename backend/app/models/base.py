from datetime import datetime
from sqlalchemy import DateTime, func, Boolean
from sqlalchemy.orm import Mapped, mapped_column, declarative_base

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    
