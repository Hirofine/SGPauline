from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

scores = Table(
    'scores', meta,
    Column('id', Integer, primary_key = True),
    Column('playerid', Integer),
    Column('seq', Integer),
    Column('exo', Integer),
    Column('question', Integer),
    Column('valid', Boolean),
    Column('answer', String(255))
) 