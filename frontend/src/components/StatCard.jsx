function StatCard({ title, amount }) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition">
        <h3 className="text-zinc-400 text-sm mb-3">
          {title}
        </h3>
  
        <p className="text-3xl font-bold text-white">
          {amount}
        </p>
      </div>
    )
  }
  
  export default StatCard