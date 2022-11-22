from fastapi import APIRouter
from config.db import conn
from models.index import playerposs
from schemas.index import Playerpos
playerpos = APIRouter()

@playerpos.get("/playerpos/")
async def read_data():
    return conn.execute(playerposs.select()).fetchall()

@playerpos.get("/playerpos/newplayerposid")
async def read_data():
    playpos = conn.execute(playerposs.select()).fetchall()
    i = 0
    for pp in playpos:
        i = pp.id if pp.id>i else i
    return i+1  

@playerpos.get("/playerpos/{id}")
async def read_data(id: int):
    return conn.execute(playerposs.select().where(playerposs.c.id == id)).fetchall()

@playerpos.get("/playerpos/playerid/{playerid}")
async def read_data(playerid: int):
    return conn.execute(playerposs.select().where(playerposs.c.playerid == playerid)).fetchall()

@playerpos.delete("/playerpos/")
async def delete_data():
    conn.execute(playerposs.delete())
    return 1 #conn.execute(playerposs.select()).fetchall()

@playerpos.post("/playerpos/")
async def write_data(playerpos: Playerpos):
    ppid = conn.execute(playerposs.select()).fetchall()
    lastppos = ppid.pop();
    conn.execute(playerposs.insert().values(
        id=lastppos.id + 1,
        playerid = playerpos.playerid,
        posx = playerpos.posx,
        posy = playerpos.posy
    ))
    return conn.execute(playerposs.select().where(playerposs.c.id==lastppos.id+1)).fetchall()

@playerpos.put("/playerpos/{id}")
async def update_data(id:int, playerpos: Playerpos):
    conn.execute(playerposs.update().values(
        posx = playerpos.posx,
        posy = playerpos.posy
        
    ).where(playerposs.c.id == id))
    
    return 1 #conn.execute(playerposs.select()).fetchall()