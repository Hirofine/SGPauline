from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

players = Table(
    'players', meta,
    Column('id', Integer, primary_key = True),
    Column('mapid', Integer),
    Column('pseudo', String(25)),
) 