from fastapi import FastAPI
from routes.index import map, room, player, leverroom, playerpos,score
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(map)
app.include_router(room)
app.include_router(player)
app.include_router(leverroom)
app.include_router(playerpos)
app.include_router(score)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

