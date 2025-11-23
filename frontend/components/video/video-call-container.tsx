'use client'

import { memo, useCallback } from 'react'
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatSidebar } from './chat-sidebar'
import { LocalVideo, RemoteVideo } from './video-streams'
import { DeviceSettingsDialog } from './device-settings-dialog'

interface VideoCallContainerProps {
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  videoDevices: MediaDeviceInfo[]
  audioDevices: MediaDeviceInfo[]
  onToggleAudio: () => void
  onToggleVideo: () => void
  onEndCall: () => void
  onDeviceChange: (videoDeviceId?: string, audioDeviceId?: string) => Promise<void>
}

export const VideoCallContainer = memo(function VideoCallContainer({
  localStream,
  remoteStream,
  isAudioEnabled,
  isVideoEnabled,
  videoDevices,
  audioDevices,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  onDeviceChange,
}: VideoCallContainerProps) {
  const handleAudioToggle = useCallback(() => {
    onToggleAudio()
  }, [onToggleAudio])

  const handleVideoToggle = useCallback(() => {
    onToggleVideo()
  }, [onToggleVideo])

  const handleEnd = useCallback(() => {
    onEndCall()
  }, [onEndCall])

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Main Video Area - Left Side */}
      <div className="flex-1 flex flex-col relative bg-black">
        {/* Remote Video (Large) */}
        <div className="flex-1 relative bg-black">
          {remoteStream ? (
            <RemoteVideo stream={remoteStream} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-background to-background/50">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/40" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">Connecting to a stranger...</p>
                  <p className="text-foreground/60 text-sm mt-1">Please wait while we find someone to chat with</p>
                </div>
              </div>
            </div>
          )}

          {/* Local Video Preview (Bottom Right) */}
          <div className="absolute bottom-4 right-4 w-32 h-40 rounded-lg overflow-hidden shadow-lg border-2 border-primary/50 bg-black">
            {localStream ? (
              <LocalVideo stream={localStream} />
            ) : (
              <div className="w-full h-full bg-background/50 flex items-center justify-center">
                <Video className="w-8 h-8 text-foreground/30" />
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 pb-6 px-4 bg-linear-to-t from-black/60 to-transparent pt-8">
            <Button
              variant="ghost"
              size="lg"
              className={`rounded-full p-4 ${
                isAudioEnabled
                  ? 'bg-primary/20 hover:bg-primary/30'
                  : 'bg-destructive/20 hover:bg-destructive/30'
              }`}
              onClick={handleAudioToggle}
            >
              {isAudioEnabled ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6 text-destructive" />
              )}
            </Button>

            <DeviceSettingsDialog
              videoDevices={videoDevices}
              audioDevices={audioDevices}
              localStream={localStream}
              onDeviceChange={onDeviceChange}
            />

            <Button
              variant="ghost"
              size="lg"
              className="rounded-full p-4 bg-destructive/20 hover:bg-destructive/30"
              onClick={handleEnd}
            >
              <PhoneOff className="w-6 h-6 text-destructive" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className={`rounded-full p-4 ${
                isVideoEnabled
                  ? 'bg-primary/20 hover:bg-primary/30'
                  : 'bg-destructive/20 hover:bg-destructive/30'
              }`}
              onClick={handleVideoToggle}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6 text-destructive" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar - Right Side */}
      <ChatSidebar />

      {/* Mobile Chat Toggle */}
      <div className="md:hidden absolute top-4 right-4 z-10">
        <Button variant="outline" size="sm">
          Chat
        </Button>
      </div>
    </div>
  )
})
