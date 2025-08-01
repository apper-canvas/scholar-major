import ApperIcon from "@/components/ApperIcon"

const ReportsPage = () => {
  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Reports
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Generate insights and analytics from your data
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-center border border-blue-100 shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ApperIcon name="BarChart3" size={36} className="text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            Advanced Reports & Analytics Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get powerful insights into student performance, attendance trends, class analytics, and more. 
            Generate custom reports with interactive charts and export data for deeper analysis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="LineChart" size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Performance Analytics</h3>
              <p className="text-sm text-gray-600">Track student progress and identify learning patterns over time.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Download" size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Export Reports</h3>
              <p className="text-sm text-gray-600">Generate and export detailed reports in PDF, Excel, and CSV formats.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Filter" size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Custom Filters</h3>
              <p className="text-sm text-gray-600">Filter and customize reports by date range, class, student, or subject.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage