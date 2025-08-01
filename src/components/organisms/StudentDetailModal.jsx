import { useState } from "react"
import { format } from "date-fns"
import Modal from "@/components/molecules/Modal"
import StatusBadge from "@/components/molecules/StatusBadge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const StudentDetailModal = ({ isOpen, onClose, student }) => {
  const [activeTab, setActiveTab] = useState("basic")

  if (!student) return null

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "User" },
    { id: "contact", label: "Contact Details", icon: "Phone" },
    { id: "academic", label: "Academic Info", icon: "BookOpen" }
  ]

  const TabButton = ({ tab, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200",
        isActive
          ? "bg-primary-50 text-primary-700 border border-primary-200 shadow-sm"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      <ApperIcon name={tab.icon} size={16} />
      {tab.label}
    </button>
  )

  const InfoCard = ({ icon, label, value, iconBg = "bg-primary-100", iconColor = "text-primary-600" }) => (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <ApperIcon name={icon} size={16} className={iconColor} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-gray-900 font-medium mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  )

  const StatCard = ({ icon, value, label, bgColor, iconColor, textColor }) => (
    <div className={cn("text-center p-4 rounded-xl border", bgColor)}>
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2", iconColor)}>
        <ApperIcon name={icon} size={16} />
      </div>
      <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
      <p className={cn("text-sm font-medium", textColor)}>{label}</p>
    </div>
  )

  const BasicInfoTab = () => (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">
            {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 font-display">
            {student.name}
          </h3>
          <p className="text-gray-600 font-medium">Student Profile</p>
        </div>
        <StatusBadge status={student.status} />
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon="Hash"
          label="Student ID"
          value={student.id}
        />
        <InfoCard
          icon="BookOpen"
          label="Grade Level"
          value={student.gradeLevel}
        />
        <InfoCard
          icon="Calendar"
          label="Enrollment Date"
          value={student.enrollmentDate ? format(new Date(student.enrollmentDate), "PPP") : "Not available"}
        />
        <InfoCard
          icon="Clock"
          label="Status"
          value={student.status}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon="TrendingUp"
          value="A+"
          label="Average Grade"
          bgColor="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
          iconColor="bg-green-100 text-green-600"
          textColor="text-green-800"
        />
        <StatCard
          icon="Calendar"
          value="98%"
          label="Attendance"
          bgColor="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100"
          iconColor="bg-blue-100 text-blue-600"
          textColor="text-blue-800"
        />
        <StatCard
          icon="BookOpen"
          value="6"
          label="Classes"
          bgColor="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-100"
          iconColor="bg-purple-100 text-purple-600"
          textColor="text-purple-800"
        />
      </div>
    </div>
  )

  const ContactDetailsTab = () => (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon="Mail"
          label="Email Address"
          value={student.email}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <InfoCard
          icon="Phone"
          label="Phone Number"
          value={student.phone || "Not provided"}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Address Information */}
      <div>
        <InfoCard
          icon="MapPin"
          label="Home Address"
          value={student.address || "Not provided"}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Emergency Contact */}
      <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="AlertCircle" size={20} className="text-red-600" />
          Emergency Contact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Name</p>
            <p className="text-gray-900 font-medium mt-1">John Doe (Father)</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Phone</p>
            <p className="text-gray-900 font-medium mt-1">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="MessageSquare" size={20} className="text-purple-600" />
          Communication Preferences
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Notifications</span>
            <span className="text-green-600 font-medium">Enabled</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">SMS Alerts</span>
            <span className="text-green-600 font-medium">Enabled</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Progress Reports</span>
            <span className="text-blue-600 font-medium">Weekly</span>
          </div>
        </div>
      </div>
    </div>
  )

  const AcademicInfoTab = () => (
    <div className="space-y-6">
      {/* Academic Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="Award"
          value="3.8"
          label="GPA"
          bgColor="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-100"
          iconColor="bg-yellow-100 text-yellow-600"
          textColor="text-yellow-800"
        />
        <StatCard
          icon="Target"
          value="42"
          label="Credits"
          bgColor="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100"
          iconColor="bg-indigo-100 text-indigo-600"
          textColor="text-indigo-800"
        />
        <StatCard
          icon="TrendingUp"
          value="12th"
          label="Rank"
          bgColor="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100"
          iconColor="bg-emerald-100 text-emerald-600"
          textColor="text-emerald-800"
        />
        <StatCard
          icon="Calendar"
          value="4"
          label="Year"
          bgColor="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100"
          iconColor="bg-rose-100 text-rose-600"
          textColor="text-rose-800"
        />
      </div>

      {/* Current Subjects */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="BookOpen" size={20} className="text-blue-600" />
          Current Subjects
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Mathematics", "Physics", "Chemistry", "English Literature", "History", "Biology"].map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
              <span className="font-medium text-gray-800">{subject}</span>
              <span className="text-blue-600 font-semibold">A-</span>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Progress */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="BarChart3" size={20} className="text-green-600" />
          Academic Progress
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Assignments Completed</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-green-600 font-medium">92%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Test Average</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <span className="text-blue-600 font-medium">88%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Participation</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-purple-600 font-medium">95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="Trophy" size={20} className="text-yellow-600" />
          Recent Achievements
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-yellow-100">
            <ApperIcon name="Medal" size={16} className="text-yellow-600" />
            <div>
              <p className="font-medium text-gray-800">Honor Roll - Q3 2024</p>
              <p className="text-sm text-gray-600">Outstanding academic performance</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-yellow-100">
            <ApperIcon name="Star" size={16} className="text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Mathematics Competition - 1st Place</p>
              <p className="text-sm text-gray-600">Regional mathematics olympiad</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-yellow-100">
            <ApperIcon name="Award" size={16} className="text-green-600" />
            <div>
              <p className="font-medium text-gray-800">Perfect Attendance - Semester 1</p>
              <p className="text-sm text-gray-600">No absences recorded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicInfoTab />
      case "contact":
        return <ContactDetailsTab />
      case "academic":
        return <AcademicInfoTab />
      default:
        return <BasicInfoTab />
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile"
      size="xl"
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button variant="outline">
            <ApperIcon name="Edit" size={18} />
            Edit Student
          </Button>
          <Button variant="primary">
            <ApperIcon name="MessageSquare" size={18} />
            Send Message
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default StudentDetailModal