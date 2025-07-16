import { motion, type Variants } from 'framer-motion'
import { getWeatherIconUrl } from '../api/weather'
import { useSettings } from '../hooks/useSettings'

const iconVariants: Variants = {
  idle: { rotate: 0 },
  animate: {
    rotate: [0, 10, -10, 10, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: 'easeInOut',
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function formatTemperature(
  temp: number,
  unit: 'celsius' | 'fahrenheit' | 'kelvin',
  decimalPlaces = 0
) {
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

function formatDateTime(
  timestamp: number,
  timezoneOffset: number,
  format12h: boolean
) {
  const localTimestamp = (timestamp + timezoneOffset) * 1000
  const date = new Date(localTimestamp)

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: format12h,
    timeZone: 'UTC',
  }).format(date)
}

export default function WeatherCard({ data }: { data: any }) {
  const { settings } = useSettings()
  const unit = settings.unit as 'celsius' | 'fahrenheit' | 'kelvin'

  const locationParts = [data.name?.trim(), data.state?.trim()].filter(Boolean)
  const fullLocation = locationParts.join(', ')
  const countryCode = data.country?.toLowerCase() || null
  const countryFlag = countryCode
    ? `https://flagcdn.com/w40/${countryCode}.png`
    : null
  const capitalCode = data.state ? data.state.toUpperCase() : null

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full max-w-full px-4 sm:px-6 md:px-8 py-8 mx-auto bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg text-white flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-3 min-w-0 flex-wrap">
            {countryFlag && (
              <img
                src={countryFlag}
                alt={data.country}
                className="w-8 h-6 rounded-sm object-cover flex-shrink-0"
              />
            )}
            <h2
  className="text-2xl sm:text-3xl font-extrabold tracking-wide truncate min-w-0 max-w-[60vw] sm:max-w-[30vw]"
  title={fullLocation}
>
  {fullLocation}
</h2>
            {capitalCode && (
              <span className="text-sm text-white/70 font-semibold select-none">
                ({capitalCode}{countryCode ? ` / ${data.country}` : ''})
              </span>
            )}
            {!capitalCode && countryCode && (
              <span className="text-sm text-white/70 font-semibold select-none">
                ({data.country})
              </span>
            )}
          </div>
          <p className="text-sm text-white/70 font-mono select-none">
            {formatDateTime(data.timestamp, data.timezone, settings.timeFormat === '12h')}
          </p>
        </div>

        <motion.img
          src={getWeatherIconUrl(data.icon)}
          alt={data.weather.description}
          className="w-20 h-20 shrink-0 hidden sm:block"
          variants={iconVariants}
          initial="idle"
          animate="animate"
        />
      </div>

      <div className="block sm:hidden self-center">
        <motion.img
          src={getWeatherIconUrl(data.icon)}
          alt={data.weather.description}
          className="w-20 h-20 shrink-0 my-2"
          variants={iconVariants}
          initial="idle"
          animate="animate"
        />
      </div>

      <div className="text-5xl sm:text-6xl font-bold leading-none tracking-tight text-center sm:text-left">
        {formatTemperature(data.temp, unit, settings.decimalPrecision)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-white/90">
        <div className="flex justify-between font-semibold">
          <span>Feels Like</span>
          <span className="font-normal">
            {formatTemperature(data.feels_like ?? data.temp, unit, settings.decimalPrecision)}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Low</span>
          <span className="font-normal">
            {formatTemperature(data.temp_min, unit, settings.decimalPrecision)}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>High</span>
          <span className="font-normal">
            {formatTemperature(data.temp_max, unit, settings.decimalPrecision)}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Humidity</span>
          <span className="font-normal">{data.humidity}%</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Wind Speed</span>
          <span className="font-normal">{data.wind} km/h</span>
        </div>
        <div className="flex justify-between gap-2 capitalize whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
          <span>Condition</span>
          <span className="truncate font-normal">{data.weather.description}</span>
        </div>
      </div>
    </motion.div>
  )
}
