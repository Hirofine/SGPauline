from pydantic import BaseModel

class Exitdoor(BaseModel):
    id: int
    mapid: int
    posx: int
    posy: int
    isfound: bool
    isopen:bool