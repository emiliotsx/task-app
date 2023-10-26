interface Task {
  id: number
  description: string
  details?: string
  dateStart?: Date
  dateEnd?: Date
  status: number
  subTasks?: Task[]
  category?: number
  htmlLink?: string
}

interface Category {
  id: number,
  description: string
}