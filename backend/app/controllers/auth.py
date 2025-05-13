from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from core.dependencies import get_db
from core.settings import Settings
from core.auth import create_access_token, decode_access_token
from utils.security import verify_password
from models.user import User
from schemas.auth import LoginForm, TokenResponse, TokenRequest
from schemas.user import LoginResponse,UserOut
from db.crud import get_or_create_user

settings = Settings()

def authenticate_user(form_data: LoginForm, db: Session) -> TokenResponse:
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
        )

    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=token)

def authenticate_google_user(id_token_str: str, db: Session) -> LoginResponse:
    try:
        id_info = id_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
        email = id_info["email"]
        name = id_info.get("name", "Google User")

        first_name = name.split()[0] if name else None
        last_name = " ".join(name.split()[1:]) if len(name.split()) > 1 else None

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ID token de Google inválido"
        )

    user = get_or_create_user(db, email, first_name, last_name)
    access_token = create_access_token({"sub": str(user.id)})

    return LoginResponse(
        user=UserOut.from_orm(user),
        token=access_token
    )



def get_current_user(token: str, db: Session) -> User:
    payload = decode_access_token(token)
    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    return user

def refresh_token(token_request: TokenRequest, db: Session) -> TokenResponse:
    user = get_current_user(token_request.token, db)
    new_token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=new_token)
