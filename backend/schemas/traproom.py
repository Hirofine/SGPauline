from pydantic import BaseModel

class Traproom(BaseModel):
    id: int
    mapid: int
    roomid: int
    state: bool
    posx: int
    posy: int
    typtrap: str