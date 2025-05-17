from pydantic import BaseModel
from typing import Optional

class UserOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str | None = None
    
    model_config = {
        "from_attributes": True
    }

class UserOutput(BaseModel):
    id: int
    first_name: str
    last_name: str
    second_last_name: Optional[str] = None
    email: str
    is_active: bool = False
    is_employee: bool = True
    
    
class LoginResponse(BaseModel):
    user: UserOut
    token: str

class UserInput(BaseModel):
    first_name: str
    last_name: str
    second_last_name: Optional[str] = None
    email: str
    phone_number: Optional[str] = None
    password: Optional[str] = None
    is_admin: bool = False
    is_employee: bool = True
    
    def __repr__(self):
        return f"<User(name={self.first_name}, email={self.email}, is_admin={self.is_admin})>"

class UserInputUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    second_last_name: Optional[str] = None
    email: Optional[str]
    phone_number: Optional[str]
    profile_photo: Optional[str]
    is_admin: Optional[bool]
    is_employee: bool = True

    def __repr__(self):
        return f"<User(name={self.first_name}, email={self.email}, is_admin={self.is_admin})>"
