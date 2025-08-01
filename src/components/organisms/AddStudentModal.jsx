import { useState } from "react"
import { toast } from "react-toastify"
import Modal from "@/components/molecules/Modal"
import FormField from "@/components/molecules/FormField"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const AddStudentModal = ({ isOpen, onClose, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gradeLevel: "",
    phone: "",
    address: "",
    status: "Active"
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const gradeOptions = [
    { value: "K", label: "Kindergarten" },
    { value: "1st", label: "1st Grade" },
    { value: "2nd", label: "2nd Grade" },
    { value: "3rd", label: "3rd Grade" },
    { value: "4th", label: "4th Grade" },
    { value: "5th", label: "5th Grade" },
    { value: "6th", label: "6th Grade" },
    { value: "7th", label: "7th Grade" },
    { value: "8th", label: "8th Grade" },
    { value: "9th", label: "9th Grade" },
    { value: "10th", label: "10th Grade" },
    { value: "11th", label: "11th Grade" },
    { value: "12th", label: "12th Grade" }
  ]

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.gradeLevel) {
      newErrors.gradeLevel = "Grade level is required"
    }

    if (!formData.status) {
      newErrors.status = "Status is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
        enrollmentDate: new Date().toISOString().split("T")[0]
      }

      onStudentAdded(newStudent)
      toast.success("Student added successfully!")
      handleClose()
    } catch (error) {
      toast.error("Failed to add student. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      gradeLevel: "",
      phone: "",
      address: "",
      status: "Active"
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Student"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="Enter student's full name"
            className="md:col-span-2"
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="student@email.com"
          />

          <FormField
            label="Grade Level"
            name="gradeLevel"
            type="select"
            value={formData.gradeLevel}
            onChange={handleInputChange}
            error={errors.gradeLevel}
            options={gradeOptions}
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            placeholder="(555) 123-4567"
          />

          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            error={errors.status}
            options={statusOptions}
          />

          <FormField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={errors.address}
            placeholder="Enter student's address"
            className="md:col-span-2"
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader2" size={18} className="animate-spin" />
                Adding Student...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" size={18} />
                Add Student
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddStudentModal