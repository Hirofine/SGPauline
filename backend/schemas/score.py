from pydantic import BaseModel

class Score(BaseModel):
    id: int
    playerid: int
    scoretot: int
    