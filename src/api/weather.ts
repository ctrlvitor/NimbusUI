const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function getWeatherByCity(city: string) {
  try {
    const controller = new AbortController()
    const res = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { signal: controller.signal }
    )
    if (!res.ok) return null
    const raw = await res.json()
    return normalizeWeather(raw)
  } catch {
    return null
  }
}

export async function getWeatherByCoords(lat: number, lon: number) {
  try {
    const controller = new AbortController()
    const res = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { signal: controller.signal }
    )
    if (!res.ok) return null
    const raw = await res.json()
    return normalizeWeather(raw)
  } catch {
    return null
  }
}

export async function searchCitySuggestions(query: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    )
    if (!res.ok) return []
    const cities = await res.json()
    return cities.map((c: any) => `${c.name}${c.state ? ', ' + c.state : ''}`)
  } catch {
    return []
  }
}

function normalizeWeather(raw: any) {
  return {
    name: raw.name,
    country: raw.sys?.country || '',
    state: raw.sys?.state || '',
    timestamp: raw.dt,
    timezone: raw.timezone,
    temp: Number(raw.main?.temp ?? NaN),
    feels_like: Number(raw.main?.feels_like ?? NaN),
    temp_min: Number(raw.main?.temp_min ?? NaN),
    temp_max: Number(raw.main?.temp_max ?? NaN),
    humidity: Number(raw.main?.humidity ?? NaN),
    wind: Number(raw.wind?.speed ?? NaN),
    weather: raw.weather?.[0] || {},
    icon: raw.weather?.[0]?.icon || '01d',
  }
}

export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit' | 'kelvin', decimalPlaces = 0) {
  if (typeof temp !== 'number' || isNaN(temp)) return 'N/A'
  decimalPlaces = Math.min(3, Math.max(0, decimalPlaces))
  let value: number
  switch (unit) {
    case 'celsius':
      value = temp
      break
    case 'fahrenheit':
      value = temp * 9 / 5 + 32
      break
    case 'kelvin':
      value = temp + 273.15
      break
    default:
      value = temp
  }
  return `${Number(value.toFixed(decimalPlaces))}°${unit === 'celsius' ? 'C' : unit === 'fahrenheit' ? 'F' : 'K'}`
}

export function getWeatherIconUrl(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
}

export async function validateCityWeather(city: string): Promise<boolean> {
  try {
    const data = await getWeatherByCity(city)
    return !!data && !!data.name
  } catch {
    return false
  }
}
