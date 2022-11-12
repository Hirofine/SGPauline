from pydantic import BaseModel

class Leverroom(BaseModel):
    id: int
    mapid: int
    roomid: int
    state: bool
    posx: int
    posy: int
    exo: str