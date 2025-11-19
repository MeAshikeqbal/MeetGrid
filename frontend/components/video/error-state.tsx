'use client'

import { AlertTriangle, ArrowLeft, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
          </div>
          <CardTitle>Camera Access Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <p className="text-sm font-medium">How to fix:</p>
            <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
              <li>Check if camera is connected and powered on</li>
              <li>Ensure microphone is plugged in</li>
              <li>Allow camera access in browser settings</li>
              <li>Check browser permissions for this site</li>
              <li>Restart your browser if needed</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-primary hover:bg-primary/90 gap-2"
              onClick={onRetry}
            >
              <Settings className="w-4 h-4" />
              Try Again
            </Button>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full border-border gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
