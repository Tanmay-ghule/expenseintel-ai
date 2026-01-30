from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import date, timedelta
from pathlib import Path
import csv

from database import get_db
from models import Expense
from schemas import ExpenseCreate, ExpenseOut, AnalyticsSummary
from deps import get_current_user
from fastapi.responses import FileResponse

router = APIRouter(prefix="/expenses", tags=["Expenses"])


# -------------------- CRUD --------------------

@router.post("/", response_model=ExpenseOut)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_expense = Expense(**expense.dict(), user_id=user.id)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense


@router.get("/", response_model=list[ExpenseOut])
def get_expenses(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Expense).filter(Expense.user_id == user.id).all()


# -------------------- ANALYTICS --------------------

@router.get("/analytics", response_model=AnalyticsSummary)
def analytics(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    total = db.query(func.sum(Expense.amount)).filter(
        Expense.user_id == user.id,
        extract("month", Expense.date) == today.month,
        extract("year", Expense.date) == today.year
    ).scalar() or 0

    top = db.query(
        Expense.category,
        func.sum(Expense.amount).label("sum")
    ).filter(
        Expense.user_id == user.id,
        extract("month", Expense.date) == today.month,
        extract("year", Expense.date) == today.year
    ).group_by(Expense.category).order_by(func.sum(Expense.amount).desc()).first()

    avg = db.query(func.avg(Expense.amount)).filter(
        Expense.user_id == user.id,
        extract("month", Expense.date) == today.month,
        extract("year", Expense.date) == today.year
    ).scalar() or 0

    return {
        "total_spent": round(total, 2),
        "top_category": top[0] if top else "N/A",
        "monthly_average": round(avg, 2)
    }


# -------------------- INSIGHT  --------------------

@router.get("/insights")
def spending_insights(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    expenses = db.query(Expense).filter(
        Expense.user_id == user.id,
        extract("month", Expense.date) == today.month,
        extract("year", Expense.date) == today.year
    ).all()

    if not expenses:
        return {"summary": "No expenses recorded for the current month yet."}

    total = sum(e.amount for e in expenses)

    category_map = {}
    for e in expenses:
        category_map[e.category] = category_map.get(e.category, 0) + e.amount

    top_category = max(category_map, key=category_map.get)
    percent = (category_map[top_category] / total) * 100

    return {
        "summary": f"This month you spent {total:.2f}. Highest spending was on {top_category} ({percent:.1f}% of total)."
    }


# -------------------- MONTHLY TREND --------------------

@router.get("/monthly-trend")
def monthly_trend(db: Session = Depends(get_db), user=Depends(get_current_user)):
    data = db.query(
        extract("year", Expense.date).label("year"),
        extract("month", Expense.date).label("month"),
        func.sum(Expense.amount).label("total")
    ).filter(
        Expense.user_id == user.id
    ).group_by("year", "month").order_by("year", "month").all()

    return [
        {"year": int(y), "month": int(m), "total": round(t, 2)}
        for y, m, t in data
    ]


# -------------------- EXPORT CSV --------------------

@router.get("/export/csv")
def export_expenses_csv(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    expenses = db.query(Expense).filter(
        Expense.user_id == user.id,
        extract("month", Expense.date) == today.month,
        extract("year", Expense.date) == today.year
    ).all()

    if not expenses:
        return {"message": "No expenses this month to export"}

    file_path = Path("expenses_report.csv")

    with open(file_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Title", "Category", "Amount", "Date"])
        for e in expenses:
            writer.writerow([e.title, e.category, e.amount, e.date])

    return FileResponse(file_path, filename="expenses_report.csv", media_type="text/csv")


# -------------------- EXPORT PDF --------------------

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from datetime import datetime

@router.get("/export/pdf")
def export_expenses_pdf(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    expenses = db.query(Expense).filter(
        Expense.user_id == user.id,
        extract("month", Expense.date) == today.month,
        extract("year", Expense.date) == today.year
    ).all()

    if not expenses:
        return {"message": "No expenses this month to export"}

    total = sum(e.amount for e in expenses)

    category_map = {}
    for e in expenses:
        category_map[e.category] = category_map.get(e.category, 0) + e.amount
    top_category = max(category_map, key=category_map.get)

    file_path = "expense_report.pdf"
    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 50, "Expense Intelligence Report")

    c.setFont("Helvetica", 11)
    c.drawString(50, height - 80, f"User: {user.email}")
    c.drawString(50, height - 100, f"Month: {today.strftime('%B %Y')}")
    c.drawString(50, height - 120, f"Generated on: {datetime.now().strftime('%d-%m-%Y')}")

    c.drawString(50, height - 160, f"Total Spent: {total:.2f}")
    c.drawString(50, height - 180, f"Top Category: {top_category}")

    y = height - 220
    for e in expenses:
        c.drawString(50, y, f"{e.date} | {e.title} | {e.category} | {e.amount}")
        y -= 15
        if y < 50:
            c.showPage()
            y = height - 50

    c.save()

    return FileResponse(file_path, filename="expense_report.pdf", media_type="application/pdf")
