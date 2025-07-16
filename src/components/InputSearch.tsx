import { motion } from "framer-motion"

export const InputSearch = ({
  city,
  onChange,
  onSearch,
  suggestions,
  onSelectSuggestion,
}: {
  city: string
  onChange: (v: string) => void
  onSearch: (q: string) => void
  suggestions: string[]
  onSelectSuggestion: (v: string) => void
}) => {
  return (
    <div className="w-full max-w-xl relative">
      <input
        type="text"
        value={city}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(city)}
        placeholder="Search city..."
        className="w-full px-6 py-3 rounded-xl text-black font-medium text-base sm:text-lg focus:outline-none shadow-md"
      />

      {suggestions.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50 max-h-64 overflow-auto"
        >
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => onSelectSuggestion(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}