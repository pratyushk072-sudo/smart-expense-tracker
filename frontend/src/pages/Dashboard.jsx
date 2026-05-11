import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Swiggy Order",
      amount: 450,
      category: "Food",
    },
    {
      id: 2,
      title: "Uber Ride",
      amount: 220,
      category: "Transport",
    },
  ]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <div className="mb-10">
        <ExpenseForm addExpense={addExpense} />
        <h1 className="text-4xl font-bold text-white mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-zinc-400">
          Track your expenses and manage your finances efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Balance"
          amount="₹45,000"
        />

        <StatCard
          title="Monthly Expenses"
          amount="₹12,500"
        />

        <StatCard
          title="Savings"
          amount="₹32,500"
        />

        <StatCard
          title="Budget Left"
          amount="₹7,500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>
        </div>

        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-white text-xl font-semibold">
                  {expense.title}
                </h3>

                <p className="text-gray-400">
                  {expense.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <h2 className="text-red-400 text-2xl font-bold">
                  ₹{expense.amount}
                </h2>

                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard