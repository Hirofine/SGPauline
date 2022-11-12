from pydantic import BaseModel

class Bonusitem(BaseModel):
    id: int
    invid: int
    playerid: int
    typbonus: str
    desbonus: str
    ldesbonus: str