import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import { motion } from "motion/react";
import {
  FaMoneyBillWave,
  FaChartPie,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaShoppingCart,
  FaInbox,
  FaUtensils,
  FaCar,
  FaGamepad,
  FaBolt,
  FaTag,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(Number(0));
  const [budgetInput, setBudgetInput] = useState("");
  const [editExpense, setEditExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? "#111827"
      : "#f3f4f6";
  }, [darkMode]);

  const [sortBy, setSortBy] = useState("newest");
  const userName = localStorage.getItem("name");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

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

  const currentMonth = new Date().toLocaleString("default", {
    month: "short",
  });

  const monthlyData = [
    { month: "Jan", amount: currentMonth === "Jan" ? totalExpenses : 0 },
    { month: "Feb", amount: currentMonth === "Feb" ? totalExpenses : 0 },
    { month: "Mar", amount: currentMonth === "Mar" ? totalExpenses : 0 },
    { month: "Apr", amount: currentMonth === "Apr" ? totalExpenses : 0 },
    { month: "May", amount: currentMonth === "May" ? totalExpenses : 0 },
    { month: "Jun", amount: currentMonth === "Jun" ? totalExpenses : 0 },
    { month: "Jul", amount: currentMonth === "Jul" ? totalExpenses : 0 },
    { month: "Aug", amount: currentMonth === "Aug" ? totalExpenses : 0 },
    { month: "Sep", amount: currentMonth === "Sep" ? totalExpenses : 0 },
    { month: "Oct", amount: currentMonth === "Oct" ? totalExpenses : 0 },
    { month: "Nov", amount: currentMonth === "Nov" ? totalExpenses : 0 },
    { month: "Dec", amount: currentMonth === "Dec" ? totalExpenses : 0 },
  ];

  const thisMonthExpenses = totalExpenses;

  const remainingBudget = Number(budget) - totalExpenses;
  const totalTransactions = filteredExpenses.length;

  const averageExpense =
    totalTransactions > 0
      ? (totalExpenses / totalTransactions).toFixed(2)
      : 0;

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

  const highestCategory = categoryData.reduce(
    (max, category) =>
      category.value > max.value ? category : max,
    { name: "None", value: 0 }
  );


  const insights = [];

  if (budgetUsedPercentage > 80) {
    insights.push("⚠️ You have used more than 80% of your budget.");
  }

  if (remainingBudget > 0) {
    insights.push(
      `✅ Great! You still have ₹${remainingBudget} remaining this month.`
    );
  }

  if (highestCategory.value > 0) {
    insights.push(
      `📊 Highest spending category is ${highestCategory.name}.`
    );
  }

  if (averageExpense > 1000) {
    insights.push(
      "💸 Your average expense is quite high this month."
    );
  }

  if (filteredExpenses.length === 0) {
    insights.push(
      "🧐 No expenses added yet for this month."
    );
  }

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ];

  const getCategoryIcon = (category) => {

    switch (category) {

      case "Food":
        return <FaUtensils />;

      case "Transport":
        return <FaCar />;

      case "Shopping":
        return <FaShoppingCart />;

      case "Entertainment":
        return <FaGamepad />;

      case "Bills":
        return <FaBolt />;

      default:
        return <FaTag />;
    }

  };

  const csvData = filteredExpenses.map((expense) => ({
    Title: expense.title,
    Amount: expense.amount,
    Category: expense.category,
    Date: new Date(expense.date).toLocaleDateString(),
  }));

  return (

    <div
      className={`min-h-screen flex pb-10 transition-colors duration-300 ${darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
        }`}
    >

      {/* Sidebar */}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <FaBars />
      </button>

      <div
        className={`fixed md:relative top-0 left-0 h-screen z-40 transform
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 w-20 md:w-60 lg:w-72 shadow-2xl backdrop-blur-xl p-5 border-r ${darkMode
            ? "bg-gray-900/95 text-white border-gray-800"
            : "bg-white/95 border-gray-200"
          }`}
      >

        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
          Expense Tracker
        </h1>

        <div className="mt-10 space-y-3">

          {/* Dashboard Button */}
          <button
            onClick={() => {
              setActiveSection("dashboard");
              setSidebarOpen(false);

              document
                .getElementById("dashboard-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${activeSection === "dashboard"
              ? "bg-white text-black font-semibold shadow-lg"
              : `${darkMode
                ? "text-white hover:bg-blue-100 hover:text-black"
                : "text-gray-700 hover:bg-blue-100 hover:text-black"
              }`
              }`}
          >
            <FaChartPie />
            Dashboard
          </button>

          <button
            onClick={() => {
              setActiveSection("analytics");
              setSidebarOpen(false);

              document
                .getElementById("analytics-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${activeSection === "analytics"
              ? "bg-white text-black font-semibold shadow-lg"
              : `${darkMode
                ? "text-white hover:bg-blue-100 hover:text-black"
                : "text-black hover:bg-blue-100 hover:text-black"
              }`
              }`}
          >
            📊 Expense Analytics
          </button>

          <button
            onClick={() => {
              setActiveSection("monthly");
              setSidebarOpen(false);

              document
                .getElementById("monthly-spending-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${activeSection === "monthly"
              ? "bg-white text-black font-semibold shadow-lg"
              : `${darkMode
                ? "text-white hover:bg-blue-100 hover:text-black"
                : "text-black hover:bg-blue-100 hover:text-black"
              }`
              }`}
          >
            📈 Monthly Spending
          </button>

          {/* Add Expense Button */}
          <button
            onClick={() => {
              setActiveSection("add-expense");
              setSidebarOpen(false);

              document
                .getElementById("add-expense-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${activeSection === "add-expense"
              ? "bg-white text-black font-semibold shadow-lg"
              : `${darkMode
                ? "text-white hover:bg-blue-100 hover:text-black"
                : "text-black hover:bg-blue-100 hover:text-black"
              }`
              }`}
          >
            <FaPlus />
            Add Expense
          </button>

          {/* Expenses Button */}
          <button
            onClick={() => {
              setActiveSection("expenses");
              setSidebarOpen(false);

              document
                .getElementById("expenses-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${activeSection === "expenses"
              ? "bg-white text-black font-semibold shadow-lg"
              : `${darkMode
                ? "text-white hover:bg-blue-100 hover:text-black"
                : "text-black hover:bg-blue-100 hover:text-black"
              }`
              }`}
          >
            <FaMoneyBillWave />
            Expenses
          </button>

        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div id="dashboard-section">
          {/* Navbar */}
          <div
            className={`relative overflow-hidden p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-4 border ${darkMode
              ? "bg-gray-800/80 border-gray-700 backdrop-blur-md"
              : "bg-white/80 border-gray-200 backdrop-blur-md"
              }`}
          >
            <div className="relative z-10">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

              <div className="absolute bottom-0 left-20 w-56 h-56 bg-purple-500/10 blur-3xl rounded-full"></div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-black"
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
                onClick={() => setDarkMode((prev) => !prev)}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={() => {

                  localStorage.removeItem("token");
                  localStorage.removeItem("name");

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 md:p-6 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 ${darkMode

                ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                : "bg-white"
                }`}
            >

              <FaWallet className="text-3xl text-blue-400 mb-3" />
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                Monthly Budget
              </h3>

              <p className="text-3xl md:text-4xl font-bold mt-3">
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

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 md:p-6 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 ${darkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                : "bg-white"
                }`}
            >

              <FaMoneyBillWave className="text-3xl text-red-400 mb-3" />
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                Total Expenses
              </h3 >

              <p className="text-3xl md:text-4xl font-bold mt-3 hover:scale-105 transition-all duration-300">
                ₹{totalExpenses}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 md:p-6 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 ${darkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                : "bg-white"
                }`}
            >

              <FaChartLine className="text-3xl text-green-400 mb-3" />
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                This Month
              </h3>

              <p className="text-3xl md:text-4xl font-bold mt-3">
                ₹{thisMonthExpenses}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 md:p-6 rounded-2xl shadow-md
                hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 ${darkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                  : "bg-white"
                }`}
            >

              <FaPiggyBank className="text-3xl text-yellow-400 mb-3" />
              <h3
                className={`text-lg ${darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
                  }`}
              >
                Remaining Budget
              </h3>

              <p className="text-3xl md:text-4xl font-bold mt-3">
                ₹{remainingBudget}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 md:p-6 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 ${darkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                : "bg-white"
                }`}
            >
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                Average Expense
              </h3>

              <p className="text-3xl md:text-4xl font-bold mt-3">
                ₹{averageExpense}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 md:p-6 rounded-2xl shadow-md 
                hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 ${darkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                  : "bg-white"
                }`}
            >

              <FaShoppingCart className="text-3xl text-pink-400 mb-3" />
              <h3 className={`text-lg ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}>
                Top Category
              </h3>

              <p className="text-2xl font-bold mt-3">
                {highestCategory.name}
              </p>
            </motion.div>

          </div>


          <div
            className={`mt-8 p-4 md:p-6 rounded-2xl shadow-md ${darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
              }`}
          >

            <div
              className={`mt-6 p-4 md:p-6 rounded-2xl border shadow-lg ${darkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-900 border-gray-700"
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
                  className={`h-4 rounded-full transition-all duration-700 ease-in-out ${budgetUsedPercentage < 50
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
                ₹{totalExpenses || 0} spent out of ₹{budget || 0}
              </p>
            </div>
          </div>

          <div
            className={`mt-8 p-4 md:p-6 rounded-2xl shadow-md ${darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
              }`}
          >
            <div id="analytics-section">
              <h2
                className={`text-2xl font-bold mb-5 ${darkMode ? "text-white" : "text-black"
                  }`}
              >
                Expense Analytics
              </h2>

              <div className="flex flex-col gap-6 item-center">

                {/* Chart */}
                <div
                  className={`lg:col-span-3 h-[320px] md:h-[420px] flex justify-center items-center p-4 rounded-2xl cursor-pointer hover:scale-[1.01] transition ${darkMode
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl"
                    : "bg-white hover:shadow-blue-200 hover:shadow-2xl"
                    }`}
                >

                  <ResponsiveContainer>

                    <PieChart width={280} height={280}>

                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        paddingAngle={5}
                        cornerRadius={10}
                        animationDuration={1200}

                        label={({ name, value }) => `₹${value}`}

                        labelLine={false}
                      >

                        {categoryData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}

                      </Pie>

                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          backgroundColor: darkMode
                            ? "#1F2937"
                            : "#ffffff",
                          color: darkMode
                            ? "#ffffff"
                            : "#000000",
                        }}
                      />

                      <Legend
                        wrapperStyle={{
                          color: darkMode
                            ? "#ffffff"
                            : "#000000",
                        }}
                      />

                    </PieChart>

                  </ResponsiveContainer>
                </div>

              </div>

              {/* Analytics Summary */}
              <div
                className={`mt-6 p-4 md:p-6 rounded-2xl shadow-xl w-full flex flex-col justify-center space-y-6 ${darkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                  : "bg-gray-100"
                  }`}
              >
                <h3 className="text-2xl font-bold">
                  Insights
                </h3>

                <div className="space-y-4 mt-4">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`p-4 rounded-xl border ${darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                        }`}
                    >
                      <p className="text-base md:text-lg break-words">
                        {insight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                className={`mt-8 p-4 md:p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-[1.01] transition ${darkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white"
                  : "bg-white"
                  }`}
              >

                <div id="monthly-spending-section">
                  <h2
                    className={`text-2xl font-bold italic ${darkMode
                      ? "text-white"
                      : "text-gray-900"
                      }`}
                  >
                    Monthly Expense Analysis
                  </h2>

                  <div className="h-[250px] md:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={darkMode ? "#374151" : "#D1D5DB"}
                        />

                        <XAxis
                          dataKey="month"
                          tick={{
                            fill: darkMode ? "#ffffff" : "#111827",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                          axisLine={false}
                          tickLine={false}
                        />

                        <YAxis
                          tick={{
                            fill: darkMode ? "#ffffff" : "#111827",
                            fontSize: 14,
                          }}
                          axisLine={false}
                          tickLine={false}
                        />

                        <Tooltip
                          cursor={{ fill: "rgba(59,130,246,0.1)" }}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            backgroundColor: darkMode
                              ? "#1F2937"
                              : "#ffffff",
                            color: darkMode
                              ? "#ffffff"
                              : "#000000",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                          }}

                          labelStyle={{
                            color: darkMode ? "#ffffff" : "#111827",
                            fontWeight: "bold",
                          }}

                          itemStyle={{
                            color: darkMode ? "#ffffff" : "#111827",
                          }}
                        />

                        <Bar
                          dataKey="amount"
                          radius={[12, 12, 0, 0]}
                          animationDuration={1500}
                        >
                          {monthlyData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.amount > 0 ? COLORS[index % COLORS.length] : "#D1D5DB"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>

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
          className={`mt-8 p-4 md:p-6 rounded-2xl shadow-md ${darkMode
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

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-5">

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

            <div className="md:hidden space-y-4 mb-6">

              {filteredExpenses.length > 0 ? (

                filteredExpenses.map((expense) => (

                  <div
                    key={expense._id}
                    className={`p-5 rounded-2xl shadow-md ${darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                      }`}
                  >

                    <div className="flex justify-between items-center">

                      <div>
                        <h3 className="text-lg font-bold">
                          {expense.title}
                        </h3>

                        <p className="text-sm opacity-70">
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>

                      <p className="text-xl font-bold text-green-500">
                        ₹{expense.amount}
                      </p>

                    </div>

                    <div className="flex justify-between items-center mt-4">

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
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(expense.category)}
                          {expense.category}
                        </div>
                      </span>

                      <div className="flex gap-2">

                        <button
                          onClick={() => setEditExpense(expense)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div
                  className={`text-center p-8 rounded-2xl ${darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-500"
                    }`}
                >
                  No expenses found
                </div>

              )}

            </div>

            <table className="hidden md:table w-full border-collapse">

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
                          <span className="inline-flex items-center gap-2">
                            {getCategoryIcon(expense.category)}
                            {expense.category}
                          </span>
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
                    <td colSpan="5" className="p-10">

                      <div className="flex flex-col items-center justify-center gap-4">

                        <FaInbox
                          className={`text-6xl ${darkMode
                            ? "text-gray-500"
                            : "text-gray-300"
                            }`}
                        />

                        <p
                          className={`text-xl font-semibold ${darkMode
                            ? "text-gray-300"
                            : "text-gray-500"
                            }`}
                        >
                          No expenses found
                        </p>

                        <p
                          className={`text-sm ${darkMode
                            ? "text-gray-400"
                            : "text-gray-400"
                            }`}
                        >
                          Start adding expenses to track your spending.
                        </p>

                      </div>

                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div >
  );
};

export default Dashboard;