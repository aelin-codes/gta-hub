'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react'
import { ARTICLES } from '@/data/articles'
import AdBanner from '@/components/AdBanner'

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const locale = (params?.locale as string) || 'en'
  const slug = params?.slug as string

  const article = ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="bg-midnight-teal min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-display text-off-white mb-4">Article Not Found</h2>
        <button
          onClick={() => router.push(`/${locale}/articles`)}
          className="flex items-center space-x-2 px-6 py-3 bg-deep-teal/40 text-off-white hover:text-palm-teal rounded-xl border border-deep-teal transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <div>
          <button
            onClick={() => router.push(`/${locale}/articles`)}
            className="flex items-center space-x-2 px-4 py-2 bg-deep-teal/40 hover:bg-palm-teal/20 text-off-white hover:text-palm-teal rounded-xl border border-deep-teal/60 transition text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>
        </div>

        {/* Article Image Banner */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-deep-teal/60">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-black/30 to-black/10" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Article Text Content */}
          <article className="lg:col-span-3 space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-xs font-mono uppercase tracking-wider text-palm-teal">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(article.published_at).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{article.author}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-off-white leading-snug">
                {article.title}
              </h1>
            </div>

            {/* Rendered HTML content (editorial layout style) */}
            <div 
              className="prose prose-invert max-w-none text-off-white/75 text-sm sm:text-base leading-relaxed space-y-6 
                         prose-headings:text-off-white prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wider prose-headings:mt-8
                         prose-h2:text-xl sm:text-2xl prose-h3:text-lg
                         prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                         prose-strong:text-off-white prose-strong:font-bold
                         prose-a:text-palm-teal prose-a:underline hover:prose-a:text-sunset-orange"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

          </article>

          {/* Sidebar / Ads Panel */}
          <aside className="space-y-6">
            <div className="bg-deep-teal/40 border border-deep-teal/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-off-white/40">
                <BookOpen className="w-4 h-4 text-palm-teal" />
                <span>Sponsored</span>
              </div>
              <AdBanner slot="article-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
            </div>

            <div className="bg-deep-teal/40 border border-deep-teal/80 rounded-2xl p-6 text-xs text-off-white/50 leading-relaxed">
              Opinions expressed in fan articles belong entirely to the authors and do not represent Rockstar Games or Take-Two Interactive.
            </div>
          </aside>

        </div>

      </div>
    </div>
  )
}
