import { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };

    addExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111827] p-6 rounded-2xl border border-gray-800 space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">
        Add Expense
      </h2>

      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;