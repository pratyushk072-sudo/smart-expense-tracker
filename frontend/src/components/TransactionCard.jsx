function TransactionCard({
    title,
    category,
    amount,
    date,
  }) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between hover:border-zinc-700 transition">
        <div>
          <h3 className="text-white font-semibold text-lg">
            {title}
          </h3>
  
          <div className="flex items-center gap-3 mt-2">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              {category}
            </span>
  
            <span className="text-zinc-500 text-sm">
              {date}
            </span>
          </div>
        </div>
  
        <div>
          <p className="text-red-400 font-bold text-xl">
            - ₹{amount}
          </p>
        </div>
      </div>
    )
  }
  
  export default TransactionCard