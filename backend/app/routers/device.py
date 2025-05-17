from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from controllers.device import (
    create_device,
    get_device,
    update_device,
    delete_device
)
from core.dependencies import get_db
from schemas.device import DeviceInput, DeviceUpdate, DeviceOutput

device_router = APIRouter(prefix="/devices", tags=["Dispositivos"])

@device_router.post("/", response_model=DeviceOutput, status_code=status.HTTP_201_CREATED)
def create_device_router(device_input: DeviceInput, db: Session = Depends(get_db)):
    device = create_device(device_input, db)
    if not device:
        raise HTTPException(status_code=400, detail="No se pudo crear el dispositivo")
    return device

@device_router.get("/{device_id}", response_model=DeviceOutput)
def get_device_router(device_id: int, db: Session = Depends(get_db)):
    device = get_device(device_id, db)
    if not device:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    return device

@device_router.put("/{device_id}", response_model=DeviceOutput)
def update_device_router(device_id: int, device_input: DeviceUpdate, db: Session = Depends(get_db)):
    device = update_device(device_id, device_input, db)
    if not device:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    return device

@device_router.delete("/{device_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_device_router(device_id: int, db: Session = Depends(get_db)):
    if not delete_device(device_id, db):
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    return
