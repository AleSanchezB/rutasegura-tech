from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str | None = None

    model_config = {
        "from_attributes": True
    }

class LoginResponse(BaseModel):
    user: UserOut
    token: str
