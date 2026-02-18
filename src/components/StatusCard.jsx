import React from 'react'
import { CheckCircle, AlertCircle, Mic, MicOff } from 'lucide-react'

export default function StatusCard({ isOpen, isMicEnabled }) {
  return (
    <div className="w-full rounded-xl bg-white shadow-md p-4 sm:p-6 text-center flex flex-col">
      <div className="flex justify-center mb-4">
        {isOpen ? (
          <CheckCircle className="w-14 h-14 text-green-500" />
        ) : (
          <AlertCircle className="w-14 h-14 text-yellow-500" />
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {isOpen ? 'Webcam is Active' : 'Webcam is Offline'}
      </h2>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {isOpen
          ? 'Your webcam is currently streaming. Click "Close Webcam" to stop.'
          : 'Your webcam is protected. Click "Open Webcam" to start monitoring.'}
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-xs ${
          isOpen ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {isOpen ? '🛡️ Live' : '🔒 Secured'}
        </span>
        {isMicEnabled && isOpen && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs">
            <Mic className="w-3.5 h-3.5" />
            Mic Enabled
          </span>
        )}
        {isOpen && !isMicEnabled && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-semibold text-xs">
            <MicOff className="w-3.5 h-3.5" />
            Mic Off
          </span>
        )}
      </div>

      {isOpen && (
        <div className="text-xs text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p>📹 Camera is recording • All activities are logged</p>
        </div>
      )}
    </div>
  )
}
