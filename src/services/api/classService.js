import classesData from "@/services/mockData/classes.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const classService = {
  async getAll() {
    await delay(300)
    return [...classesData]
  },

  async getById(id) {
    await delay(200)
    const classItem = classesData.find(cls => cls.Id === parseInt(id))
    if (!classItem) {
      throw new Error("Class not found")
    }
    return { ...classItem }
  },

async create(classData) {
    await delay(400)
    const maxId = Math.max(...classesData.map(c => c.Id), 0)
    const newClass = {
      ...classData,
      Id: maxId + 1,
      id: `CLS${String(maxId + 1).padStart(3, "0")}`,
      gradeLevel: classData.gradeLevel || "Not specified",
      description: classData.description || "",
      students: classData.students || 0
    }
    classesData.push(newClass)
    return { ...newClass }
  },

  async update(id, classData) {
    await delay(300)
    const index = classesData.findIndex(cls => cls.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Class not found")
    }
    classesData[index] = { ...classesData[index], ...classData }
    return { ...classesData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = classesData.findIndex(cls => cls.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Class not found")
    }
    const deletedClass = classesData.splice(index, 1)[0]
    return { ...deletedClass }
  }
}