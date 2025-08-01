import { format } from "date-fns"
import Modal from "@/components/molecules/Modal"
import StatusBadge from "@/components/molecules/StatusBadge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const StudentDetailModal = ({ isOpen, onClose, student }) => {
  if (!student) return null

  const studentInfo = [
    { label: "Student ID", value: student.id, icon: "Hash" },
    { label: "Email", value: student.email, icon: "Mail" },
    { label: "Grade Level", value: student.gradeLevel, icon: "BookOpen" },
    { label: "Phone", value: student.phone || "Not provided", icon: "Phone" },
    { label: "Address", value: student.address || "Not provided", icon: "MapPin" },
    { 
      label: "Enrollment Date", 
      value: student.enrollmentDate ? format(new Date(student.enrollmentDate), "PPP") : "Not available", 
      icon: "Calendar" 
    }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Details"
      size="lg"
    >
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

        {/* Student Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentInfo.map((info, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <ApperIcon name={info.icon} size={16} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {info.label}
                  </p>
                  <p className="text-gray-900 font-medium mt-1">
                    {info.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="TrendingUp" size={16} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-800">A+</p>
            <p className="text-sm text-green-600 font-medium">Average Grade</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Calendar" size={16} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-800">98%</p>
            <p className="text-sm text-blue-600 font-medium">Attendance</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="BookOpen" size={16} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-800">6</p>
            <p className="text-sm text-purple-600 font-medium">Classes</p>
          </div>
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