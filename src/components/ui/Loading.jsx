import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading students..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <ApperIcon name="Loader2" size={32} className="text-primary-600 animate-spin" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full animate-ping opacity-20"></div>
      </div>
      <p className="text-gray-600 font-medium text-lg">{message}</p>
      <div className="mt-8 space-y-4 w-full max-w-2xl">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gradient-to-r from-gray-200 to-gray-100 h-16 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading