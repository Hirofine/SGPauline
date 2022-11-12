from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

exitdoors = Table(
    'exitdoors', meta,
    Column('id', Integer, primary_key = True),
    Column('mapid', Integer),
    Column('posx', Integer),
    Column('posy', Integer),
    Column('isfound', Boolean),
    Column('isopen', Boolean),   
) 