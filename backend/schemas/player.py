from pydantic import BaseModel

class Player(BaseModel):
    id: int
    mapid: int
    pseudo: str