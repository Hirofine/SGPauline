from fastapi import APIRouter
from config.db import conn
from models.index import players
from schemas.index import Player
player = APIRouter()


@player.get("/player/")
async def read_data():
    return conn.execute(players.select()).fetchall()    

@player.get("/player/newplayerid")
async def read_data():
    play = conn.execute(players.select()).fetchall()
    i = 0
    for p in play:
        i = p.id if p.id>i else i
    return i+1      

@player.get("/player/{id}")
async def read_data(id: int):
    return conn.execute(players.select().where(players.c.id == id)).fetchall()

@player.get("/player/mapid/{mapid}")
async def read_data(mapid: int):
    return conn.execute(players.select().where(players.c.mapid == mapid)).fetchall()

@player.delete("/player/")
async def delete_data():
    conn.execute(players.delete())
    return 1 #conn.execute(players.select()).fetchall()

@player.post("/player/")
async def write_data(player: Player):
    conn.execute(players.insert().values(
        id=player.id,
        mapid = player.mapid,
        pseudo = player.pseudo
    ))
    return 1 #conn.execute(players.select()).fetchall()