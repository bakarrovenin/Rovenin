import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import configPromise from '@payload-config'

/**
 * Read only. Prints every post with what the live site will actually use
 * (the parent row) beside the newest draft or autosave, so a publish that
 * looked successful in the admin can be checked against the database in
 * seconds. A post whose "live" column says draft is not on the site,
 * whatever the admin toast said.
 *
 * Run with: pnpm posts:status
 */
type StatusRow = {
  id: number
  live_title: string | null
  live_slug: string | null
  live_status: string | null
  live_published_at: string | null
  latest_status: string | null
  latest_slug: string | null
  latest_autosave: boolean | null
  latest_saved_at: string | null
  published_versions: number
}

const run = async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.db.drizzle.execute(sql`
    select
      p.id,
      p.title as live_title,
      p.slug as live_slug,
      p._status as live_status,
      to_char(p.published_at, 'YYYY-MM-DD HH24:MI') as live_published_at,
      v.version__status as latest_status,
      v.version_slug as latest_slug,
      v.autosave as latest_autosave,
      to_char(v.updated_at, 'YYYY-MM-DD HH24:MI') as latest_saved_at,
      (select count(*) from _posts_v pv where pv.parent_id = p.id and pv.version__status = 'published') as published_versions
    from posts p
    left join lateral (
      select * from _posts_v pv where pv.parent_id = p.id order by pv.updated_at desc limit 1
    ) v on true
    order by coalesce(p.published_at, p.created_at) desc
  `)

  const rows = (result as unknown as { rows: StatusRow[] }).rows

  console.log('')
  for (const r of rows) {
    const live = r.live_status === 'published' ? 'LIVE ' : 'draft'
    const title = (r.live_title ?? '(never published)').slice(0, 60)
    console.log(`#${r.id}  ${live}  ${title}`)
    console.log(`     live slug:    ${r.live_slug ?? '(none)'}  published: ${r.live_published_at ?? '(none)'}`)
    console.log(
      `     latest save:  ${r.latest_status ?? '(none)'}${r.latest_autosave ? ' (autosave)' : ''}  slug: ${r.latest_slug ?? '(none)'}  at ${r.latest_saved_at ?? '(none)'}`,
    )
    if (r.live_status !== 'published' && r.latest_status === 'draft') {
      console.log(`     note: not on the site. ${Number(r.published_versions)} published version(s) in history.`)
    }
    console.log('')
  }

  process.exit(0)
}

await run()
