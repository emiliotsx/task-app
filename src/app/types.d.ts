interface Task {
  id: number
  description: string
  details?: string
  date?: Date
  status: number
  subTasks?: Task[]
  category?: number
}

interface Category {
  id: number,
  description: string
}