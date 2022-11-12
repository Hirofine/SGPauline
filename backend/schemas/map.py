from pydantic import BaseModel

class Map(BaseModel):
    id: int
    xsize: int
    ysize: int