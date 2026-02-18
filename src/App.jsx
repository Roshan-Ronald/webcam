import React, { useState } from 'react'
import { useMediaStream } from './hooks/useMediaStream'
import { clearActivities } from './utils/storageUtils'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import StatusCard from './components/StatusCard'
import ActivityLogs from './components/ActivityLogs'

export default function App() {
  const media = useMediaStream()
  const [refreshLogs, setRefreshLogs] = useState(0)

  const handleClearLogs = () => {
    const confirmed = window.confirm('Are you sure you want to clear all activity logs?')
    if (confirmed) {
      clearActivities()
      setRefreshLogs(prev => prev + 1)
    }
  }

  const handleAction = (callback) => {
    return () => {
      callback()
      setRefreshLogs(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Webcam Security System</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your webcam and microphone settings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Desktop Layout: Sidebar | Main Content | Logs */}
        <div className="grid grid-cols-1 gap-5 lg:gap-6 lg:grid-cols-12">
          
          {/* LEFT SIDEBAR - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <Sidebar
                isWebcamOpen={media.isOpen}
                isMicEnabled={media.isMicEnabled}
                onOpenWebcam={handleAction(media.openWebcam)}
                onCloseWebcam={handleAction(media.closeWebcam)}
                onUnlockMicrophone={handleAction(media.unlockMicrophone)}
                onLockMicrophone={handleAction(media.lockMicrophone)}
                onClearLogs={handleAction(handleClearLogs)}
                error={media.error}
              />
            </div>
          </div>

          {/* CENTER MAIN CONTENT */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-5">
            {/* Webcam Preview Card */}
            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <Dashboard
                isOpen={media.isOpen}
                videoRef={media.videoRef}
                error={media.error}
              />
            </div>

            {/* Status Card */}
            <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6">
              <StatusCard isOpen={media.isOpen} isMicEnabled={media.isMicEnabled} />
            </div>

            {/* Mobile Action Buttons - Only shown on mobile */}
            <div className="lg:hidden">
              <Sidebar
                isWebcamOpen={media.isOpen}
                isMicEnabled={media.isMicEnabled}
                onOpenWebcam={handleAction(media.openWebcam)}
                onCloseWebcam={handleAction(media.closeWebcam)}
                onUnlockMicrophone={handleAction(media.unlockMicrophone)}
                onLockMicrophone={handleAction(media.lockMicrophone)}
                onClearLogs={handleAction(handleClearLogs)}
                error={media.error}
              />
            </div>
          </div>

          {/* RIGHT ACTIVITY LOGS - Hidden on mobile/tablet */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <ActivityLogs refreshTrigger={refreshLogs} onClearLogs={handleAction(handleClearLogs)} />
            </div>
          </div>
        </div>

        {/* Activity Logs on mobile/tablet - Full width below content */}
        <div className="lg:hidden mt-8">
          <ActivityLogs refreshTrigger={refreshLogs} onClearLogs={handleAction(handleClearLogs)} />
        </div>
      </div>
    </div>
  )
}
