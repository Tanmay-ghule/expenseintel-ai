from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# -------------------------------------------------------------------
# User Model
# -------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="USER")

    # One-to-Many: One user can have multiple expenses
    expenses = relationship(
        "Expense",
        back_populates="user",
        cascade="all, delete"
    )


# -------------------------------------------------------------------
# Expense Model
# -------------------------------------------------------------------

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    date = Column(Date, nullable=False)

    # Foreign key relationship to User
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User", back_populates="expenses")
