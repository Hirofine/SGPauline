from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from config.db import meta

bonusitems = Table(
    'bonusitems', meta,
    Column('id', Integer, primary_key = True),
    Column('invid', Integer),
    Column('playerid', Integer),
    Column('mapid', Integer),
    Column('typbonus', String(25)),
    Column('desbonus', String(50)),
    Column('ldesbonus', String(255)),
) 