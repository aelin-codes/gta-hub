export default function VideoSkeleton() {
  return (
    <div className="bg-deep-teal/20 border border-deep-teal/40 rounded-3xl p-4 space-y-4 animate-pulse">
      <div className="aspect-video bg-deep-teal/40 rounded-2xl w-full" />
      <div className="space-y-3">
        <div className="h-4 bg-deep-teal/40 rounded-lg w-3/4 animate-pulse" />
        <div className="h-3 bg-deep-teal/40 rounded-lg w-1/2 animate-pulse" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 bg-deep-teal/40 rounded-lg w-1/4 animate-pulse" />
        <div className="h-6 bg-deep-teal/40 rounded-lg w-1/4 animate-pulse" />
      </div>
    </div>
  )
}
