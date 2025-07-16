import { createContext, useContext, useEffect, useState } from 'react'

const defaultSettings = {
  unit: 'celsius',
  timeFormat: '24h',
  decimalPrecision: 0,
  showSuggestions: false,
}

type Settings = {
  unit: string
  timeFormat: string
  decimalPrecision: number
  showSuggestions: boolean
}

type SettingsContextType = {
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
  locationBlocked: boolean
  setLocationBlocked: (blocked: boolean) => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [locationBlocked, setLocationBlocked] = useState(false)

  const updateSettings = (updates: Partial<Settings>) => {
    const updated = { ...settings, ...updates }
    const diff: Partial<Settings> = Object.fromEntries(
      Object.entries(updated).filter(([key, value]) => value !== defaultSettings[key as keyof Settings])
    ) as Partial<Settings>

    if (Object.keys(diff).length === 0) {
      localStorage.removeItem('app-settings')
    } else {
      localStorage.setItem('app-settings', JSON.stringify(diff))
    }

    setSettings(updated)
  }

  useEffect(() => {
    const saved = localStorage.getItem('app-settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      setSettings({ ...defaultSettings, ...parsed })
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, locationBlocked, setLocationBlocked }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within a SettingsProvider')
  return context
}
