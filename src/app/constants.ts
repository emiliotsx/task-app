export const STATUS = {
  PENDING: 0,
  DONE: 1
}

export const ID_LOCAL_STORAGE = {
  TASKS: 'tasks',
  CATEGORIES: 'categories',
  USER: 'task-app'
}

export const PATH_NAMES_WHITOUT_LAYOUT = {
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  FORGOT_PASSWORD: 'forgot-password',
}

export const PATH_NAMES_WHITOUT_SIDEBARD = {
  TASKS_CREATE: 'tasks/c',
  TASKS_UPDATE: 'tasks/u',
  CATEGORIES: 'categories',
  CATEGORIES_CREATE: 'categories/c',
  CATEGORIES_UPDATE: 'categories/u',
}

export const PATH_NAMES = {
  ...PATH_NAMES_WHITOUT_LAYOUT,
  TASKS: 'tasks',
  ...PATH_NAMES_WHITOUT_SIDEBARD
}
