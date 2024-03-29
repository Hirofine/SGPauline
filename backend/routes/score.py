from fastapi import APIRouter
from config.db import conn
from models.index import scores
from schemas.index import Score
score = APIRouter()


@score.get("/score/")
async def read_data():
    return conn.execute(scores.select()).fetchall()    

@score.get("/score/newscoreid")
async def read_data():
    scor = conn.execute(scores.select()).fetchall()
    i = 0
    for p in scor:
        i = p.id if p.id>i else i
    return i+1      

@score.get("/score/playerid/{playerid}")
async def read_data(playerid: int):
    return conn.execute(scores.select().where(scores.c.playerid == playerid)).fetchall()

@score.post("/score/")
async def write_data(score: Score):
    lastsco = conn.execute(scores.select()).fetchall()
    lsc = lastsco.pop();
    conn.execute(scores.insert().values(
        id=lsc.id+1,
        playerid = score.playerid,
        seq = score.seq,
        exo = score.exo,
        question = score.question,
        valid = score.valid,
        answer = score.answer
    ))
    return 1 #conn.execute(scores.select()).fetchall()