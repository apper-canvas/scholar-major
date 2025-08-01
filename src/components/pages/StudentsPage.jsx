import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import StudentsTable from "@/components/organisms/StudentsTable"
import AddStudentModal from "@/components/organisms/AddStudentModal"
import StudentDetailModal from "@/components/organisms/StudentDetailModal"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { studentService } from "@/services/api/studentService"

const StudentsPage = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const loadStudents = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await studentService.getAll()
      setStudents(data)
    } catch (err) {
      setError("Failed to load students. Please try again.")
      console.error("Error loading students:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const handleAddStudent = async (studentData) => {
    try {
      const newStudent = await studentService.create(studentData)
      setStudents(prev => [newStudent, ...prev])
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding student:", err)
      throw err
    }
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student)
    setIsDetailModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Loading message="Loading students..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Error message={error} onRetry={loadStudents} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">
              Students
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              Manage and track your student roster
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <SearchBar
              placeholder="Search students by name, ID, or email..."
              onSearch={setSearchTerm}
              className="w-full sm:w-80"
            />
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              className="shrink-0 shadow-lg"
            >
              <ApperIcon name="Plus" size={18} />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-6 border border-primary-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-xl">
                <ApperIcon name="Users" size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-800">
                  {students.length}
                </p>
                <p className="text-primary-600 font-semibold">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <ApperIcon name="CheckCircle" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-800">
                  {students.filter(s => s.status === "Active").length}
                </p>
                <p className="text-green-600 font-semibold">Active Students</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent-50 to-orange-50 rounded-2xl p-6 border border-accent-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-100 rounded-xl">
                <ApperIcon name="TrendingUp" size={24} className="text-accent-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-800">98%</p>
                <p className="text-accent-600 font-semibold">Avg Attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table */}
        {students.length === 0 ? (
          <Empty
            title="No students found"
            description="Start building your student roster by adding your first student."
            actionLabel="Add First Student"
            onAction={() => setIsAddModalOpen(true)}
            icon="Users"
          />
        ) : (
          <StudentsTable
            students={students}
            onStudentClick={handleStudentClick}
            searchTerm={searchTerm}
          />
        )}

        {/* Modals */}
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onStudentAdded={handleAddStudent}
        />

        <StudentDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          student={selectedStudent}
        />
      </div>
    </div>
  )
}

export default StudentsPage