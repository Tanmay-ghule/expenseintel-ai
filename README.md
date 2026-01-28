# ExpenseIntel AI 💸📊

ExpenseIntel AI is a full-stack personal finance analytics platform that enables users to securely track, analyze, and visualize their expenses with interactive dashboards and intelligent, AI-style financial insights.

---

## 🚀 Key Features

- Secure authentication and authorization using OAuth2 + JWT
- Create, view, and manage personal expense records
- Interactive analytics dashboard with:
  - Monthly spending trends (Line Chart)
  - Category-wise distribution (Pie Chart)
  - Daily expense breakdown (Bar Chart)
- KPI cards for Total Spend, Top Category, and Monthly Average
- Automated AI-style financial insight summary
- One-click export of reports in CSV and PDF formats
- Modern glassmorphism dark UI with smooth animations
- Fully responsive design across desktop, tablet, and mobile devices

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Recharts for data visualization
- Custom Glass UI with CSS animations
- JWT-based session handling

### Backend
- FastAPI (Python)
- SQLite database with SQLAlchemy ORM
- OAuth2 with JWT for secure APIs
- ReportLab for dynamic PDF generation

---

## 📁 Project Structure

ExpenseIntel-AI/
├── frontend/ # React client application
├── backend/ # FastAPI REST API server
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Backend

bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

API will run at:
http://127.0.0.1:8000

### 2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Web app will run at:
http://localhost:5173

🔐 Authentication Flow
Register a new user
Login to receive JWT access token
All protected routes use Bearer token authorization

📊 Analytics & Reporting
Real-time monthly and daily expense analysis
Category-wise spending insights
AI-generated monthly financial summary
Downloadable CSV and professionally formatted PDF reports
