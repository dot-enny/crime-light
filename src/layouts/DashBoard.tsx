import { Link, Outlet, useLocation } from "react-router-dom"
import { HomeIcon, FileText, Bot, Map, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export const DashBoardLayout = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/dashboard") return true
    if (path !== "/" && location.pathname.includes(path)) return true
    return false
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between fixed w-full z-50">
        <div className="flex items-center">
          <img src="./butler-logo.svg" className="h-8" />
        </div>
        <div className="flex items-center gap-3">
          {/* User Avatar - hidden on small screens */}
          <div className="hidden sm:block size-10 bg-gray-400 rounded-full overflow-hidden">
            <img src="./profile-img.png" className="w-full h-full object-cover rounded-full" />
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-300 transition-colors relative z-50"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <div className={`
          fixed lg:fixed lg:pt-24 top-0 left-0 z-40 h-full
          w-64 bg-black text-white p-6
          transform transition-transform duration-300 ease-in-out lg:transition-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="space-y-6 pt-20 lg:pt-0">
            <Link 
              to="/dashboard" 
              state={{ from: location.pathname }}
              className={`flex items-center gap-3 hover:text-gray-200 transition-colors ${isActive("/") ? "text-white" : "text-gray-400"}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <HomeIcon size={20} />
              <span className="text-sm font-medium">HOME</span>
            </Link>
            <Link 
              to="/dashboard/map-view" 
              state={{ from: location.pathname }}
              className={`flex items-center gap-3 hover:text-gray-200 transition-colors ${isActive("map-view") ? "text-white" : "text-gray-400"}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Map size={20} />
              <span className="text-sm font-medium">VIEW MAP</span>
            </Link>
            <Link 
              to="/dashboard/make-report" 
              state={{ from: location.pathname }}
              className={`flex items-center gap-3 hover:text-gray-200 transition-colors ${isActive("make-report") ? "text-white" : "text-gray-400"}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FileText size={20} />
              <span className="text-sm font-medium">MAKE REPORT</span>
            </Link>
            <div className="flex items-center gap-3 text-gray-400">
              <Bot size={20} />
              <span className="text-sm font-medium">BUTLER</span>
            </div>
            <Link 
              to="/auth/sign-in" 
              className="absolute bottom-6 left-6 flex items-center gap-x-2 hover:text-red-300 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <LogOut className="text-red-500" />
              <span className="text-sm font-medium text-red-500">Logout</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 overflow-auto pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
