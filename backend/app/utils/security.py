import bcrypt
import jwt
from models.user import User

ACCESS_TOKEN_EXPIRE_MINUTES = 60

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())

def get_user_role(user) -> str:
    if user.is_super_admin:
        return "super_admin"
    elif user.is_admin:
        return "admin"
    else:
        return "user"

def create_jwt_token(user: User) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(user.user_id),
        "email": user.email,
        "is_admin": user.is_admin,
        "exp": expire,
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,  # clave secreta desde settings.py o .env
        algorithm="HS256"
    )
    return token
