/**
 * Activities storage utilities
 */

const STORAGE_KEY = 'webcam_activities'

/**
 * Get all activities from localStorage
 */
export const getActivities = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading activities:', error)
    return []
  }
}

/**
 * Add a new activity to localStorage
 */
export const addActivity = (action) => {
  try {
    const activities = getActivities()
    const now = new Date()
    
    const activity = {
      id: Date.now(),
      action,
      date: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      time: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      timestamp: now.getTime()
    }
    
    activities.push(activity)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
    return activity
  } catch (error) {
    console.error('Error adding activity:', error)
    return null
  }
}

/**
 * Clear all activities from localStorage
 */
export const clearActivities = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing activities:', error)
    return false
  }
}

/**
 * Get activities grouped by date (Today, Yesterday, etc.)
 */
export const getActivitiesByDate = () => {
  const activities = getActivities()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const grouped = {
    today: [],
    yesterday: [],
    older: []
  }
  
  activities.forEach(activity => {
    const activityDate = new Date(parseInt(activity.timestamp))
    activityDate.setHours(0, 0, 0, 0)
    
    if (activityDate.getTime() === today.getTime()) {
      grouped.today.unshift(activity)
    } else if (activityDate.getTime() === yesterday.getTime()) {
      grouped.yesterday.unshift(activity)
    } else {
      grouped.older.unshift(activity)
    }
  })
  
  return grouped
}
