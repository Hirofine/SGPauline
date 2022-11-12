from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

traprooms = Table(
    'traprooms', meta,
    Column('id', Integer, primary_key = True),
    Column('mapid', Integer),
    Column('roomid', Integer),
    Column('state', Boolean),
    Column('posx', Integer),
    Column('posy', Integer),
    Column('typtrap', String(25)),
) 