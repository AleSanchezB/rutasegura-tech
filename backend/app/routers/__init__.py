from .auth import auth_router
from .user import user_router
from .route import route_router
from .device import device_router

routers = [
    auth_router,
    user_router,
    route_router,
    device_router,
]

__all__ = ["routers"]
