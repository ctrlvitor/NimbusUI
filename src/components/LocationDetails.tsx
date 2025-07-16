type LocationInfo = {
  city?: string
  state?: string
  country?: string
}

export default function LocationDetails({ info }: { info: LocationInfo | null }) {
  if (!info) return null

  return (
    <div className="mt-6 text-center text-sm text-zinc-400">
      <p>
        {info.city ?? 'Unknown'}, {info.state ?? '—'}, {info.country ?? '—'}
      </p>
    </div>
  )
}
