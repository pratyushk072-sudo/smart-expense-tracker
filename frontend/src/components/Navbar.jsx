function Navbar() {
    return (
      <div className="h-20 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-8">
        <h2 className="text-2xl font-semibold text-white">
          Dashboard
        </h2>
  
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500"></div>
        </div>
      </div>
    )
  }
  
  export default Navbar