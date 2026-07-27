import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { ARTICLES, Article } from '@/data/articles'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'News & Articles'
  const description = 'Read the latest GTA 6 fan theories, map analysis, character backstories, and news from our community.'
  const canonicalUrl = `https://gta6hub.com/${locale}/articles`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'GTA 6 Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default async function ArticlesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <div className="bg-midnight-teal min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-neon-flamingo/10 text-neon-flamingo px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-neon-flamingo/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial Hub</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-off-white">
            NEWS & ARTICLES
          </h1>
          <p className="text-sm sm:text-md text-off-white/60">
            Detailed mapping updates, protagonist theories, leak analyses, and news surrounding GTA 6.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ARTICLES.map((article: Article) => (
            <div 
              key={article.slug}
              className="bg-deep-teal/30 rounded-3xl overflow-hidden border border-deep-teal/60 hover:border-palm-teal/50 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image header */}
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
                </div>

                {/* Article Info */}
                <div className="p-6 sm:p-8 space-y-4">
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

                  <h2 className="text-lg sm:text-xl font-bold text-off-white leading-snug group-hover:text-sunset-orange transition-colors">
                    <Link href={`/${locale}/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-off-white/60 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Action Button footer */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <Link
                  href={`/${locale}/articles/${article.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-sunset-orange hover:text-neon-flamingo transition"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
