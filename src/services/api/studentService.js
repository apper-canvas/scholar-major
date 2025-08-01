import studentsData from "@/services/mockData/students.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const studentService = {
  async getAll() {
    await delay(300)
    return [...studentsData]
  },

  async getById(id) {
    await delay(200)
    const student = studentsData.find(student => student.Id === parseInt(id))
    if (!student) {
      throw new Error("Student not found")
    }
    return { ...student }
  },

  async create(studentData) {
    await delay(400)
    const maxId = Math.max(...studentsData.map(s => s.Id), 0)
    const newStudent = {
      ...studentData,
      Id: maxId + 1,
      id: `STU${String(maxId + 1).padStart(3, "0")}`,
      enrollmentDate: new Date().toISOString().split("T")[0]
    }
    studentsData.push(newStudent)
    return { ...newStudent }
  },

  async update(id, studentData) {
    await delay(300)
    const index = studentsData.findIndex(student => student.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Student not found")
    }
    studentsData[index] = { ...studentsData[index], ...studentData }
    return { ...studentsData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = studentsData.findIndex(student => student.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Student not found")
    }
    const deletedStudent = studentsData.splice(index, 1)[0]
    return { ...deletedStudent }
  }
}