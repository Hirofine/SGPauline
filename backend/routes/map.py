from config.db import conn
from fastapi import APIRouter
from models.index import leverrooms, maps, rooms
from schemas.index import Leverroom, Map, Room

map = APIRouter()

@map.get("/map/")
async def read_data():
    return conn.execute(maps.select()).fetchall()  


@map.get("/map/newmapid")
async def read_data():
    play = conn.execute(maps.select()).fetchall()
    i = 0
    for p in play:
        i = p.id if p.id>i else i
    return i+1        

@map.get("/map/{id}")
async def read_data(id: int):
    return conn.execute(maps.select().where(maps.c.id == id)).fetchall()[0]

@map.post("/map/")
async def write_data(map: Map):
    mid = conn.execute(maps.select()).fetchall()
    lastmap = mid.pop()
    conn.execute(maps.insert().values(
        id=lastmap.id + 1,
        xsize = map.xsize,
        ysize = map.ysize
    ))
    #add a player

    #add n rooms (n=xsize * ysize)
    for i in range(map.xsize):
        for j in range(map.ysize):
            if(i == 0 and j == 0):
                tmpposmod = 'HG'
            elif(i == map.xsize-1 and j == 0):
                tmpposmod = 'BG'
            elif(j == 0):
                tmpposmod = 'MG'
            elif(i == 0 and j == map.ysize-1):
                tmpposmod = 'HD'
            elif(i == map.xsize-1 and j == map.ysize-1):
                tmpposmod = 'BD'
            elif(j == map.ysize-1):
                tmpposmod = 'MD'
            elif(i == 0):
                tmpposmod = 'HM'
            elif(i == map.xsize-1):
                tmpposmod = 'BM'
            else:
                tmpposmod = 'MM'
            
            tmpleverroom = False
            #Creation des salles levier roomid: 6
            if(i*map.ysize + j == 2 or i*map.ysize + j == 6 or i*map.ysize + j == 15 or i*map.ysize + j == 23):
                tmpleverroom = True
                conn.execute(leverrooms.insert().values(
                    id = i*map.ysize + j,
                    mapid = lastmap.id+1,
                    roomid = i*map.ysize + j,
                    posx = j,
                    posy = i,   
                    state = False,
                    exo = "exo"
                ))
                  
            conn.execute(rooms.insert().values(
                id = i*map.ysize + j,
                mapid = lastmap.id+1,
                posx = j,
                posy = i,                
                posmod = tmpposmod,    
                trapped = False,
                bonus = False,
                lever = tmpleverroom,
                isfound = False
            )) 
            
            
    return conn.execute(maps.select().where(maps.c.id==lastmap.id+1)).fetchall()

@map.put("/{id}")
async def update_data(id:int, map: Map):
    conn.execute(maps.update(
        xsize=map.xsize,
        ysize=map.ysize
    ).where(map.c.id == id))
    
    return 1 #conn.execute(maps.selec()).fetchall()

@map.delete("/map/")
async def delete_data():
    conn.execute(rooms.delete())
    conn.execute(maps.delete())
    return 1# conn.execute(maps.select()).fetchall()