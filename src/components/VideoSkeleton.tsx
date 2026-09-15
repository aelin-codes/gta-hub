export default function VideoSkeleton() {
  return (
    <div className="bg-deep-teal/40 border-2 border-white/10 rounded-xl p-2.5 sm:p-3 space-y-2.5 animate-pulse">
      <div className="aspect-video bg-deep-teal/60 rounded-lg w-full" />
      <div className="space-y-2 pt-0.5">
        <div className="h-3.5 bg-deep-teal/70 rounded w-5/6" />
        <div className="h-3 bg-deep-teal/50 rounded w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-1">
        <div className="h-2.5 bg-deep-teal/50 rounded w-1/3" />
        <div className="h-2.5 bg-deep-teal/50 rounded w-1/4" />
      </div>
    </div>
  )
}
