from pydantic import BaseModel, EmailStr
from datetime import date

# -------------------------------------------------------------------
# User Schemas
# -------------------------------------------------------------------

class UserCreate(BaseModel):
    """
    Schema for user registration.
    """
    email: EmailStr
    password: str


class UserOut(BaseModel):
    """
    Schema for returning user data (safe fields only).
    """
    id: int
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


# -------------------------------------------------------------------
# Expense Schemas
# -------------------------------------------------------------------

class ExpenseCreate(BaseModel):
    """
    Schema for creating a new expense.
    """
    title: str
    amount: float
    category: str
    date: date


class ExpenseOut(ExpenseCreate):
    """
    Schema for returning expense data.
    """
    id: int

    class Config:
        from_attributes = True


# -------------------------------------------------------------------
# Analytics Schema
# -------------------------------------------------------------------

class AnalyticsSummary(BaseModel):
    """
    Schema for expense analytics response.
    """
    total_spent: float
    top_category: str
    monthly_average: float
