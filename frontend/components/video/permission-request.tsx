'use client'

import { Camera, Mic, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PermissionRequestProps {
  onAllow: () => void
  onDeny: () => void
}

export function PermissionRequest({ onAllow, onDeny }: PermissionRequestProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader>
          <CardTitle>Camera & Microphone Access</CardTitle>
          <CardDescription>MeetGrid needs access to your camera and microphone to start a video call</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Camera className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Camera</p>
                <p className="text-xs text-foreground/60">For video streaming during calls</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Mic className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Microphone</p>
                <p className="text-xs text-foreground/60">For audio during conversations</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-200">
              You can change these permissions in your browser settings at any time
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border"
              onClick={onDeny}
            >
              Not Now
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={onAllow}
            >
              Allow Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
