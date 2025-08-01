import gradesData from "@/services/mockData/grades.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const gradeService = {
  async getAll() {
    await delay(300)
    return [...gradesData]
  },

  async getById(id) {
    await delay(200)
    const grade = gradesData.find(grade => grade.Id === parseInt(id))
    if (!grade) {
      throw new Error("Grade not found")
    }
    return { ...grade }
  },

  async getByStudentId(studentId) {
    await delay(200)
    return gradesData.filter(grade => grade.studentId === studentId).map(grade => ({ ...grade }))
  },

  async getByClassId(classId) {
    await delay(200)
    return gradesData.filter(grade => grade.classId === classId).map(grade => ({ ...grade }))
  },

  async create(gradeData) {
    await delay(400)
    const maxId = Math.max(...gradesData.map(g => g.Id), 0)
    const newGrade = {
      ...gradeData,
      Id: maxId + 1
    }
    gradesData.push(newGrade)
    return { ...newGrade }
  },

  async update(id, gradeData) {
    await delay(300)
    const index = gradesData.findIndex(grade => grade.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Grade not found")
    }
    gradesData[index] = { ...gradesData[index], ...gradeData }
    return { ...gradesData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = gradesData.findIndex(grade => grade.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Grade not found")
    }
    const deletedGrade = gradesData.splice(index, 1)[0]
    return { ...deletedGrade }
  }
}