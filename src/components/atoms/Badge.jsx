import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    active: "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200",
    inactive: "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border-gray-200",
    primary: "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 border-primary-200",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-50 text-secondary-800 border-secondary-200",
    accent: "bg-gradient-to-r from-accent-100 to-accent-50 text-accent-800 border-accent-200"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border shadow-sm",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge