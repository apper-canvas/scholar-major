import { Outlet } from "react-router-dom"
import Sidebar from "@/components/organisms/Sidebar"

const Layout = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-80 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout