import { useState } from "react";
import API from "../services/api";

const ExpenseForm = () => {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const expenseData = {
        title,
        amount,
        category,
      };

      const res = await API.post(
        "/expenses",
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Expense Added Successfully");

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

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            backgroundColor: "#222",
            color: "white",
            border: "1px solid gray",
          }}
        />

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