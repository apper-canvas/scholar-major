import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { classService } from "@/services/api/classService";
import ApperIcon from "@/components/ApperIcon";
import Modal from "@/components/molecules/Modal";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";

const ClassCard = ({ classData }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-display group-hover:text-primary-600 transition-colors">
            {classData.name}
          </h3>
          <p className="text-secondary-600 font-semibold text-sm mt-1">
            {classData.subject}
          </p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center shadow-md">
          <ApperIcon name="BookOpen" size={20} className="text-primary-600" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center">
            <ApperIcon name="GraduationCap" size={14} className="text-accent-600" />
          </div>
          <span className="text-sm text-gray-600">Grade Level: <span className="font-semibold text-gray-900">{classData.gradeLevel || "Not specified"}</span></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
            <ApperIcon name="Users" size={14} className="text-primary-600" />
          </div>
          <span className="text-sm text-gray-600">Students: <span className="font-semibold text-gray-900">{classData.students}/{classData.capacity}</span></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center">
            <ApperIcon name="Clock" size={14} className="text-secondary-600" />
          </div>
          <span className="text-sm text-gray-600">Schedule: <span className="font-semibold text-gray-900">{classData.schedule}</span></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={14} className="text-white" />
          </div>
          <span className="text-sm text-gray-600">Teacher: <span className="font-semibold text-gray-900">{classData.teacher}</span></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center">
            <ApperIcon name="MapPin" size={14} className="text-white" />
          </div>
          <span className="text-sm text-gray-600">Location: <span className="font-semibold text-gray-900">{classData.room}</span></span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            classData.students >= classData.capacity 
              ? 'bg-red-100 text-red-700'
              : classData.students >= classData.capacity * 0.8
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {classData.students >= classData.capacity 
              ? 'Full'
              : classData.students >= classData.capacity * 0.8
              ? 'Nearly Full'
              : 'Available'
            }
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {classData.id}
          </span>
        </div>
      </div>
    </div>
  )
}

const CreateClassModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    gradeLevel: "",
    capacity: "",
    teacher: "",
    room: "",
    startTime: "",
    endTime: "",
    days: []
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const subjects = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "English", label: "English" },
    { value: "Science", label: "Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "Art", label: "Art" },
    { value: "Music", label: "Music" },
    { value: "Physical Education", label: "Physical Education" },
    { value: "Computer Science", label: "Computer Science" }
  ]

  const daysOfWeek = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "Class name is required"
    if (!formData.subject) newErrors.subject = "Subject is required"
    if (!formData.gradeLevel.trim()) newErrors.gradeLevel = "Grade level is required"
    if (!formData.capacity || formData.capacity < 1) newErrors.capacity = "Valid capacity is required"
    if (!formData.teacher.trim()) newErrors.teacher = "Teacher name is required"
    if (!formData.room.trim()) newErrors.room = "Classroom/Location is required"
    if (!formData.startTime) newErrors.startTime = "Start time is required"
    if (!formData.endTime) newErrors.endTime = "End time is required"
    if (formData.days.length === 0) newErrors.days = "At least one day must be selected"
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "End time must be after start time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const scheduleText = `${formData.days.join(", ")} ${formData.startTime}-${formData.endTime}`
      
      const classData = {
        name: formData.name.trim(),
        subject: formData.subject,
        description: formData.description.trim(),
        gradeLevel: formData.gradeLevel.trim(),
        capacity: parseInt(formData.capacity),
        teacher: formData.teacher.trim(),
        room: formData.room.trim(),
        schedule: scheduleText,
        students: 0
      }

      await classService.create(classData)
      toast.success("Class created successfully!")
      onSuccess()
      onClose()
      setFormData({
        name: "",
        subject: "",
        description: "",
        gradeLevel: "",
        capacity: "",
        teacher: "",
        room: "",
        startTime: "",
        endTime: "",
        days: []
      })
    } catch (error) {
      toast.error("Failed to create class. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Class"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Class Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="e.g. Advanced Mathematics"
          />

          <FormField
            label="Subject"
            type="select"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            options={subjects}
            error={errors.subject}
          />
        </div>

        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description of the class"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Grade Level"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleInputChange}
            error={errors.gradeLevel}
            placeholder="e.g. Grade 10, High School"
          />

          <FormField
            label="Capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            error={errors.capacity}
            placeholder="Maximum number of students"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleInputChange}
            error={errors.teacher}
            placeholder="Teacher name"
          />

          <FormField
            label="Classroom/Location"
            name="room"
            value={formData.room}
            onChange={handleInputChange}
            error={errors.room}
            placeholder="e.g. Room 201, Lab 301"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Schedule Days
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek.map((day) => (
              <button
                key={day.value}
                type="button"
                onClick={() => handleDayToggle(day.value)}
                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  formData.days.includes(day.value)
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
          {errors.days && (
            <p className="text-sm text-red-600 font-medium mt-2">{errors.days}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Start Time"
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            error={errors.startTime}
          />

          <FormField
            label="End Time"
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            error={errors.endTime}
          />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" size={16} />
                Create Class
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

const ClassesPage = () => {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchClasses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await classService.getAll()
      setClasses(data)
    } catch (err) {
      setError("Failed to load classes. Please try again.")
      toast.error("Failed to load classes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleCreateSuccess = () => {
    fetchClasses()
  }

  if (loading) {
    return <Loading message="Loading classes..." />
  }

  if (error) {
    return <Error message={error} onRetry={fetchClasses} />
  }

  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">
              Classes
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              Manage your class schedules and assignments
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            Create Class
          </Button>
        </div>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="BookOpen" size={36} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
              No Classes Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start by creating your first class to manage schedules and assignments.
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name="Plus" size={16} />
              Create Your First Class
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classData) => (
              <ClassCard key={classData.Id} classData={classData} />
            ))}
          </div>
        )}

        {/* Create Class Modal */}
        <CreateClassModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </div>
  )
}

export default ClassesPage
