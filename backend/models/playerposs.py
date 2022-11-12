from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

playerposs = Table(
    'playerposs', meta,
    Column('id', Integer, primary_key = True),
    Column('playerid', Integer),
    Column('posx', Integer),
    Column('posy', Integer),
) 