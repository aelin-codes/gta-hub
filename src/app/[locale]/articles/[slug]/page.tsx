import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react'
import { ARTICLES } from '@/data/articles'

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) {
    return {
      title: 'Article Not Found | GTA 6 Hub',
      description: 'The requested GTA 6 fan article could not be found.',
    }
  }

  const title = `${article.title} | GTA 6 Hub`
  const description = article.summary
  const canonicalUrl = `https://gta6hub.com/${locale}/articles/${slug}`
  const ogImage = article.image

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
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
      images: [
        {
          url: ogImage,
          alt: article.title,
        }
      ],
      siteName: 'GTA 6 Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  }
}

export default async function ArticleDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const article = ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="bg-midnight-teal min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-display text-off-white mb-4">Article Not Found</h2>
        <Link
          href={`/${locale}/articles`}
          className="flex items-center space-x-2 px-6 py-3 bg-deep-teal/40 text-off-white hover:text-palm-teal rounded-xl border border-deep-teal transition text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    )
  }

  // Schema.org Article JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: [article.image],
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://gta6hub.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'GTA 6 Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gta6hub.com/og-image.png'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-midnight-teal min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Navigation / Header */}
          <div>
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-deep-teal/40 hover:bg-palm-teal/20 text-off-white hover:text-palm-teal rounded-xl border border-deep-teal/60 transition text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>
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

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-deep-teal/40 border border-deep-teal/80 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-palm-teal">
                  <BookOpen className="w-4 h-4" />
                  <span>About this article</span>
                </div>
                <p className="text-xs text-off-white/60 leading-relaxed">
                  Fan-written editorial content. All GTA 6 information is based on publicly available trailers, leaks, and community analysis.
                </p>
              </div>

              <div className="bg-deep-teal/40 border border-deep-teal/80 rounded-2xl p-6 text-xs text-off-white/50 leading-relaxed">
                Opinions expressed in fan articles belong entirely to the authors and do not represent Rockstar Games or Take-Two Interactive.
              </div>
            </aside>

          </div>

        </div>
      </div>
    </>
  )
}
