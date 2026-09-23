/**
 * Private link builder:  pnpm utm <url> <source> [campaign]
 *
 * Prints the URL tagged for one channel. Sources: x, linkedin, substack, whatsapp, email. The medium follows
 * from the source, and the campaign defaults to the page slug with dashes as underscores. A bare path such
 * as /research/some-post is taken as a rovenin.com page.
 */
import { UTM_SOURCES, tagUrl, type UtmSource } from '../utilities/utm'

const SCRIPT_SOURCES = UTM_SOURCES.filter((source) => source !== 'copy')

const [url, source, campaign] = process.argv.slice(2)

if (!url || !source || !(SCRIPT_SOURCES as readonly string[]).includes(source)) {
  console.error(`usage: pnpm utm <url> <source> [campaign]\nsources: ${SCRIPT_SOURCES.join(', ')}`)
  process.exit(1)
}

try {
  console.log(tagUrl(url, source as UtmSource, campaign || undefined))
} catch {
  console.error(`not a URL or path: ${url}`)
  process.exit(1)
}
