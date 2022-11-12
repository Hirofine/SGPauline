from pydantic import BaseModel

class Inventory(BaseModel):
    id: int
    playerid: int
    mapid: int