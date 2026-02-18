import { useState, useRef, useCallback } from 'react'
import { addActivity } from '../utils/storageUtils'

/**
 * Custom hook for handling webcam and microphone media streams
 */
export const useMediaStream = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMicEnabled, setIsMicEnabled] = useState(false)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  /**
   * Request camera and microphone permissions
   */
  const openWebcam = useCallback(async () => {
    try {
      setError(null)
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false // Start without audio
      })

      streamRef.current = stream
      
      // Set the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        
        // Ensure video plays
        videoRef.current.play().catch(err => {
          console.warn('Video autoplay issue:', err)
        })
      }

      setIsOpen(true)
      setIsMicEnabled(false)
      
      // Log the action
      addActivity('Webcam opened')
    } catch (err) {
      console.error('Error accessing webcam:', err)
      
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access.')
      } else if (err.name === 'NotFoundError') {
        setError('No camera device found.')
      } else if (err.name === 'NotReadableError') {
        setError('Camera is in use by another application.')
      } else {
        setError('Failed to access camera: ' + err.message)
      }
      
      setIsOpen(false)
      setIsMicEnabled(false)
    }
  }, [])

  /**
   * Stop camera and microphone
   */
  const closeWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsOpen(false)
    setIsMicEnabled(false)
    setError(null)
    
    // Log the action
    addActivity('Webcam closed')
  }, [])

  /**
   * Enable microphone audio on existing stream
   */
  const unlockMicrophone = useCallback(() => {
    try {
      if (!streamRef.current) {
        setError('No active webcam stream. Open webcam first.')
        return
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(audioStream => {
          const audioTracks = audioStream.getAudioTracks()
          audioTracks.forEach(track => {
            streamRef.current.addTrack(track)
          })
          setIsMicEnabled(true)
          setError(null)
          
          // Log the action
          addActivity('Microphone unlocked')
        })
        .catch(err => {
          console.error('Error accessing microphone:', err)
          
          if (err.name === 'NotAllowedError') {
            setError('Microphone permission denied.')
          } else if (err.name === 'NotFoundError') {
            setError('No microphone device found.')
          } else {
            setError('Failed to access microphone: ' + err.message)
          }
        })
    } catch (err) {
      console.error('Error unlocking microphone:', err)
      setError('Failed to unlock microphone: ' + err.message)
    }
  }, [])

  /**
   * Disable microphone audio from current stream
   */
  const lockMicrophone = useCallback(() => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks()
      audioTracks.forEach(track => {
        track.stop()
        streamRef.current.removeTrack(track)
      })
      
      setIsMicEnabled(false)
      setError(null)
      
      // Log the action
      addActivity('Microphone locked')
    }
  }, [])

  return {
    isOpen,
    isMicEnabled,
    error,
    videoRef,
    openWebcam,
    closeWebcam,
    unlockMicrophone,
    lockMicrophone
  }
}
