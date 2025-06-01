const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-[75rem] mx-auto flex items-center justify-between p-6">
        <ul className="flex flex-col md:flex-row items-start lg:items-center gap-x-6">
          <li>Product Suits</li>
          <li>Use Case</li>
          <li>Developer</li>
          <li>Pricing</li>
          <li>News</li>
        </ul>

        <div className="flex items-center gap-x-6">
          <span>Login</span>
          <span>Contact Sales</span>
          <button className="px-5 py-2 hover:scale-110 font-medium cursor-pointer hover:bg-teal-400 transition duration-500 rounded-full bg-white text-slate-900">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
