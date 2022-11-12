from fastapi import APIRouter
from config.db import conn
from models.index import rooms
from schemas.index import Room
room = APIRouter()


@room.get("/room/")
async def read_data():
    return conn.execute(rooms.select()).fetchall()          

@room.get("/room/{id}")
async def read_data(id: int):
    return conn.execute(rooms.select().where(rooms.c.id == id)).fetchall()

@room.get("/room/mapid/{mapid}")
async def read_data(mapid: int):
    return conn.execute(rooms.select().where(rooms.c.mapid == mapid)).fetchall()

@room.delete("/room/")
async def delete_data():
    conn.execute(rooms.delete())
    return conn.execute(rooms.select()).fetchall()