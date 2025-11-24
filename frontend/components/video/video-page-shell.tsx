"use client"

import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import VideoPageClient from '@/components/video/video-page-client'

export default function VideoPageShell() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setIsMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  if (!isMounted) {
    return (
      <div className="text-center space-y-4">
        <Spinner className="w-12 h-12 mx-auto" />
        <div>
          <h2 className="text-xl font-semibold mb-1">Requesting Camera Access</h2>
          <p className="text-foreground/60">Please allow camera and microphone access in the popup</p>
        </div>
      </div>
    )
  }

  return <VideoPageClient />
}
