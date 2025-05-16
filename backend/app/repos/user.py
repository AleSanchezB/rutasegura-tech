from fastapi import UploadFile
from .base import BaseRepo
from models.user import  User

class UserRepo(BaseRepo):

    def create(self, data: User) -> User:
        """ Crea un nuevo usuario en la base de datos. """
        self.session.add(data)
        self.session.commit()
        self.session.refresh(data)
        return data

    def get_by_id(self, user_id: int) -> User:
        """ Obtiene un usuario por su ID. """
        return self.session.query(User).filter(User.id == user_id).first()

    def get_by_email(self, email: str) -> User:
        """ Obtiene un usuario por su correo electrónico. """
        return self.session.query(User).filter(User.email == email).first()

    def get_all(self):
        """ Obtiene todos los usuarios. """
        return self.session.query(User).all()

    def update(self, user_id: int, data: dict) -> User:
        """ Actualiza los datos de un usuario. """
        user = self.get_by_id(user_id)
        if user:
            for key, value in data.items():
                if hasattr(user, key): 
                    setattr(user, key, value)
            self.session.commit()
            self.session.refresh(user)
        return user

    def delete(self, user_id: int) -> bool:
        """ Desactiva un usuario por su ID. Retorna True si se desactivó. """
        user = self.get_by_id(user_id)
        if user:
            user.is_active = False
            self.session.commit()
            return True
        return False
