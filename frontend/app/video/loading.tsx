export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto animate-spin rounded-full border-4 border-primary/40 border-t-primary" />
        <div>
          <h2 className="text-xl font-semibold mb-1">Requesting Camera Access</h2>
          <p className="text-foreground/60">Please allow camera and microphone access in the popup</p>
        </div>
      </div>
    </div>
  )
}
