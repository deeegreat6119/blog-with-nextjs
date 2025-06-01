"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import UserAuthGuard from "@/app/components/UserAuthGuard";
import UserInfo from "@/app/components/UserInfo";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", path: "dashboard", icon: "📊" },
    { label: "Posts", path: "posts", icon: "📝" },
    { label: "Create Post", path: "createpost", icon: "🆕" },
    { label: "Categories", path: "categories", icon: "🏷️" },
    { label: "Users", path: "users", icon: "👥" },
    { label: "Settings", path: "settings", icon: "⚙️" },
  ]

  return (
    <UserAuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 flex flex-col">
          <div className="mb-8 p-4">
            <h1 className="text-2xl font-bold">Post User</h1>
            <p className="text-sm text-slate-300">Content Management</p>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={`/admin/${item.path}`}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${pathname?.includes(item.path)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-slate-700">
            <UserInfo />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => pathname?.includes(item.path))?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <button
                className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
             bg-white text-gray-700 hover:bg-red-50 hover:text-red-600
             border border-gray-200 hover:border-red-200
             focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-opacity-50"
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/signin")
                }}
              >
                <span className="font-medium">Log out</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>
              </button>
              <div className="w-px h-6 bg-gray-200"></div>
              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">AD</span>
                </div>
                <span className="text-sm font-medium">Admin</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </UserAuthGuard>
  )
}

export default AdminLayout
