"use client"

import { useState, useCallback } from "react"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DeviceSettingsDialogProps {
  videoDevices: MediaDeviceInfo[]
  audioDevices: MediaDeviceInfo[]
  localStream: MediaStream | null
  onDeviceChange: (videoDeviceId?: string, audioDeviceId?: string) => Promise<void>
}

export function DeviceSettingsDialog({
  videoDevices,
  audioDevices,
  localStream,
  onDeviceChange,
}: DeviceSettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("")
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("")
  const [isApplying, setIsApplying] = useState(false)

  const handleApplySettings = useCallback(async () => {
    setIsApplying(true)
    try {
      await onDeviceChange(selectedVideoDevice || undefined, selectedAudioDevice || undefined)
      setIsOpen(false)
    } catch (error) {
      console.error("[v0] Error applying device settings:", error)
    } finally {
      setIsApplying(false)
    }
  }, [selectedVideoDevice, selectedAudioDevice, onDeviceChange])

  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        className="rounded-full p-4 bg-primary/20 hover:bg-primary/30"
        onClick={() => setIsOpen(true)}
      >
        <Settings className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-background border-primary/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Device Settings</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Camera Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Camera</label>
                <select
                  value={selectedVideoDevice}
                  onChange={(e) => setSelectedVideoDevice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Default Camera</option>
                  {videoDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Microphone Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Microphone</label>
                <select
                  value={selectedAudioDevice}
                  onChange={(e) => setSelectedAudioDevice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Default Microphone</option>
                  {audioDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Stream Info */}
              {localStream && (
                <div className="text-xs text-foreground/60 space-y-1">
                  <p>Active Tracks:</p>
                  <p>- Video: {localStream.getVideoTracks().length > 0 ? "Active" : "None"}</p>
                  <p>- Audio: {localStream.getAudioTracks().length > 0 ? "Active" : "None"}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleApplySettings}
                disabled={isApplying}
              >
                {isApplying ? "Applying..." : "Apply"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
