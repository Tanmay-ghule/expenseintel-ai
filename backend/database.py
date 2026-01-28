from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# -------------------------------------------------------------------
# Database Configuration
# -------------------------------------------------------------------

DATABASE_URL = "sqlite:///./expense.db"

# SQLite engine (check_same_thread=False required for FastAPI)
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# SQLAlchemy session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all ORM models
Base = declarative_base()

# -------------------------------------------------------------------
# Dependency: Database Session
# -------------------------------------------------------------------

def get_db():
    """
    Provides a database session for each request
    and ensures it is closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
