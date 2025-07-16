type CitySuggestionsProps = {
  suggestions: string[]
  onSelect: (cityName: string) => void
}

const CitySuggestions = ({ suggestions, onSelect }: CitySuggestionsProps) => {
  if (suggestions.length === 0) return null

  return (
    <ul
      className="
        absolute
        top-full
        left-0
        w-full
        max-h-48
        overflow-y-auto
        rounded-md
        bg-white/10
        backdrop-blur
        text-white
        border
        border-white/20
        z-30
        mt-1
      "
      style={{ scrollbarWidth: 'thin' }}
    >
      {suggestions.map((suggestion) => (
        <li
          key={suggestion}
          className="cursor-pointer px-4 py-2 hover:bg-white/20"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )
}

export default CitySuggestions
