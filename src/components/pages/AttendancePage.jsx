import ApperIcon from "@/components/ApperIcon"

const AttendancePage = () => {
  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Attendance
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Monitor student attendance and participation
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 text-center border border-green-100 shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ApperIcon name="Calendar" size={36} className="text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            Attendance Tracking Coming Soon
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline attendance taking with our digital attendance system. Track daily attendance, 
            identify patterns, send automated notifications to parents, and generate comprehensive attendance reports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="CheckSquare" size={20} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quick Roll Call</h3>
              <p className="text-sm text-gray-600">Fast and intuitive daily attendance taking with one-click marking.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Bell" size={20} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Auto Notifications</h3>
              <p className="text-sm text-gray-600">Automatic alerts to parents and administrators for absences.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="PieChart" size={20} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Attendance Reports</h3>
              <p className="text-sm text-gray-600">Detailed attendance reports and analytics for better insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendancePage