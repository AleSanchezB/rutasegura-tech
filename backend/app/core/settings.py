import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import ValidationError


class Settings(BaseSettings):
    ENVIRONMENT: str = "dev"
    SECRET_KEY: str
    DATABASE_URL: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_ALGORITHM: str = "HS256"

    # CORS settings
    ORIGINS: List[str]
    CORS_CREDENTIALS: bool = True
    CORS_METHODS: List[str] = ["*"]
    CORS_HEADERS: List[str] = ["*"]

    # Google OAuth settings
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    class Config:
        env_file = os.path.join(os.path.dirname(__file__), "../../.env")


try:
    settings = Settings()
except ValidationError as e:
    raise ValueError(f"Configuración inválida: {e}")

print("✅ Configuración cargada correctamente")
print(f"📌 DATABASE_URL: {settings.DATABASE_URL}")
