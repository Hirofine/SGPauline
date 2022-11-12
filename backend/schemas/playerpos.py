from pydantic import BaseModel

class Playerpos(BaseModel):
    id: int
    playerid: int
    posx: int
    posy: int