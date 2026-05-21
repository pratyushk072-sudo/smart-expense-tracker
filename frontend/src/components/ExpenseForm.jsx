import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const ExpenseForm = ({
  fetchExpenses,
  editExpense,
  setEditExpense,
  darkMode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (editExpense) {
      setFormData({
        title: editExpense.title,
        amount: editExpense.amount,
        category: editExpense.category,
        date: editExpense.date?.split("T")[0],
      });
    }
  }, [editExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editExpense) {
        await API.put(
          `/expenses/${editExpense._id}`,
          formData
        );

        setEditExpense(null);
        toast.success("Expense updated successfully");
      } else {
        await API.post("/expenses", formData);
        toast.success("Expense added successfully");
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
      });

      fetchExpenses();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-md mt-8 ${darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
        }`}
    >
      <h2
        className={`text-2xl font-bold mb-5 ${darkMode ? "text-white" : "text-black"
          }`}
      >
        Add Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Expense Title */}
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
              ? "bg-[#1e293b] text-white border-white placeholder:text-gray-300"
              : "bg-white text-black border-black placeholder:text-gray-500"
            }`}
          required
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
              ? "bg-[#1e293b] text-white border-white placeholder:text-gray-300"
              : "bg-white text-black border-black placeholder:text-gray-500"
            }`}
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
              ? "bg-[#1e293b] text-white border-white"
              : "bg-white text-black border-black"
            }`}
          required
        >
          <option value="">
            Select Category
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Transport">
            Transport
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
              ? "bg-[#1e293b] text-white border-white"
              : "bg-white text-black border-black"
            }`}
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition md:col-span-2"
        >
          {editExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;