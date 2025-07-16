import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchCitySuggestions, validateCityWeather } from './api/weather'
import WeatherCard from './components/WeatherCard'
import { FiSearch, FiSettings } from 'react-icons/fi'
import { Header } from './components/Header'
import Footer from './components/Footer'
import { useWeather } from './hooks/useWeather'
import SettingsPanel from './components/SettingsPanel'
import { useSettings } from './hooks/useSettings'

function App() {
  const [cityInput, setCityInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { settings } = useSettings()
  const { weather, loading, fetchWeatherByCity, fetchWeatherByLocation, city: currentCity, apiError } = useWeather(null)
  const fetchControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!currentCity) fetchWeatherByLocation()
  }, [currentCity, fetchWeatherByLocation])

  useEffect(() => {
    if (!cityInput.trim() || apiError) {
      setSuggestions([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const results = await searchCitySuggestions(cityInput)
        const filtered = results
          .filter((v, i, arr) => arr.findIndex((x) => x.toLowerCase() === v.toLowerCase()) === i)
          .filter((v) => v.toLowerCase().includes(cityInput.toLowerCase()))

        const validated: string[] = []
        for (const city of filtered) {
          const isValid = await validateCityWeather(city)
          if (isValid) validated.push(city)
          if (validated.length >= 3) break
        }

        setSuggestions(validated)
      } catch {
        setSuggestions([])
      }
    }, 250)

    return () => clearTimeout(delayDebounce)
  }, [cityInput, apiError])

  function isValidCityName(name: string) {
    const cleaned = name.trim()
    if (cleaned.length < 2) return false
    if (/[^a-zA-Z\s-]/.test(cleaned)) return false
    if (cleaned.length > 30) return false
    return true
  }

  const fetchWeather = async (cityName?: string) => {
    if (apiError) return
    const cityToFetch = cityName || cityInput
    if (!isValidCityName(cityToFetch)) return
    if (fetchControllerRef.current) fetchControllerRef.current.abort()
    const controller = new AbortController()
    fetchControllerRef.current = controller
    try {
      await fetchWeatherByCity(cityToFetch)
      setCityInput('')
      setSuggestions([])
    } catch {}
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#101010] overflow-auto relative">
      <Header />
      <div className="w-full px-4 pt-32 flex justify-center">
        <div className="w-full max-w-4xl relative">
          <div className="flex gap-2 w-full items-center whitespace-nowrap">
            <button
              aria-label="Open settings"
              onClick={() => setIsSettingsOpen(true)}
              className="text-white text-2xl p-2 rounded-md bg-white/10 hover:bg-white/20 transition flex-shrink-0 w-12 h-12 flex items-center justify-center"
            >
              <FiSettings />
            </button>
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
              placeholder="Type a city name..."
              disabled={apiError}
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-white placeholder-white/50 placeholder:font-light outline-none font-[Raleway] border-0 text-base text-center sm:text-left disabled:opacity-50"
            />
            <button
              onClick={() => fetchWeather()}
              disabled={apiError}
              className="px-0 py-0 bg-white/10 hover:bg-white/20 transition rounded-md font-semibold text-white flex items-center justify-center gap-2 flex-shrink-0 w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Search"
            >
              <FiSearch className="text-lg" />
            </button>
          </div>
          {settings.showSuggestions && suggestions.length > 0 && !apiError && (
            <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] rounded-lg border border-white/10 shadow-lg overflow-y-auto z-30 max-h-60">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion}-${index}`}
                  onClick={() => fetchWeather(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 text-white font-[Raleway]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <main className="flex-grow flex flex-col items-center px-2 pb-16 gap-6 w-full max-w-6xl mx-auto mt-8 overflow-y-auto">
        <AnimatePresence>
          {!loading && apiError && (
            <motion.div
              layout
              className="w-full max-w-3xl sm:px-2 px-1 text-white text-center p-6 bg-red-900 rounded-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              The site is currently unavailable. Please try again later.
            </motion.div>
          )}
          {!loading && !apiError && weather && (
            <motion.div
              layout
              className="w-full max-w-3xl sm:px-2 px-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <WeatherCard data={weather} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Footer />
    </div>
  )
}

export default App
