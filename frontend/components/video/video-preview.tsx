'use client'

import { useEffect, useRef } from 'react'
import { Mic, MicOff, Video, VideoOff, Phone, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoPreviewProps {
  stream: MediaStream | null
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  onToggleAudio: () => void
  onToggleVideo: () => void
  onStartCall: () => void
  onSettings: () => void
}

export function VideoPreview({
  stream,
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onStartCall,
  onSettings,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Video Preview */}
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full"
            />
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <VideoOff className="w-12 h-12 text-foreground/50" />
              </div>
            )}

            {/* Status indicators */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                isVideoEnabled
                  ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                  : 'bg-red-500/20 text-red-700 dark:text-red-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isVideoEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                Camera {isVideoEnabled ? 'On' : 'Off'}
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                isAudioEnabled
                  ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                  : 'bg-red-500/20 text-red-700 dark:text-red-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isAudioEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                Mic {isAudioEnabled ? 'On' : 'Off'}
              </div>
            </div>
          </div>

        {/* Control Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={isAudioEnabled ? 'outline' : 'destructive'}
              className="gap-2"
              onClick={onToggleAudio}
            >
              {isAudioEnabled ? (
                <>
                  <Mic className="w-4 h-4" />
                  Mic On
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4" />
                  Mic Off
                </>
              )}
            </Button>
            <Button
              variant={isVideoEnabled ? 'outline' : 'destructive'}
              className="gap-2"
              onClick={onToggleVideo}
            >
              {isVideoEnabled ? (
                <>
                  <Video className="w-4 h-4" />
                  Video On
                </>
              ) : (
                <>
                  <VideoOff className="w-4 h-4" />
                  Video Off
                </>
              )}
            </Button>
          </div>

          {/* Primary Actions */}
          <div className="space-y-2">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-base gap-2"
              onClick={onStartCall}
            >
              <Phone className="w-5 h-5" />
              Start Video Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-border gap-2"
              onClick={onSettings}
            >
              <Settings className="w-4 h-4" />
              Device Settings
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center space-y-2">
          <p className="text-sm text-foreground/60">
            Ensure you&apos;re in a quiet environment with good lighting
          </p>
          <p className="text-xs text-foreground/50">
            You can test your camera and microphone before starting
          </p>
        </div>
      </div>
    </div>
  )
}
