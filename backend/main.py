from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import User
from schemas import UserCreate
from auth import hash_password, verify_password, create_access_token
from routes import expenses

# -------------------------------------------------------------------
# FastAPI Application Setup
# -------------------------------------------------------------------

app = FastAPI(title="ExpenseIntel AI - Smart Expense Intelligence API")

# Enable CORS for frontend (Vite default: http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup
Base.metadata.create_all(bind=engine)

# -------------------------------------------------------------------
# Authentication Routes
# -------------------------------------------------------------------

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    Stores hashed password in database.
    """
    hashed_password = hash_password(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"id": new_user.id, "email": new_user.email}


@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return JWT access token.
    """
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}


# -------------------------------------------------------------------
# Health Check
# -------------------------------------------------------------------

@app.get("/")
def root():
    """
    API Health Check
    """
    return {"message": "ExpenseIntel AI backend is running"}


# -------------------------------------------------------------------
# Feature Routers
# -------------------------------------------------------------------

app.include_router(expenses.router)
