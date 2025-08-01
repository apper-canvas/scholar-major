import { useState, useMemo } from "react"
import ApperIcon from "@/components/ApperIcon"
import StatusBadge from "@/components/molecules/StatusBadge"
import { cn } from "@/utils/cn"

const StudentsTable = ({ students, onStudentClick, searchTerm }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students
    
    return students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [students, searchTerm])

  const sortedStudents = useMemo(() => {
    if (!sortConfig.key) return filteredStudents

    return [...filteredStudents].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredStudents, sortConfig])

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc"
    }))
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ApperIcon name="ArrowUpDown" size={16} className="text-gray-400" />
    }
    return sortConfig.direction === "asc" 
      ? <ApperIcon name="ArrowUp" size={16} className="text-primary-600" />
      : <ApperIcon name="ArrowDown" size={16} className="text-primary-600" />
  }

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "id", label: "Student ID", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "gradeLevel", label: "Grade Level", sortable: true },
    { key: "status", label: "Status", sortable: true }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 text-left">
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary-700 transition-colors duration-200 group"
                    >
                      {column.label}
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {getSortIcon(column.key)}
                      </span>
                    </button>
                  ) : (
                    <span className="text-sm font-bold text-gray-700">
                      {column.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedStudents.map((student, index) => (
              <tr
                key={student.id}
                onClick={() => onStudentClick(student)}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:scale-[1.01] hover:shadow-md",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">
                        {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">Student</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                    {student.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a 
                    href={`mailto:${student.email}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {student.email}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-accent-100 to-accent-50 text-accent-800 border border-accent-200">
                    <ApperIcon name="BookOpen" size={12} />
                    {student.gradeLevel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={student.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedStudents.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500">
            {searchTerm ? "Try adjusting your search terms" : "No students have been added yet"}
          </p>
        </div>
      )}
    </div>
  )
}

export default StudentsTable