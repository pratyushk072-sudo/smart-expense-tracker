import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {

  const [expenses, setExpenses] = useState([]);

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchExpenses = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExpenses(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();

  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <ExpenseForm setExpenses={setExpenses} />

      {
        expenses.map((expense) => (
          <div
            key={expense._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              color: "white",
            }}
          >
            <h3>{expense.title}</h3>

            <p>Amount: ₹{expense.amount}</p>

            <p>Category: {expense.category}</p>

            <button
              onClick={() => handleDelete(expense._id)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default Dashboard;