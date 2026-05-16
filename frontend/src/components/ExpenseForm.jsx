import { useState, useEffect } from "react";
import API from "../services/api";

const ExpenseForm = ({ setExpenses, editExpense }) => {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {

    if (editExpense) {
      setTitle(editExpense.title);
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
    }

  }, [editExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const expenseData = {
        title,
        amount,
        category,
      };

      if (editExpense) {

        const res = await API.put(
          `/expenses/${editExpense._id}`,
          expenseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpenses((prev) =>
          prev.map((expense) =>
            expense._id === editExpense._id
              ? res.data
              : expense
          )
        );

      } else {

        const res = await API.post(
          "/expenses",
          expenseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpenses((prev) => [res.data, ...prev]);

      }

      setTitle("");
      setAmount("");
      setCategory("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            backgroundColor: "#222",
            color: "white",
            border: "1px solid gray",
          }}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            backgroundColor: "#222",
            color: "white",
            border: "1px solid gray",
          }}
        />

        <br /><br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            width: "274px",
            backgroundColor: "#222",
            color: "white",
            border: "1px solid gray",
          }}
        >

          <option value="">Select Category</option>

          <option value="Food">Food</option>

          <option value="Travel">Travel</option>

          <option value="Shopping">Shopping</option>

          <option value="Entertainment">Entertainment</option>

          <option value="Bills">Bills</option>

          <option value="Health">Health</option>

        </select>

        <br /><br />

        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
          }}
          type="submit"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;