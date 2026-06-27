'use client'

import { useState } from 'react'
import { ShieldCheck, Mail, Link as LinkIcon, Info, Send } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function TakedownRequestPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    try {
      // Basic URL extraction for YouTube video ID
      let videoIdStr = videoUrl
      if (videoUrl.includes('youtube.com/watch?v=')) {
        videoIdStr = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl
      } else if (videoUrl.includes('youtu.be/')) {
        videoIdStr = videoUrl.split('youtu.be/')[1]?.split('?')[0] || videoUrl
      }

      // Check if video exists in database (so we can tie it, or keep it null if not found)
      let matchedVideoUUID = null
      if (videoIdStr) {
        const { data: dbVideo } = await supabase
          .from('videos')
          .select('id')
          .eq('external_id', videoIdStr)
          .single()
        
        if (dbVideo) {
          matchedVideoUUID = dbVideo.id
        }
      }

      // Insert takedown request (Section 8 schema)
      const { error } = await supabase
        .from('takedown_requests')
        .insert({
          video_id: matchedVideoUUID,
          requester_email: email,
          reason: `[Video ID/Link: ${videoUrl}] — ${reason}`,
          status: 'pending'
        })

      if (error) {
        throw error
      }

      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'An error occurred while submitting your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Info card */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-off-white">
            CONTENT TAKEDOWN
          </h1>
          <p className="text-sm sm:text-md text-off-white/60">
            Preserving creator rights. If you are a content creator and would like your video metadata removed from GTA 6 Hub, submit the request form below.
          </p>
        </div>

        {success ? (
          <div className="bg-deep-teal rounded-3xl p-8 border border-palm-teal/30 text-center space-y-6 shadow-xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-palm-teal/10 text-palm-teal flex items-center justify-center mx-auto">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-off-white">Request Received</h3>
            <p className="text-xs sm:text-sm text-off-white/70 max-w-md mx-auto leading-relaxed">
              Thank you. We have logged your request. We verify creator details and act on valid exclusions within 24 hours. Once approved, the video will be excluded immediately.
            </p>
            <button
              onClick={() => {
                setSuccess(false)
                setVideoUrl('')
                setEmail('')
                setReason('')
              }}
              className="px-6 py-2.5 bg-midnight-teal border border-deep-teal hover:border-palm-teal/40 text-xs font-bold uppercase tracking-wider rounded-xl text-off-white hover:text-palm-teal transition"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-deep-teal/40 rounded-3xl p-6 sm:p-8 border border-deep-teal/80 shadow-xl space-y-6">
            
            {/* Disclaimer info banner */}
            <div className="flex items-start space-x-3 bg-midnight-teal/80 border border-deep-teal p-4 rounded-xl text-xs text-off-white/70 leading-relaxed">
              <Info className="w-5 h-5 text-palm-teal shrink-0 mt-0.5" />
              <span>
                <strong>Preserving views and credit:</strong> GTA 6 Hub does not host or copy videos. All views, ad revenue, and traffic route directly back to your channel. If you simply prefer your guide not indexable here, we respect that completely.
              </span>
            </div>

            {/* Video Url Input */}
            <div className="space-y-2">
              <label htmlFor="video-url" className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 block">
                Video Link or YouTube/Twitch Video ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-off-white/40">
                  <LinkIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="video-url"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full pl-12 pr-4 py-3 bg-midnight-teal border border-deep-teal/80 focus:border-palm-teal focus:ring-1 focus:ring-palm-teal rounded-xl text-sm text-off-white outline-none transition"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 block">
                Your Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-off-white/40">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-midnight-teal border border-deep-teal/80 focus:border-palm-teal focus:ring-1 focus:ring-palm-teal rounded-xl text-sm text-off-white outline-none transition"
                />
              </div>
            </div>

            {/* Reason/Details */}
            <div className="space-y-2">
              <label htmlFor="reason" className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 block">
                Details / Reason for removal
              </label>
              <textarea
                id="reason"
                required
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please state if you are the channel owner, or specify any trademark/exclusion preferences..."
                className="w-full p-4 bg-midnight-teal border border-deep-teal/80 focus:border-palm-teal focus:ring-1 focus:ring-palm-teal rounded-xl text-sm text-off-white outline-none transition resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-neon-flamingo font-semibold">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-95 transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting Request...' : 'Submit Takedown Request'}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  )
}
