import ApperIcon from "@/components/ApperIcon"

const ClassesPage = () => {
  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Classes
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Manage your class schedules and assignments
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-r from-secondary-50 to-purple-50 rounded-2xl p-12 text-center border border-secondary-100 shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-r from-secondary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ApperIcon name="BookOpen" size={36} className="text-secondary-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            Class Management Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're building powerful class management features that will help you organize course schedules, 
            track assignments, manage classroom rosters, and streamline your teaching workflow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Calendar" size={20} className="text-secondary-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Schedule Management</h3>
              <p className="text-sm text-gray-600">Create and manage class schedules with time slots and room assignments.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="FileText" size={20} className="text-secondary-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Assignment Tracking</h3>
              <p className="text-sm text-gray-600">Track assignments, homework, and project deadlines for each class.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Users" size={20} className="text-secondary-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Class Rosters</h3>
              <p className="text-sm text-gray-600">Organize students into classes and manage enrollment seamlessly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassesPage