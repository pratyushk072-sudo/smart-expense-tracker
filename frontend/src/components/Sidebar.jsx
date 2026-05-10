function Sidebar() {
    return (
      <div className="w-64 bg-zinc-900 h-screen p-5 border-r border-zinc-800">
        <h1 className="text-2xl font-bold text-white mb-10">
          Expense Tracker
        </h1>
  
        <div className="space-y-4">
          <button className="w-full text-left bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-xl transition">
            Dashboard
          </button>
  
          <button className="w-full text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition">
            Expenses
          </button>
  
          <button className="w-full text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition">
            Budgets
          </button>
  
          <button className="w-full text-left hover:bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl transition">
            Analytics
          </button>
        </div>
      </div>
    )
  }
  
  export default Sidebar