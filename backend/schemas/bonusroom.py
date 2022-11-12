from pydantic import BaseModel

class Bonusroom(BaseModel):
    id: int
    mapid: int
    roomid: int
    state: bool
    posx: int
    posy: int
    typbonus: str