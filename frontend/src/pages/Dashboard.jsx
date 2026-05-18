import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import API from "../api/axios";
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

    } catch (error) {
      console.log(error);
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
  });

  const totalExpenses = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const thisMonthExpenses = totalExpenses;

  const remainingBudget = Number(budget) - totalExpenses;

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

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">

        <h1 className="text-3xl font-bold text-blue-600">
          Expense Tracker
        </h1>

        <div className="mt-10 space-y-3">

          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-100 transition">
            <FaChartPie />
            Dashboard
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-100 transition">
            <FaMoneyBillWave />
            Expenses
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-100 transition">
            <FaPlus />
            Add Expense
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Navbar */}
        <div className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Welcome back, {userName} 👋
            </p>
          </div>

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

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">

            <h3 className="text-gray-500 text-lg">
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

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg">
              Total Expenses
            </h3>

            <p className="text-4xl font-bold mt-3">
              ₹{totalExpenses}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg">
              This Month
            </h3>

            <p className="text-4xl font-bold mt-3">
              ₹{thisMonthExpenses}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg">
              Remaining Budget
            </h3>

            <p className="text-4xl font-bold mt-3">
              {remainingBudget}
            </p>
          </div>

        </div>

        <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-5">
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

                  {categoryData.map((entry, index) => (
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

        <ExpenseForm
          fetchExpenses={fetchExpenses}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
        <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-5">
            Recent Expenses
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-5">

            <input
              type="text"
              placeholder="Search Expense..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border rounded-lg outline-none flex-1"
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border rounded-lg outline-none"
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

          </div>

          <div className="overflow-x-auto">

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border p-2 rounded mb-4"
            />

            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">

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

                {filteredExpenses.map((expense) => (
                  <tr key={expense._id} className="border-b">

                    <td className="p-3">
                      {expense.title}
                    </td>

                    <td className="p-3">
                      ₹{expense.amount}
                    </td>

                    <td className="p-3">
                      {expense.category}
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
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;