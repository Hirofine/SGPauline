from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

bonusrooms = Table(
    'bonusrooms', meta,
    Column('id', Integer, primary_key = True),
    Column('mapid', Integer),
    Column('roomid', Integer),
    Column('state', Boolean),
    Column('posx', Integer),
    Column('posy', Integer),
    Column('typbonus', String(25)),
) 