from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://root:Shv6d9baf&*@localhost:3306/jeuPaulineDB")

meta = MetaData()
conn = engine.connect()

