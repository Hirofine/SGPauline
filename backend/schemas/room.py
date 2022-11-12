from pydantic import BaseModel

class Room(BaseModel):
    id: int
    mapid: int
    posx: int
    posy: int
    size: int
    posmod: str
    trapped: bool
    bonus: bool
    lever: bool
    isfound: bool