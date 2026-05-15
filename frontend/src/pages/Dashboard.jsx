import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {

  const [expenses, setExpenses] = useState([]);

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

      <ExpenseForm />

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
          </div>
        ))
      }
    </div>
  );
};

export default Dashboard;