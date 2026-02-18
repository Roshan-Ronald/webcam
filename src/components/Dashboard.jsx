import React from 'react'
import { AlertCircle, Watch } from 'lucide-react'

export default function Dashboard({ isOpen, videoRef, error }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Camera Error</p>
            <p className="text-xs text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Video Container - Always in DOM, visibility controlled by CSS */}
      <div className="relative w-full h-80 bg-gray-100 overflow-hidden">
        
        {/* Video element - NEVER removed from DOM */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Placeholder - shown when webcam is off */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-100 transition-opacity duration-300 ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Watch className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-lg font-medium text-gray-700 text-center">Click "Open Webcam" to start</p>
          <p className="text-sm text-gray-600 mt-2">Your camera will appear here</p>
        </div>

        {/* Recording indicator - only shown when recording */}
        {isOpen && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-full shadow-md animate-pulse text-xs font-semibold">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="hidden sm:inline">RECORDING</span>
          </div>
        )}
      </div>
    </div>
  )
}
