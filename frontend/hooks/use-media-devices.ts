'use client'

import { useState, useEffect, useRef } from 'react'

interface MediaDevices {
  stream: MediaStream | null
  videoDevices: MediaDeviceInfo[]
  audioDevices: MediaDeviceInfo[]
  isLoading: boolean
  error: string | null
}

export function useMediaDevices() {
  const [mediaDevices, setMediaDevices] = useState<MediaDevices>({
    stream: null,
    videoDevices: [],
    audioDevices: [],
    isLoading: true,
    error: null,
  })

  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const getMediaDevices = async () => {
      try {
        setMediaDevices((prev) => ({ ...prev, isLoading: true }))

        const savedVideoDeviceId = localStorage.getItem("preferred-video-device")
        const savedAudioDeviceId = localStorage.getItem("preferred-audio-device")

        // Try to request with saved devices first
        let stream: MediaStream | null = null

        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: savedVideoDeviceId ? { deviceId: { exact: savedVideoDeviceId } } : { facingMode: "user" },
            audio: savedAudioDeviceId ? { deviceId: { exact: savedAudioDeviceId } } : true,
          })
        } catch {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: true,
          })
        }

        streamRef.current = stream

        // Get available devices
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter((device) => device.kind === 'videoinput')
        const audioDevices = devices.filter((device) => device.kind === 'audioinput')

        const videoTrack = stream.getVideoTracks()[0]
        const audioTrack = stream.getAudioTracks()[0]
        const videoDeviceIdFromTrack = videoTrack?.getSettings().deviceId
        const audioDeviceIdFromTrack = audioTrack?.getSettings().deviceId
        if (videoDeviceIdFromTrack) {
          localStorage.setItem("preferred-video-device", videoDeviceIdFromTrack)
        }
        if (audioDeviceIdFromTrack) {
          localStorage.setItem("preferred-audio-device", audioDeviceIdFromTrack)
        }

        setMediaDevices({
          stream,
          videoDevices,
          audioDevices,
          isLoading: false,
          error: null,
        })
      } catch (err) {
        let errorMessage = 'Failed to access media devices'

        if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError') {
            errorMessage = 'Camera and microphone access denied. Please check your browser settings.'
          } else if (err.name === 'NotFoundError') {
            errorMessage = 'Camera or microphone not found on this device.'
          }
        }

        setMediaDevices((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
      }
    }

    getMediaDevices()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const switchDevice = async (videoDeviceId?: string, audioDeviceId?: string) => {
    try {
      // Stop existing tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Request new stream with specified devices
      const constraints: MediaStreamConstraints = {
        video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : { facingMode: "user" },
        audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
      }

      const newStream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = newStream

      if (videoDeviceId) localStorage.setItem("preferred-video-device", videoDeviceId)
      if (audioDeviceId) localStorage.setItem("preferred-audio-device", audioDeviceId)

      setMediaDevices((prev) => ({
        ...prev,
        stream: newStream,
        error: null,
      }))

      return newStream
    } catch (err) {
      console.error("Error switching device:", err)
      throw err
    }
  }

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      setMediaDevices((prev) => ({ ...prev, stream: null }))
    }
  }

  return { ...mediaDevices, stopStream, switchDevice }
}