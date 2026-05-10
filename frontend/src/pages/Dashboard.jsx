import StatCard from "../components/StatCard"

function Dashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-zinc-400">
          Track your expenses and manage your finances efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
    </div>
  )
}

export default Dashboard