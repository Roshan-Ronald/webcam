import React from 'react'
import {
  Shield,
  Camera,
  Mic,
  MicOff,
  AlertCircle,
  Trash2,
  Lock,
  LogOut,
} from 'lucide-react'

export default function Sidebar({
  isWebcamOpen,
  isMicEnabled,
  onOpenWebcam,
  onCloseWebcam,
  onUnlockMicrophone,
  onLockMicrophone,
  onClearLogs,
  error
}) {
  const buttons = [
    {
      id: 'open-webcam',
      icon: Camera,
      label: 'Open Webcam',
      color: 'text-green-600',
      bgActive: 'bg-green-50',
      onClick: onOpenWebcam,
      disabled: isWebcamOpen
    },
    {
      id: 'close-webcam',
      icon: Camera,
      label: 'Close Webcam',
      color: 'text-red-600',
      bgActive: 'bg-red-50',
      onClick: onCloseWebcam,
      disabled: !isWebcamOpen
    },
    {
      id: 'unlock-mic',
      icon: Mic,
      label: 'Unlock Microphone',
      color: 'text-teal-600',
      bgActive: 'bg-teal-50',
      onClick: onUnlockMicrophone,
      disabled: !isWebcamOpen || isMicEnabled
    },
    {
      id: 'lock-mic',
      icon: MicOff,
      label: 'Lock Microphone',
      color: 'text-blue-600',
      bgActive: 'bg-blue-50',
      onClick: onLockMicrophone,
      disabled: !isWebcamOpen || !isMicEnabled
    },
    {
      id: 'clear-logs',
      icon: Trash2,
      label: 'Clear Logs',
      color: 'text-amber-600',
      bgActive: 'bg-amber-50',
      onClick: onClearLogs,
      disabled: false
    },
  ]

  return (
    <div className="w-full lg:w-64 bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-6">
      {/* Logo */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
        <span className="font-bold text-gray-900 text-sm sm:text-base">Security</span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2.5">
        {buttons.map(({ id, icon: Icon, label, color, bgActive, onClick, disabled }) => {
          const isPrimaryAction = id === 'open-webcam';
          return (
            <button
              key={id}
              onClick={onClick}
              disabled={disabled}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                transition-all duration-200 active:scale-95
                ${disabled 
                  ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none' 
                  : isPrimaryAction
                    ? `${bgActive} ${color} hover:shadow-md active:shadow-sm font-semibold`
                    : `${bgActive} ${color} hover:shadow-sm active:shadow-none`
                }
              `}
              title={label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Status indicators */}
      <div className="space-y-2 pt-4 border-t border-gray-200 hidden sm:flex sm:flex-col">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isWebcamOpen ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-600">
            Camera: <span className={isWebcamOpen ? 'text-green-600 font-semibold' : 'text-gray-600'}>
              {isWebcamOpen ? 'Active' : 'Off'}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isMicEnabled ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-600">
            Microphone: <span className={isMicEnabled ? 'text-yellow-600 font-semibold' : 'text-gray-600'}>
              {isMicEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <button className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 text-sm hover:bg-gray-50 font-medium transition-all duration-300">
        <LogOut className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 text-left">Logout</span>
      </button>
    </div>
  )
}
