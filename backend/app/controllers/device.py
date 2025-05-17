from sqlalchemy.orm import Session
from models.device import GPSDevice
from schemas.device import DeviceInput, DeviceUpdate

def create_device(device_input: DeviceInput, db: Session):
    device = Device(**device_input.dict())
    db.add(device)
    db.commit()
    db.refresh(device)
    return device

def get_device(device_id: int, db: Session):
    return db.query(Device).filter(Device.id == device_id).first()

def update_device(device_id: int, device_update: DeviceUpdate, db: Session):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        return None
    for key, value in device_update.dict(exclude_unset=True).items():
        setattr(device, key, value)
    db.commit()
    db.refresh(device)
    return device

def delete_device(device_id: int, db: Session):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        return False
    db.delete(device)
    db.commit()
    return True
