import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const StatusBadge = ({ status }) => {
  const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return {
          variant: "active",
          icon: "CheckCircle",
          text: "Active"
        }
      case "inactive":
        return {
          variant: "inactive",
          icon: "Circle",
          text: "Inactive"
        }
      default:
        return {
          variant: "default",
          icon: "Circle",
          text: status || "Unknown"
        }
    }
  }

  const { variant, icon, text } = getStatusProps(status)

  return (
    <Badge variant={variant}>
      <ApperIcon name={icon} size={12} />
      {text}
    </Badge>
  )
}

export default StatusBadge