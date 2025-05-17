from sqlalchemy.orm import Session
from models.route import Route
from schemas.route import RouteInput, RouteUpdate
import json

def create_route(route_input: RouteInput, db: Session):
    route = Route(
        name=route_input.name,
        start_time=route_input.start_time,
        end_time=route_input.end_time,
        stops=json.dumps(route_input.stops)
    )
    db.add(route)
    db.commit()
    db.refresh(route)
    return route

def get_route(route_id: int, db: Session):
    route = db.query(Route).filter(Route.id == route_id).first()
    if route:
        route.stops = json.loads(route.stops)
    return route

def update_route(route_id: int, route_update: RouteUpdate, db: Session):
    route = db.query(Route).filter(Route.id == route_id).first()
    if not route:
        return None
    if route_update.name is not None:
        route.name = route_update.name
    if route_update.start_time is not None:
        route.start_time = route_update.start_time
    if route_update.end_time is not None:
        route.end_time = route_update.end_time
    if route_update.stops is not None:
        route.stops = json.dumps(route_update.stops)
    db.commit()
    db.refresh(route)
    return route

def delete_route(route_id: int, db: Session):
    route = db.query(Route).filter(Route.id == route_id).first()
    if not route:
        return False
    db.delete(route)
    db.commit()
    return True
