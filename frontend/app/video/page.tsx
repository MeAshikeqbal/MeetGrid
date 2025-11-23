'use client'

import { useState } from 'react'
import { useMediaDevices } from '@/hooks/use-media-devices'
import { VideoPreview } from '@/components/video/video-preview'
import { ErrorState } from '@/components/video/error-state'
import { Spinner } from '@/components/ui/spinner'

export default function VideoPage() {
  const { stream, isLoading, error, stopStream, videoDevices, audioDevices, switchDevice } = useMediaDevices()
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  const handleToggleAudio = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks()
      audioTracks.forEach((track: { enabled: boolean }) => {
        track.enabled = !isAudioEnabled
      })
      setIsAudioEnabled(!isAudioEnabled)
    }
  }

  const handleToggleVideo = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks()
      videoTracks.forEach((track: { enabled: boolean }) => {
        track.enabled = !isVideoEnabled
      })
      setIsVideoEnabled(!isVideoEnabled)
    }
  }

  const handleStartCall = () => {
    console.log('Starting video call with stream:', stream?.active)
    // TODO: Implement WebRTC connection and matchmaking
  }

  const handleDeviceChange = async (videoDeviceId?: string, audioDeviceId?: string) => {
    try {
      await switchDevice(videoDeviceId, audioDeviceId)
    } catch (err) {
      console.error('Failed to switch devices:', err)
    }
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Spinner className="w-12 h-12 mx-auto" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Requesting Camera Access</h2>
            <p className="text-foreground/60">Please allow camera and microphone access in the popup</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />
  }

  if (stream) {
    return (
      <VideoPreview
        stream={stream}
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        onToggleAudio={handleToggleAudio}
        onToggleVideo={handleToggleVideo}
        onStartCall={handleStartCall}
        videoDevices={videoDevices}
        audioDevices={audioDevices}
        onDeviceChange={handleDeviceChange}
      />
    )
  }

  return null
}
