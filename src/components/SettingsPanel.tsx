'use client'

import { useSettings } from '../hooks/useSettings'
import { IoArrowBack, IoSettingsOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function SettingsPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { settings, updateSettings } = useSettings()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 h-full z-50 overflow-hidden"
    >
      <div
        ref={panelRef}
        className="h-full w-full md:w-96 bg-gradient-to-br from-[#121212] to-[#181818] border-r border-white/10 text-white flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <button onClick={onClose} className="text-white text-xl">
            <IoArrowBack />
          </button>
          <h2 className="text-lg font-bold">Settings</h2>
          <motion.div
            className="text-white text-xl"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <IoSettingsOutline />
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 p-6 text-sm">

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Temperature Unit</label>
            <select
              value={settings.unit}
              onChange={(e) => updateSettings({ unit: e.target.value })}
              className="bg-white/10 text-white px-4 py-2 rounded-lg outline-none appearance-none font-medium"
            >
              <option value="celsius" className="bg-[#222] text-white font-medium">
                Celsius
              </option>
              <option value="fahrenheit" className="bg-[#222] text-white font-medium">
                Fahrenheit
              </option>
              <option value="kelvin" className="bg-[#222] text-white font-medium">
                Kelvin
              </option>
            </select>
          </div>


          <div className="flex flex-col gap-2">
            <label className="font-semibold">Time Format</label>
            <select
              value={settings.timeFormat}
              onChange={(e) => updateSettings({ timeFormat: e.target.value })}
              className="bg-white/10 text-white px-4 py-2 rounded-lg outline-none appearance-none font-medium"
            >
              <option value="24h" className="bg-[#222] text-white font-medium">
                24-Hour
              </option>
              <option value="12h" className="bg-[#222] text-white font-medium">
                12-Hour
              </option>
            </select>
          </div>


          <div className="flex flex-col gap-2">
            <label className="font-semibold">Decimal Precision</label>
            <select
              value={settings.decimalPrecision}
              onChange={(e) =>
                updateSettings({ decimalPrecision: parseInt(e.target.value) })
              }
              className="bg-white/10 text-white px-4 py-2 rounded-lg outline-none appearance-none font-medium"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n} className="bg-[#222] text-white font-medium">
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="font-semibold">Show Suggestions</span>
            <motion.button
              onClick={() =>
                updateSettings({ showSuggestions: !settings.showSuggestions })
              }
              className={`w-12 h-6 rounded-full px-1 flex items-center transition-all duration-300 ${
                settings.showSuggestions
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600'
                  : 'bg-white/10'
              }`}
            >
              <motion.div
                layout
                className="w-4 h-4 rounded-full bg-white shadow-md"
                initial={false}
                animate={{ x: settings.showSuggestions ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
