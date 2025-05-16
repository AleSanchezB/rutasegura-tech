from .base import BaseRepo
from models.route import Route

class RouteRepo(BaseRepo):

    def create(self, data: Route) -> Route:
        """Crea una nueva ruta en la base de datos."""
        self.session.add(data)
        self.session.commit()
        self.session.refresh(data)
        return data

    def get_by_id(self, route_id: int) -> Route:
        """Obtiene una ruta por su ID."""
        return self.session.query(Route).filter(Route.id == route_id).first()

    def get_all(self):
        """Obtiene todas las rutas."""
        return self.session.query(Route).all()

    def update(self, route_id: int, data: dict) -> Route:
        """Actualiza los datos de una ruta."""
        route = self.get_by_id(route_id)
        if route:
            for key, value in data.items():
                if hasattr(route, key):
                    setattr(route, key, value)
            self.session.commit()
            self.session.refresh(route)
        return route

    def delete(self, route_id: int) -> bool:
        """Elimina una ruta por su ID. Retorna True si se eliminó."""
        route = self.get_by_id(route_id)
        if route:
            self.session.delete(route)
            self.session.commit()
            return True
        return False
