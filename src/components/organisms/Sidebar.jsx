import { useState } from "react"
import { useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import SidebarItem from "@/components/molecules/SidebarItem"
import { cn } from "@/utils/cn"

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { to: "/students", icon: "Users", label: "Students" },
    { to: "/classes", icon: "BookOpen", label: "Classes" },
    { to: "/grades", icon: "FileText", label: "Grades" },
    { to: "/attendance", icon: "Calendar", label: "Attendance" },
    { to: "/reports", icon: "BarChart3", label: "Reports" },
    { to: "/settings", icon: "Settings", label: "Settings" }
  ]

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)
  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobile}
          className="p-2 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <ApperIcon name="Menu" size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <ApperIcon name="GraduationCap" size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-white font-display">
                Scholar Hub
              </h1>
            </div>
            <button
              onClick={closeMobile}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.to} onClick={closeMobile}>
              <SidebarItem
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to || (location.pathname === "/" && item.to === "/students")}
              />
            </div>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 shadow-lg">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <ApperIcon name="GraduationCap" size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white font-display">
              Scholar Hub
            </h1>
          </div>
          <p className="text-primary-100 text-sm mt-2 font-medium">
            Student Management Platform
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to || (location.pathname === "/" && item.to === "/students")}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="text-center text-xs text-gray-500">
            <p className="font-semibold">Scholar Hub v1.0</p>
            <p>Education Management System</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar