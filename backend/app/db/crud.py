from sqlalchemy.orm import Session
from models.user import User  # Ajusta si usas alias o import relativo


def get_or_create_user(db: Session, email: str, first_name: str, last_name: str):
    with db.begin():
        user = db.query(User).filter(User.email == email).first()
        if user:
            return user
        user = User(email=email, first_name=first_name, last_name=last_name)
        db.add(user)
    db.refresh(user)
    return user
