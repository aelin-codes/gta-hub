const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

function parseDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatExactDate(value: string, locale = 'en-US') {
  const date = parseDate(value)
  if (!date) return 'Unknown upload date'

  return new Intl.DateTimeFormat(locale, DATE_FORMAT_OPTIONS).format(date)
}

export function formatUploadedDate(value: string, locale = 'en-US') {
  const exactDate = formatExactDate(value, locale)
  return exactDate === 'Unknown upload date' ? exactDate : `Uploaded ${exactDate}`
}

export function formatRelativeDate(value: string, locale = 'en-US') {
  const date = parseDate(value)
  if (!date) return 'Unknown date'

  const diffMs = date.getTime() - Date.now()
  const absMs = Math.abs(diffMs)

  const divisions: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
    { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
    { unit: 'day', ms: 1000 * 60 * 60 * 24 },
    { unit: 'hour', ms: 1000 * 60 * 60 },
    { unit: 'minute', ms: 1000 * 60 },
  ]

  for (const { unit, ms } of divisions) {
    if (absMs >= ms) {
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
        Math.round(diffMs / ms),
        unit
      )
    }
  }

  return 'just now'
}
