from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

inventorys = Table(
    'inventorys', meta,
    Column('id', Integer, primary_key = True),
    Column('playerid', Integer),
    Column('mapid', Integer),
) 