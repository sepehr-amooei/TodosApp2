from dataBase import Base
from sqlalchemy import Integer, String, Boolean, Column

class Todos(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
