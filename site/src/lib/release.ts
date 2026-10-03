const REPO = 'productdevbook/iphone-audio'

export const repoUrl = `https://github.com/${REPO}`

export interface Release {
  version: string
  url: string
  download: string
  date: Date | null
}

const fallback: Release = {
  version: '',
  url: `${repoUrl}/releases/latest`,
  download: `${repoUrl}/releases/latest`,
  date: null,
}

let cached: Promise<Release> | undefined

export function latestRelease(): Promise<Release> {
  cached ??= load()
  return cached
}

async function load(): Promise<Release> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers })
    if (!res.ok) return fallback
    const data = await res.json()
    const zip = data.assets?.find((a: { name: string }) => a.name.endsWith('.zip'))
    return {
      version: String(data.tag_name).replace(/^v/, ''),
      url: data.html_url,
      download: zip?.browser_download_url ?? data.html_url,
      date: data.published_at ? new Date(data.published_at) : null,
    }
  } catch {
    return fallback
  }
}

export const checkoutUrl = 'https://buy.polar.sh/polar_cl_jbsTpfuUM5PW6XwZUnT2hqpOsb0kULROszluK1Znrpn'
