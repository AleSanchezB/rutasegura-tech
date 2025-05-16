from fastapi import Request, Depends, HTTPException
from fastapi import APIRouter, Depends
from datetime import timedelta, datetime, timezone
from db.database import get_db
import jwt
from core.settings import settings
from sqlalchemy.orm import Session


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.JWT_ALGORITHM
TIME_TO_EXPIRE = settings.ACCESS_TOKEN_EXPIRE_MINUTES
router = APIRouter(prefix="/auth", tags=["Auth"])

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()

    if expires_delta:
        expiration = datetime.now(timezone.utc) + expires_delta
    else:
        expiration = datetime.now(timezone.utc) + timedelta(minutes = TIME_TO_EXPIRE)
    
    to_encode.update({"exp": expiration})
    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"])

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.exceptions.InvalidTokenError:
        raise HTTPException(
            status_code = 401,
            detail = "Invalid token"
        )

def get_access_token(request: Request):
    access_token = request.cookies.get("token")
    if not access_token:
        raise HTTPException(
            status_code = 404,
            detail = "Access token not found"
        )
    return access_token

@router.get("/google/callback")
async def auth_google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)

    # --- Aquí podrías guardar o buscar al usuario en la base de datos ---
    # user = get_user_by_email(db, user_info["email"])
    # if not user:
    #     user = create_user_from_google_info(db, user_info)

    # Por ahora asumamos que `sub` (el ID de Google) será el sub del token
    access_token = create_access_token(
        data={"sub": user_info["sub"], "email": user_info["email"]}
    )

    response = JSONResponse(content={"access_token": access_token})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=60 * settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        secure=False,  # ponlo en True en producción con HTTPS
        samesite="Lax",
        path="/"
    )

    return response
