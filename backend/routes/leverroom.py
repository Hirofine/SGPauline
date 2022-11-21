from fastapi import APIRouter
from config.db import conn
from models.index import leverrooms, rooms, maps
from schemas.index import Map, Room, Leverroom
leverroom = APIRouter()


@leverroom.get("/leverroom/")
async def read_data():
    return conn.execute(leverrooms.select()).fetchall()

@leverroom.get("/leverroom/{id}")
async def read_data(id: int):
    return conn.execute(leverrooms.select().where(leverrooms.c.id == id)).fetchall()

@leverroom.get("/leverroom/mapid/{mapid}")
async def read_data(mapid: int):
    return conn.execute(leverrooms.select().where(leverrooms.c.mapid == mapid)).fetchall()

@leverroom.delete("/leverroom/")
async def delete_data():
    conn.execute(leverrooms.delete())
    return 1 #conn.execute(leverrooms.select()).fetchall()


@leverroom.put("/leverroom/{id}")
async def update_data(id:int, state: bool):
    conn.execute(leverrooms.update().values(
        state = state       
        
    ).where(leverrooms.c.id == id))
    
    return 1 #conn.execute(leverrooms.select()).fetchall()