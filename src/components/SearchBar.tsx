import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useSettings } from '../hooks/useSettings'

export default function SearchBar({ onSearch, suggestions, onSelectSuggestion }: any) {
  const [input, setInput] = useState('')
  const { settings } = useSettings()

  return (
    <div className="relative w-full">
      <div className="flex gap-2 relative z-20">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(input)}
          placeholder="Enter a city..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-white placeholder-white/50 outline-none font-[Raleway] border-0"
        />
        <button
          onClick={() => onSearch(input)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-lg font-semibold text-white flex items-center gap-2"
        >
          <FiSearch />
        </button>
      </div>

      {settings.showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] rounded-lg border border-white/10 shadow-lg overflow-y-auto max-h-60 z-30">
          {suggestions.map((suggestion: string, index: number) => (
            <button
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-white/10 text-white font-[Raleway]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
