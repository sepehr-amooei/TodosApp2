from fastapi import FastAPI, Path, Query,HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from starlette import status

app = FastAPI()

class Book:
    id: int
    title: str
    author: str
    description: str
    rating: int
    publishedYear: int

    def __init__(self, id, title, author, description, rating, publishedYear):
        self.id = id
        self.title = title
        self.author = author
        self.description = description
        self.rating = rating
        self.publishedYear = publishedYear

class BookRequest(BaseModel):
    id: int | None = None
    title: str = Field(min_length=3)
    author: str = Field(min_length=1)
    description: str = Field(min_length=1, max_length=100)
    rating: int = Field(gt=0 , lt=6)
    publishedYear: int = Field(gt=1900, ls= 2031)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                'title': 'A new book',
                'author': '<NAME>',
                'description': 'A new description of book',
                'rating': 1,
                'publishedYear': 2029
                }
            ]
        }
    }


BOOKS = [
    Book(1, "Computer Science Pro", "CodingwithRoby", "A very nice Book", 5, 2012),
    Book(2, "Be Fast with FastAPI", "CodingwithRoby", "A Great Book", 5, 2018),
    Book(3, "Master Endpoints", "CodingwithRoby", "An awesome Book", 5, 2024),
    Book(4, "HP1", "Author 1", "Book Description", 2, 1991),
    Book(5, "HP2", "Author 2", "Book Description", 3, 2013),
    Book(6, "HP3", "Author 3", "Book Description", 1, 2016),
]
@app.get("/books" ,status_code=status.HTTP_200_OK)
async def readAllBooks():
    return BOOKS

@app.get("/books/{bookId}", status_code=status.HTTP_200_OK)
async def readBookById(bookId: int = Path(gt=0)):
    for book in BOOKS:
        if book.id == bookId:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.get("/books/" ,status_code=status.HTTP_200_OK)
async def readBooksByRating(bookRating: int = Query(gt=0, lt=6)):
    booksList = []
    for book in BOOKS:
        if book.rating == bookRating:
            booksList.append(book)
    return booksList
@app.get("/books/publish/", status_code=status.HTTP_200_OK)
async def readBooksByublishedYear(publishedYear: int = Query(gt=1900, ls= 2031)):
    booksList = []
    for book in BOOKS:
        if book.publishedYear == publishedYear:
            booksList.append(book)
    return booksList
# ** operator will pass the key/value from BookRequest() into the Book() constructor
@app.post("/createBook",status_code=status.HTTP_201_CREATED)
async def createBook(bookRequest: BookRequest):
    newBook = Book(**bookRequest.dict()) #convert it to a Book object
    BOOKS.append(find_book_id(newBook))

def find_book_id(book: Book):
    book.id = 1 if len(BOOKS) == 0 else BOOKS[-1].id + 1
    return book

@app.put("/books/update_Book", status_code=status.HTTP_204_NO_CONTENT)
async def updateBook(book: BookRequest):
    bookChanged = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id == book.id:
            BOOKS[i] = Book(**book.dict())
            bookChanged = True
            break
    if not bookChanged:
        raise HTTPException(status_code=404, detail="Book not found")

@app.delete("/books/{bookId}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteBook(bookId: int = Path(gt=0)): #use path for adding validation over path perameters
    bookChanged = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id == bookId:
            BOOKS.pop(i)
            bookChanged = True
            break
    if not bookChanged:
        raise HTTPException(status_code=404, detail="Book not found")