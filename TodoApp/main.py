from fastapi import FastAPI
import models
from dataBase import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)