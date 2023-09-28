import { ID_LOCAL_STORAGE } from './constants'

export const getTasksInStorage = (): Task[] => {
  const tasks = (localStorage.getItem(ID_LOCAL_STORAGE.TASKS) ?? []) as string
  return (tasks.length > 0)
    ? JSON.parse(tasks) as Task[]
    : []
}

export const createTasksInStorage = (task: Task) => {
  const tasks = getTasksInStorage()
  task.id = (tasks.length > 0) ? tasks[tasks.length - 1]['id'] + 1 : 1
  tasks.push(task)
  localStorage.setItem(ID_LOCAL_STORAGE.TASKS, JSON.stringify(tasks))
}

export const updateTasksInStorage = (task: Task) => {
  const tasks = getTasksInStorage()
  const updatedTask = tasks.findIndex((t: Task) => t.id === task.id)

  tasks[updatedTask]['description'] = task.description
  tasks[updatedTask]['details'] = task.details
  tasks[updatedTask]['date'] = task.date
  tasks[updatedTask]['status'] = task.status
  tasks[updatedTask]['category'] = task.category

  localStorage.setItem(ID_LOCAL_STORAGE.TASKS, JSON.stringify(tasks))
}

export const deleteTasksInStorage = (task: Task) => {
  const tasks = getTasksInStorage()
  const deletedTask = tasks.findIndex((t: Task) => t.id === task.id)

  tasks.splice(deletedTask, 1)
  localStorage.setItem(ID_LOCAL_STORAGE.TASKS, JSON.stringify(tasks))
}

export const formatInputDate = (dateValue: string) => {
  const date = new Date(dateValue || '')
  const year = date?.getFullYear()
  const month = (date?.getMonth() as number) + 1
  const day = date?.getDate()

  const monthDate = (month >= 10) ? month : `0${month}`
  const dayDate = (day >= 10) ? day : `0${day}`

  return `${year}-${monthDate}-${dayDate}`

}

export const getCategoriesInStorage = (): Category[] => {
  const categories = (localStorage.getItem(ID_LOCAL_STORAGE.CATEGORIES) ?? []) as string
  return (categories.length > 0)
    ? JSON.parse(categories) as Category[]
    : []
}

export const createCategoriesInStorage = (category: Category) => {
  const categories = getCategoriesInStorage()
  category.id = (categories.length > 0) ? categories[categories.length - 1]['id'] + 1 : 1
  categories.push(category)
  localStorage.setItem(ID_LOCAL_STORAGE.CATEGORIES, JSON.stringify(categories))
}

export const updateCategoriesInStorage = (category: Category) => {
  const categories = getCategoriesInStorage()
  const updatedCategory = categories.findIndex((c: Category) => c.id === category.id)

  categories[updatedCategory]['description'] = category.description

  localStorage.setItem(ID_LOCAL_STORAGE.CATEGORIES, JSON.stringify(categories))
}

export const deleteCategoriesInStorage = (category: Category) => {
  const tasks = getTasksInStorage()
  const tasksCategory = tasks.find((t: Task) => t.category === category.id);

  if (!!tasksCategory) {
    alert('No se puede eliminar la categoría porque tiene tareas asociadas.')
    return
  }

  const categories = getCategoriesInStorage()
  const deletedCategory = categories.findIndex((c: Category) => c.id === category.id)

  categories.splice(deletedCategory, 1)
  localStorage.setItem(ID_LOCAL_STORAGE.CATEGORIES, JSON.stringify(categories))
}
