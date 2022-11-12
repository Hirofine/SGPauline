from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta

maps = Table(
    'maps', meta,
    Column('id', Integer, primary_key = True),
    Column('xsize', Integer),
    Column('ysize', Integer),
) 