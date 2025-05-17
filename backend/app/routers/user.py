from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from controllers.user import (
    get_user,
    update_user,
    delete_user,
    create_user,
)
from core.dependencies import get_db
from schemas.user import UserInput, UserInputUpdate, UserOutput

user_router = APIRouter(prefix="/users", tags=["Usuarios"])

@user_router.post("/", status_code=status.HTTP_201_CREATED)
def create_user_router(user_input: UserInput, db: Session = Depends(get_db)):
    print("User Input:", user_input)
    user = create_user(user_input, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="No se pudo crear el usuario")
    return user

@user_router.get("/{user_id}")
def get_user_router(user_id: int, db: Session = Depends(get_db)):
    print("User ID:", user_id)
    user = get_user(user_id, db)
    print("User from DB:", user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado")
    return user

@user_router.put("/{user_id}")
def update_user_router(user_id: int, user_input: UserInputUpdate, db: Session = Depends(get_db)):
    user = update_user(user_id, user_input, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado")
    return user

@user_router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_router(user_id: int, db: Session = Depends(get_db)):
    if not delete_user(user_id, db):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado")
    return
