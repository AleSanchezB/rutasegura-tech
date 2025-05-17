from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from controllers.route import (
    create_route,
    get_route,
    update_route,
    delete_route
)
from core.dependencies import get_db
from schemas.route import RouteInput, RouteUpdate, RouteOutput

route_router = APIRouter(prefix="/routes", tags=["Rutas"])

@route_router.post("/", response_model=RouteOutput, status_code=status.HTTP_201_CREATED)
def create_route_router(route_input: RouteInput, db: Session = Depends(get_db)):
    route = create_route(route_input, db)
    if not route:
        raise HTTPException(status_code=400, detail="No se pudo crear la ruta")
    return route

@route_router.get("/{route_id}", response_model=RouteOutput)
def get_route_router(route_id: int, db: Session = Depends(get_db)):
    route = get_route(route_id, db)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return route

@route_router.put("/{route_id}", response_model=RouteOutput)
def update_route_router(route_id: int, route_input: RouteUpdate, db: Session = Depends(get_db)):
    route = update_route(route_id, route_input, db)
    if not route:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return route

@route_router.delete("/{route_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route_router(route_id: int, db: Session = Depends(get_db)):
    if not delete_route(route_id, db):
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return
