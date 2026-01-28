import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";
import { theme } from "../theme";

// -------------------------------------------------------------------
// Expense Management Section
// - Add new expenses
// - View all expenses in a table
// -------------------------------------------------------------------

export default function ExpenseSection() {
  const { token } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Fetch all expenses
  const loadExpenses = async () => {
    const data = await apiRequest("/expenses/", "GET", null, token);
    setExpenses(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Add a new expense
  const addExpense = async (e) => {
    e.preventDefault();

    await apiRequest(
      "/expenses/",
      "POST",
      {
        title,
        amount: parseFloat(amount),
        category,
        date,
      },
      token
    );

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");

    // Reload list
    loadExpenses();
  };

  return (
    <div style={wrapper}>
      <h2 style={sectionTitle}>Expenses</h2>

      {/* Add Expense Form */}
      <div style={card}>
        <h3 style={subTitle}>Add Expense</h3>

        <form onSubmit={addExpense} style={formRow}>
          <input
            style={input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            style={input}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <input
            style={input}
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            style={input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button style={primaryBtn}>Add</button>
        </form>
      </div>

      {/* Expense Table */}
      <div style={{ ...card, marginTop: "24px" }}>
        <h3 style={subTitle}>All Expenses</h3>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Amount</th>
              <th style={th}>Category</th>
              <th style={th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} style={row}>
                <td style={td}>{e.title}</td>
                <td style={td}>₹{e.amount}</td>
                <td style={td}>{e.category}</td>
                <td style={td}>{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------

const wrapper = {
  marginTop: "40px",
};

const sectionTitle = {
  color: theme.textMain,
  marginBottom: "14px",
};

const subTitle = {
  color: theme.primary,
  marginBottom: "12px",
};

const card = {
  background: `linear-gradient(135deg, ${theme.bgMain}, ${theme.bgCard})`,
  border: `1px solid ${theme.border}`,
  borderRadius: "14px",
  padding: "22px",
  boxShadow: theme.glow,
};

const formRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
};

const input = {
  background: theme.bgMain,
  border: `1px solid ${theme.border}`,
  borderRadius: "8px",
  padding: "10px 12px",
  color: theme.textMain,
  outline: "none",
  minWidth: "150px",
};

const primaryBtn = {
  background: theme.primary,
  color: theme.bgMain,
  border: "none",
  borderRadius: "8px",
  padding: "10px 18px",
  fontWeight: "600",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

const th = {
  textAlign: "left",
  padding: "10px",
  color: theme.primary,
  borderBottom: `1px solid ${theme.border}`,
};

const td = {
  padding: "10px",
  borderBottom: `1px solid ${theme.border}`,
  color: theme.textMain,
};

const row = {
  transition: "background 0.2s ease",
};
