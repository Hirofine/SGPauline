from fastapi import FastAPI
from routes.index import map, room, player, leverroom
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(map)
app.include_router(room)
app.include_router(player)
app.include_router(leverroom)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

