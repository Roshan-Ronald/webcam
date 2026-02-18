import React, { useState, useEffect } from 'react'
import { Search, Trash2, Camera, Mic, MicOff, Clock, AlertCircle } from 'lucide-react'
import { getActivitiesByDate, getActivities } from '../utils/storageUtils'

export default function ActivityLogs({ refreshTrigger, onClearLogs }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activities, setActivities] = useState({
    today: [],
    yesterday: [],
    older: []
  })

  useEffect(() => {
    loadActivities()
  }, [refreshTrigger])

  const loadActivities = () => {
    const grouped = getActivitiesByDate()
    setActivities(grouped)
  }

  const getIcon = (action) => {
    if (action.includes('Webcam opened')) return Camera
    if (action.includes('Webcam closed')) return AlertCircle
    if (action.includes('Microphone unlocked') || action.includes('Microphone enabled')) return Mic
    if (action.includes('Microphone locked') || action.includes('Microphone disabled')) return MicOff
    return Clock
  }

  const getActionColor = (action) => {
    if (action.includes('opened')) return 'bg-green-50 text-green-600'
    if (action.includes('closed')) return 'bg-red-50 text-red-600'
    if (action.includes('unlocked') || action.includes('enabled')) return 'bg-blue-50 text-blue-600'
    if (action.includes('locked') || action.includes('disabled')) return 'bg-gray-50 text-gray-600'
    return 'bg-gray-50 text-gray-600'
  }

  const hasActivities = activities.today.length > 0 || activities.yesterday.length > 0 || activities.older.length > 0

  const renderActivityGroup = (label, items) => {
    if (items.length === 0) return null

    return (
      <div key={label}>
        <div className="px-4 py-3 sticky top-0 bg-white/60 backdrop-blur-sm border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {label}
          </p>
        </div>

        {items.map((activity) => {
          const Icon = getIcon(activity.action)
          const colorClass = getActionColor(activity.action)

          return (
            <div
              key={activity.id}
              className="px-4 sm:px-6 py-3 hover:bg-gray-50 cursor-pointer group border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${colorClass} group-hover:shadow-sm transition-all`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium truncate">
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs text-gray-500 ml-2 whitespace-nowrap flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl bg-white shadow-md flex flex-col h-96 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800">Activity Logs</h3>
          <button 
            onClick={loadActivities}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title="Refresh logs"
          >
            <Clock className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-y-auto">
        {hasActivities ? (
          <>
            {renderActivityGroup('Today', activities.today)}
            {renderActivityGroup('Yesterday', activities.yesterday)}
            {renderActivityGroup('Older', activities.older)}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <AlertCircle className="w-10 h-10 text-gray-300 mb-2" />
            <p className="text-sm font-medium">No activities yet</p>
            <p className="text-xs text-center mt-1">
              Start by opening your webcam
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={onClearLogs}
          className="w-full py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold transition-colors duration-300 active:scale-95"
        >
          Clear All Logs
        </button>
      </div>
    </div>
  )
}
