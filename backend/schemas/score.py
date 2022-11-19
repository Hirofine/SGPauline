from pydantic import BaseModel

class Score(BaseModel):
    id: int
    playerid: int
    seq: int
    exo: int
    question: int
    valid: bool
    answer: str
    