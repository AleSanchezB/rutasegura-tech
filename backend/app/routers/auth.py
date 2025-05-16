from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from core.dependencies import get_db
from schemas.auth import (
    LoginForm,
    TokenRequest,
    TokenResponse,
    CheckAuthResponse,
    UserInfo,
    GoogleLoginRequest  # ← Nuevo esquema que incluye el ID token de Google
)
from schemas.user import LoginResponse
from controllers.auth import (
    authenticate_user,
    get_current_user,
    refresh_token,
    authenticate_google_user  # ← Nuevo controlador que implementa login con Google
)

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/login/", response_model=TokenResponse)
async def login_router(form_data: LoginForm, db: Session = Depends(get_db)):
    """
    Endpoint para iniciar sesión clásico y obtener el token JWT.
    """
    return authenticate_user(form_data, db)

@auth_router.post("/google/", response_model=LoginResponse)
async def google_login_router(google_data: GoogleLoginRequest, db: Session = Depends(get_db)):
    print("Google Login Payload:", google_data)
    return authenticate_google_user(google_data.id_token, db)

@auth_router.post("/verify-token/", response_model=CheckAuthResponse)
async def verify_token_router(token_request: TokenRequest, db: Session = Depends(get_db)):
    """
    Verifica el token JWT personalizado del sistema y devuelve datos del usuario.
    """
    user = get_current_user(token_request.token, db)
    print("User from token:", user)
    user_info = {
        "user_id": user.id,
    }
    return {"user_info": user_info}

@auth_router.post("/refresh/", response_model=TokenResponse)
async def refresh_token_endpoint(token_request: TokenRequest, db: Session = Depends(get_db)):
    """
    Renueva un token JWT personalizado basado en el actual.
    """
    return refresh_token(token_request, db)
