import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import {
  FaMoneyBillWave,
  FaChartPie,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(Number(0));
  const [budgetInput, setBudgetInput] = useState("");
  const [editExpense, setEditExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const userName = localStorage.getItem("name");

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
  }, []);

  const deleteExpense = async (id) => {
    try {

      await API.delete(`/expenses/${id}`);

      fetchExpenses();

      toast.success("Expense deleted successfully");

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");

      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBudget = async () => {
    try {

      const res = await API.get("/budget");

      console.log(res.data);

      setBudget(
        Number(res.data.monthlyBudget || 0)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const updateBudget = async () => {
    try {

      const res = await API.put(
        "/budget",
        {
          monthlyBudget: Number(budgetInput),
        }
      );

      setBudget(
        Number(res.data.monthlyBudget)
      );

      setBudgetInput("");

    } catch (error) {
      console.log(error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    const expenseMonth =
      expenseDate.getFullYear() +
      "-" +
      String(expenseDate.getMonth() + 1).padStart(2, "0");

    const matchesMonth =
      expenseMonth === selectedMonth;

    const matchesSearch =
      expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "" ||
      expense.category === filterCategory;

    return (
      matchesMonth &&
      matchesSearch &&
      matchesCategory
    );
  })
    .sort((a, b) => {

      if (sortBy === "newest") {
        return new Date(b.date) - new Date(a.date);
      }

      if (sortBy === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      if (sortBy === "highest") {
        return b.amount - a.amount;
      }

      if (sortBy === "lowest") {
        return a.amount - b.amount;
      }

      return 0;
    });

  const totalExpenses = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const thisMonthExpenses = totalExpenses;

  const remainingBudget = Number(budget) - totalExpenses;
  const budgetUsedPercentage =
    budget > 0
      ? (totalExpenses / budget) * 100
      : 0;

  const categoryData = [

    {
      name: "Food",
      value: filteredExpenses
        .filter((e) => e.category === "Food")
        .reduce((acc, e) => acc + e.amount, 0),
    },

    {
      name: "Transport",
      value: filteredExpenses
        .filter((e) => e.category === "Transport")
        .reduce((acc, e) => acc + e.amount, 0),
    },

    {
      name: "Shopping",
      value: filteredExpenses
        .filter((e) => e.category === "Shopping")
        .reduce((acc, e) => acc + e.amount, 0),
    },

    {
      name: "Entertainment",
      value: filteredExpenses
        .filter((e) => e.category === "Entertainment")
        .reduce((acc, e) => acc + e.amount, 0),
    },

    {
      name: "Bills",
      value: filteredExpenses
        .filter((e) => e.category === "Bills")
        .reduce((acc, e) => acc + e.amount, 0),
    },

    {
      name: "Other",
      value: filteredExpenses
        .filter((e) => e.category === "Other")
        .reduce((acc, e) => acc + e.amount, 0),
    },

  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
  ];

  const csvData = filteredExpenses.map((expense) => ({
    Title: expense.title,
    Amount: expense.amount,
    Category: expense.category,
    Date: new Date(expense.date).toLocaleDateString(),
  }));

  return (
    <div
      className={`min-h-screen flex ${darkMode
        ? "bg-gray-900"
        : "bg-gray-100"
        }`}
    >

      {/* Sidebar */}
      <div
        className={`hidden md:block w-64 shadow-lg p-5 ${darkMode
          ? "bg-gray-800 text-white"
          : "bg-white"
          }`}
      >

        <h1 className="text-3xl font-bold text-blue-600">
          Expense Tracker
        </h1>

        <div className="mt-10 space-y-3">

          {/* Dashboard Button */}
          <button
            onClick={() =>
              document
                .getElementById("dashboard-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-100 hover:text-black transition"
          >
            <FaChartPie />
            Dashboard
          </button>

          {/* Expenses Button */}
          <button
            onClick={() =>
              document
                .getElementById("expenses-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-100 hover:text-black transition"
          >
            <FaMoneyBillWave />
            Expenses
          </button>

          {/* Add Expense Button */}
          <button
            onClick={() =>
              document
                .getElementById("add-expense-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-100 hover:text-black transition"
          >
            <FaPlus />
            Add Expense
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div id="dashboard-section">
          {/* Navbar */}
          <div
            className={`p-5 rounded-2xl shadow-md flex justify-between items-center ${darkMode
              ? "bg-gray-800"
              : "bg-white"
              }`}
          >
            <div>
              <h2
                className={`text-3xl font-bold ${darkMode ? "text-white" : "text-black"
                  }`}
              >
                Dashboard
              </h2>

              <p
                className={`mt-1 ${darkMode ? "text-white" : "text-gray-500"
                  }`}
              >
                Welcome back, {userName} 👋
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>

          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

            <div
              className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
                }`}
            >

              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                Monthly Budget
              </h3>

              <p className="text-4xl font-bold mt-3">
                ₹{Number(budget)}
              </p>

              {isEditingBudget ? (

                <div className="flex gap-2 mt-4">

                  <input
                    type="number"
                    placeholder="Set Budget"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />

                  <button
                    onClick={async () => {
                      await updateBudget();

                      setIsEditingBudget(false);
                    }}
                    className="bg-blue-600 text-white px-4 rounded-lg"
                  >
                    Save
                  </button>

                </div>

              ) : (

                <button
                  onClick={() => setIsEditingBudget(true)}
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit Budget
                </button>

              )}

            </div>

            <div
              className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
                }`}
            >
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                Total Expenses
              </h3>

              <p className="text-4xl font-bold mt-3">
                ₹{totalExpenses}
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
                }`}
            >
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                This Month
              </h3>

              <p className="text-4xl font-bold mt-3">
                ₹{thisMonthExpenses}
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
                }`}
            >
              <h3
                className={`text-lg ${darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
                  }`}
              >
                Remaining Budget
              </h3>

              <p className="text-4xl font-bold mt-3">
                ₹{remainingBudget}
              </p>
            </div>

          </div>

          <div
            className={`mt-8 p-6 rounded-2xl shadow-md ${darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
              }`}
          >

            <div
              className={`mt-6 p-6 rounded-2xl border shadow-lg ${darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
                }`}
            >
              <div className="flex justify-between mb-2">
                <h3
                  className={`font-semibold ${darkMode ? "text-white" : "text-black"
                    }`}
                >
                  Budget Usage
                </h3>

                <span
                  className={`font-bold ${darkMode ? "text-white" : "text-black"
                    }`}
                >
                  {budgetUsedPercentage.toFixed(1)}%
                </span>
              </div>

              <div className="w-full bg-gray-300/70 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${budgetUsedPercentage < 50
                    ? "bg-green-500"
                    : budgetUsedPercentage < 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  style={{
                    width: `${Math.min(
                      budgetUsedPercentage,
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              <p
                className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                ₹{totalExpenses} spent out of ₹{budget}
              </p>
            </div>
          </div>

          <h2
            className={`text-2xl font-bold mb-5 ${darkMode ? "text-white" : "text-black"
              }`}
          >
            Expense Analytics
          </h2>

          <div className="w-full h-[400px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >

                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Recent Expenses */}

        <div id="add-expense-section">

          <ExpenseForm
            fetchExpenses={fetchExpenses}
            editExpense={editExpense}
            setEditExpense={setEditExpense}
            darkMode={darkMode}
          />

        </div>
        <div
          id="expenses-section"
          className={`mt-8 p-6 rounded-2xl shadow-md ${darkMode
            ? "bg-gray-800 text-white"
            : "bg-white"
            }`}
        >

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Recent Expenses
            </h2>

            <CSVLink
              data={csvData}
              filename={"expenses.csv"}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Export CSV
            </CSVLink>

          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-5">

            <input
              type="text"
              placeholder="Search Expense..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`p-3 border rounded-lg outline-none flex-1 ${darkMode
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white"
                }`}
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`p-3 border rounded-lg outline-none ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white"
                }`}
            >

              <option value="">
                All Categories
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

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`p-3 border rounded-lg outline-none ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white"
                }`}
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="highest">
                Highest Amount
              </option>

              <option value="lowest">
                Lowest Amount
              </option>
            </select>

          </div>

          <div className="overflow-x-auto">

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={`border p-2 rounded mb-4 ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white"
                }`}
            />

            <table className="w-full border-collapse">

              <thead>
                <tr
                  className={`${darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100"
                    }`}
                >

                  <th className="p-3 text-left">
                    Title
                  </th>

                  <th className="p-3 text-left">
                    Amount
                  </th>

                  <th className="p-3 text-left">
                    Category
                  </th>

                  <th className="p-3 text-left">
                    Date
                  </th>

                  <th className="p-3 text-left">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredExpenses.length > 0 ? (

                  filteredExpenses.map((expense) => (
                    <tr
                      key={expense._id}
                      className={`border-b transition duration-200 ${darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-100"
                        }`}
                    >

                      <td className="p-3">
                        {expense.title}
                      </td>

                      <td className="p-3">
                        ₹{expense.amount}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${expense.category === "Food"
                            ? "bg-green-100 text-green-700"
                            : expense.category === "Transport"
                              ? "bg-blue-100 text-blue-700"
                              : expense.category === "Shopping"
                                ? "bg-purple-100 text-purple-700"
                                : expense.category === "Entertainment"
                                  ? "bg-orange-100 text-orange-700"
                                  : expense.category === "Bills"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {expense.category}
                        </span>
                      </td>

                      <td className="p-3">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>

                      <td className="p-3">

                        <button
                          onClick={() => setEditExpense(expense)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition mr-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="5"
                      className={`text-center p-5 ${darkMode
                        ? "text-gray-300"
                        : "text-gray-500"
                        }`}
                    >
                      No expenses found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;