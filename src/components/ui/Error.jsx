import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name="AlertCircle" size={36} className="text-red-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}. Please try again or contact support if the problem persists.
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} className="shadow-lg">
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error