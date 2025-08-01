import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SidebarItem = ({ to, icon, label, isActive }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive: navIsActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative group",
          navIsActive || isActive
            ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
            : "text-gray-600 hover:text-primary-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50"
        )
      }
    >
      {({ isActive: navIsActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            size={20} 
            className={cn(
              "transition-colors duration-200",
              navIsActive || isActive ? "text-white" : "text-gray-500 group-hover:text-primary-600"
            )} 
          />
          <span className="font-semibold">
            {label}
          </span>
          {(navIsActive || isActive) && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
          )}
        </>
      )}
    </NavLink>
  )
}

export default SidebarItem