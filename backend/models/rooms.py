from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

rooms = Table(
    'rooms', meta,
    Column('id', Integer, primary_key = True),
    Column('mapid', Integer),
    Column('posx', Integer),
    Column('posy', Integer),
    Column('posmod', String(2)),
    Column('trapped', Boolean),
    Column('bonus', Boolean),
    Column('lever', Boolean),
    Column('isfound', Boolean)
) 