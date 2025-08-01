import ApperIcon from "@/components/ApperIcon"

const GradesPage = () => {
  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Grades
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Track student performance and academic progress
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-r from-accent-50 to-orange-50 rounded-2xl p-12 text-center border border-accent-100 shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-r from-accent-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ApperIcon name="TrendingUp" size={36} className="text-accent-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            Grade Book Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our comprehensive gradebook system will help you record grades, calculate averages, 
            track student progress over time, and generate detailed performance reports for students and parents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="FileText" size={20} className="text-accent-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Grade Recording</h3>
              <p className="text-sm text-gray-600">Quickly record and organize grades for assignments, tests, and projects.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Calculator" size={20} className="text-accent-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Auto Calculations</h3>
              <p className="text-sm text-gray-600">Automatic grade averaging and weighted scoring with customizable rubrics.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="BarChart3" size={20} className="text-accent-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Progress Analytics</h3>
              <p className="text-sm text-gray-600">Visual charts and analytics to track student performance trends.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradesPage