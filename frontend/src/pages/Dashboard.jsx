import ExpenseForm from "../components/ExpenseForm";
import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  FaMoneyBillWave,
  FaChartPie,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
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

          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg">
              Total Expenses
            </h3>

            <p className="text-4xl font-bold mt-3">
              ₹5000
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg">
              This Month
            </h3>

            <p className="text-4xl font-bold mt-3">
              ₹2000
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg">
              Remaining Budget
            </h3>

            <p className="text-4xl font-bold mt-3">
              ₹8000
            </p>
          </div>

        </div>

        {/* Recent Expenses */}

        <ExpenseForm fetchExpenses={fetchExpenses} />
        <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-5">
            Recent Expenses
          </h2>

          <div className="overflow-x-auto">

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

                {expenses.map((expense) => (
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