import { useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaPlus,
  FaChartLine,
} from "react-icons/fa";
function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-zinc-900 h-screen p-5 border-r border-zinc-800">
      <h1 className="text-2xl font-bold text-white mb-10">
        Expense Tracker
      </h1>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 text-left bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-xl transition"
        >
          <FaChartPie />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/expenses")}
          className="w-full flex items-center gap-3 text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition"
        >
          <FaMoneyBillWave />
          Expenses
        </button>

        <button
          onClick={() => navigate("/add-expense")}
          className="w-full flex items-center gap-3 text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition"
        >
          <FaPlus />
          Budgets
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="w-full flex items-center gap-3 text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition"
        >
          <FaChartPie />
          Analytics
        </button>

        <button
          onClick={() => navigate("/monthly-spending")}
          className="w-full flex items-center gap-3 text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition"
        >
          <FaChartLine />
          Monthly Spending
        </button>

      </div>
    </div>
  )
}

export default Sidebar