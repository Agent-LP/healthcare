const USER_ID_KEY = 'userId'

export const getUserId = (): number => {
  const stored = localStorage.getItem(USER_ID_KEY)
  if (stored) {
    const parsed = parseInt(stored, 10)
    if (!isNaN(parsed)) {
      return parsed
    }
  }
  const defaultUserId = 1
  localStorage.setItem(USER_ID_KEY, String(defaultUserId))
  return defaultUserId
}

export const setUserId = (userId: number): void => {
  localStorage.setItem(USER_ID_KEY, String(userId))
}





