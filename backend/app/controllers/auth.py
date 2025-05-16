from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from core.dependencies import get_db
from core.settings import Settings
from core.auth import create_access_token, decode_access_token
from utils.security import verify_password, get_user_role
from models.user import User
from schemas.auth import LoginForm, TokenResponse, TokenRequest
from schemas.user import LoginResponse,UserOut
from db.crud import get_or_create_user
from repos.user import UserRepo

settings = Settings()

def authenticate_user(form_data: LoginForm, db: Session) -> TokenResponse:
    user_repo = UserRepo(db)
    user = user_repo.get_by_email(form_data.email)

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
        )

    token = create_access_token({"sub": str(user.id)})
    print("Token:", token)
    return TokenResponse(access_token=token, token_type="bearer")

def authenticate_google_user(id_token_str: str, db: Session) -> LoginResponse:
    try:
        id_info = id_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
        email = id_info["email"]
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El token no contiene un email válido"
            )
        
        name = id_info.get("name", "Google User")

        first_name = name.split()[0] if name else None
        last_name = " ".join(name.split()[1:]) if len(name.split()) > 1 else None

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ID token de Google inválido"
        )

    user = get_or_create_user(db, email, first_name, last_name)
    print("User from Google:", user)
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

def refresh_token(token_request: TokenRequest, db: Session = Depends(get_db)):
    """
    Renueva el token JWT basado en el token actual.
    """
    payload = decode_access_token(token_request.token)

    if not payload or payload.get("sub") is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token")
    
    user_id: str = payload.get("sub")
    user_repo = UserRepo(db)
    user = user_repo.get_by_id(user_id)

    if user is None:
        raise HTTPException(
            status_code=401, 
            detail="User not found")
    
    new_token = create_access_token(data={
        "sub": user.user_id,
    })
    return TokenResponse(access_token=new_token, token_type="bearer")

def autorize_user(user: User, role: str):
    """
    Verifica si el usuario tiene el rol necesario para acceder a un recurso.
    """
    user_role = get_user_role(user)
    if user_role != role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not have enough privileges",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_user(user_id: int, db: Session) -> User:
    print(f"Attempting to fetch user with ID: {user_id}")
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        print(f"User found: {user}")
    else:
        print(f"No user found with ID: {user_id}")
    return user

