import { useState, useEffect, useCallback } from 'react'
import { getWeatherByCity, getWeatherByCoords } from '../api/weather'

export function useWeather(initialCity: string | null) {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState<string | null>(initialCity)
  const [apiError, setApiError] = useState(false)

  const fetchByCoords = useCallback(async () => {
    setLoading(true)
    setApiError(false)
    try {
      if (!navigator.geolocation) throw new Error('Geolocation not supported')
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      )
      const data = await getWeatherByCoords(position.coords.latitude, position.coords.longitude)
      if (!data) {
        setApiError(true)
        return
      }
      setWeather(data)
      setCity(null)
    } catch {
      setApiError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchByCity = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return
    setLoading(true)
    setApiError(false)
    try {
      const data = await getWeatherByCity(cityName)
      if (!data) return
      setWeather(data)
      setCity(cityName)
    } catch {
      setApiError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (city) {
      fetchByCity(city)
    } else {
      fetchByCoords()
    }
  }, [city, fetchByCity, fetchByCoords])

  return {
    weather,
    loading,
    fetchWeatherByCity: fetchByCity,
    fetchWeatherByLocation: fetchByCoords,
    city,
    setCity,
    apiError,
  }
}
