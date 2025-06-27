import { Link, Outlet, useLocation } from "react-router-dom"
import { HomeIcon, FileText, Bot, Map } from "lucide-react"

export const DashBoardLayout = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.includes(path)) return true
    return false
  }

  return (
    <div className="h-screen">
      {/* Header */}
      <header className="bg-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 w-full z-10">
        <img src="./butler-logo.svg" />
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="size-12 bg-gray-400 rounded-full">
            <img src="./profile-img.png" className="rounded-full" />
          </div>
        </div>
      </header>
      {/* Left Sidebar */}
      <div className="w-64 bg-black text-white p-6 h-full fixed">
        <nav className="space-y-6">
          <Link to="/" className={`flex items-center gap-3 ${isActive("/") ? "text-white" : "text-gray-400"}`}>
            <HomeIcon size={20} />
            <span className="text-sm font-medium">HOME</span>
          </Link>
          <Link to="map-view" className={`flex items-center gap-3 ${isActive("map-view") ? "text-white" : "text-gray-400"}`}>
            <Map size={20} />
            <span className="text-sm font-medium">VIEW MAP</span>
          </Link>
          <Link to="make-report" className={`flex items-center gap-3 ${isActive("make-report") ? "text-white" : "text-gray-400"}`}>
            <FileText size={20} />
            <span className="text-sm font-medium">MAKE REPORT</span>
          </Link>
          <div className="flex items-center gap-3 text-gray-400">
            <Bot size={20} />
            <span className="text-sm font-medium">BUTLER</span>
          </div>
        </nav>
      </div>
      <div className="w-[80vw] ml-auto"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
