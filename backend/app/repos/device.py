from .base import BaseRepo
from models.device import GPSDevice as Device

class DeviceRepo(BaseRepo):

    def create(self, data: Device) -> Device:
        """Crea un nuevo dispositivo en la base de datos."""
        self.session.add(data)
        self.session.commit()
        self.session.refresh(data)
        return data

    def get_by_id(self, device_id: int) -> Device:
        """Obtiene un dispositivo por su ID."""
        return self.session.query(Device).filter(Device.id == device_id).first()

    def get_all(self):
        """Obtiene todos los dispositivos."""
        return self.session.query(Device).all()

    def update(self, device_id: int, data: dict) -> Device:
        """Actualiza los datos de un dispositivo."""
        device = self.get_by_id(device_id)
        if device:
            for key, value in data.items():
                if hasattr(device, key):
                    setattr(device, key, value)
            self.session.commit()
            self.session.refresh(device)
        return device

    def delete(self, device_id: int) -> bool:
        """Elimina un dispositivo por su ID. Retorna True si se eliminó."""
        device = self.get_by_id(device_id)
        if device:
            self.session.delete(device)
            self.session.commit()
            return True
        return False

    def get_by_identifier(self, identifier: str) -> Device:
        """Busca un dispositivo por su identificador único."""
        return self.session.query(Device).filter(Device.identifier == identifier).first()
