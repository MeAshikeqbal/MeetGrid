'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMediaDevices } from '@/hooks/use-media-devices'
import { VideoCallContainer } from '@/components/video/video-call-container'
import { Spinner } from '@/components/ui/spinner'

export default function VideoStartPage() {
  const router = useRouter()
  const { stream: localStream, isLoading, error } = useMediaDevices()
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)

  useEffect(() => {
    if (!localStream && !isLoading && !error) {
      // Redirect back if no stream available
      router.push('/video')
    }
  }, [localStream, isLoading, error, router])

  const handleToggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !isAudioEnabled
      })
      setIsAudioEnabled(!isAudioEnabled)
    }
  }

  const handleToggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled
      })
      setIsVideoEnabled(!isVideoEnabled)
    }
  }

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop())
    }
    router.push('/video')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Spinner className="w-12 h-12 mx-auto" />
          <div>
            <h2 className="text-xl font-semibold">Setting up your call</h2>
            <p className="text-foreground/60">Initializing connection...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !localStream) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-destructive">Connection Error</h2>
          <p className="text-foreground/60">Failed to initialize video call</p>
          <button
            onClick={() => router.push('/video')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <VideoCallContainer
      localStream={localStream}
      remoteStream={remoteStream}
      isAudioEnabled={isAudioEnabled}
      isVideoEnabled={isVideoEnabled}
      onToggleAudio={handleToggleAudio}
      onToggleVideo={handleToggleVideo}
      onEndCall={handleEndCall}
    />
  )
}
