from typing import Annotated
from pydantic import BaseModel,Field
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException, Path, Query
from starlette import status
import models
from models import Todos
from dataBase import engine, SessionLocal

app = FastAPI()

models.Base.metadata.create_all(engine)

def getDb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session,Depends(getDb)]

class TodoRequest(BaseModel):
    title: str = Field(min_length=3)
    description: str = Field(min_length=1, max_length=25)
    priority: int = Field(ge=0, le=5)
    complete: bool

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    'title': 'Date',
                    'description': 'Bring flowers',
                    'priority': 5,
                    'complete': False
                }
            ]
        }
    }
@app.get("/")
async def readAll(db: db_dependency):
    return db.query(Todos).all()

@app.get("/todo/{todoId}", status_code=status.HTTP_200_OK)
async def readTodo(db: db_dependency, todoId: int = Path(gt=0)):
    todo_model = db.query(Todos).filter(Todos.id == todoId).first()
    if todo_model is not None:
        return todo_model
    raise HTTPException(status_code=404, detail='Todo not found')
@app.post("/todo", status_code=status.HTTP_201_CREATED)
async def createTodo(db: db_dependency, todo_request: TodoRequest):
    todo_model = Todos(**todo_request.dict())
    db.add(todo_model)
    db.commit()

@app.put("/todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def updateTodo(db: db_dependency,
                     todo_request: TodoRequest,
                     todo_id: int = Path(gt=0)):
    todo_model = db.query(Todos).filter(Todos.id == todo_id).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found')

    todo_model.title = todo_request.title
    todo_model.description = todo_request.description
    todo_model.priority = todo_request.priority
    todo_model.complete = todo_request.complete
    db.add(todo_model)
    db.commit()

@app.delete("/todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteTodo(db: db_dependency, todo_id: int = Path(gt=0)):
    todo_model = db.query(Todos).filter(Todos.id == todo_id).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found')
    db.delete(todo_model)
    db.commit()

