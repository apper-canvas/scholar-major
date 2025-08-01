import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item.",
  actionLabel = "Add Item",
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-slate-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name={icon} size={36} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button variant="primary" onClick={onAction} className="shadow-lg">
          <ApperIcon name="Plus" size={18} />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty