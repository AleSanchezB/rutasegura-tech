from fastapi import HTTPException, status, Depends, Request
from sqlalchemy.orm import Session
from core.dependencies import get_db
from repos.user import UserRepo
from models.user import User
from schemas.user import UserInput, UserInputUpdate
from utils.security import hash_password
from utils.utils import orm_to_dict

def create_user(user_input: UserInput, db: Session) -> dict:
    """
    Transforma el objeto Pydantic validado en un modelo ORM, llama al Repository para crear
    el usuario y luego transforma el objeto ORM resultante en un diccionario para la respuesta.
    """
    # Pydantic --> ORM
    hashed_password = hash_password(user_input.password)
    new_user = User(
        academic_id=user_input.academic_id,
        first_name=user_input.first_name,
        last_name=user_input.last_name,
        second_last_name=user_input.second_last_name,
        email=user_input.email,
        password=hashed_password,
        profile_photo=user_input.profile_photo,
        is_admin=user_input.is_admin,
        is_super_admin=user_input.is_super_admin,
    )
    user_repo = UserRepo(db)
    created_user = user_repo.create(new_user)
    user_response = orm_to_dict(created_user, exclude=["password"])
    return user_response

def get_user(user_id: int, db: Session) -> dict:
    user_repo = UserRepo(db)
    user = user_repo.get_by_id(user_id)
    if not user:
        return None
    user_response = orm_to_dict(user)
    return user_response

def update_user(user_id: int, user_input: UserInputUpdate, db: Session) -> dict:
    update_data = user_input.dict(exclude_unset=True)
    user_repo = UserRepo(db)
    updated_user = user_repo.update(user_id, update_data)
    if not updated_user:
        return None
    return {
        "user_id": updated_user.user_id,
        "first_name": updated_user.first_name,
        "last_name": updated_user.last_name,
        "second_last_name": updated_user.second_last_name,
        "email": updated_user.email,
        "profile_photo": updated_user.profile_photo,
        "is_admin": updated_user.is_admin,
        "is_super_admin": updated_user.is_super_admin,
    }

def delete_user(user_id: int, db: Session) -> bool:
    user_repo = UserRepo(db)
    return user_repo.delete(user_id)

def get_all_users(db: Session):
    user_repo = UserRepo(db)
    users = user_repo.get_all()
    if not users:
        return None
    user_reponse = [orm_to_dict(user) for user in users]
    return user_reponse
    
