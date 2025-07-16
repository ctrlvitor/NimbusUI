import { motion } from "framer-motion"
import { FaReact } from "react-icons/fa"
import { SiTypescript, SiTailwindcss } from "react-icons/si"
import { useMemo } from "react"

const copyVariants = [
  "— forecast: 100% chance of style.",
  "— currently cooler than your local weather app.",
  "— no rain, just smooth UX.",
  "— slightly cloudy with a chance of creativity.",
  "— designed to handle storms. metaphorical ones.",
  "— warm UI, chill vibes.",
  "— humidity: 0%. Sass: moderate.",
  "— responsive even in unpredictable climates.",
]

export default function Footer() {
  const randomCopy = useMemo(
    () => copyVariants[Math.floor(Math.random() * copyVariants.length)],
    []
  )

  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 px-4 sm:px-8 md:px-12 py-4 text-xs sm:text-sm z-50 shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 text-center md:text-left"
      >
        <p className="max-w-xs sm:max-w-md md:max-w-none leading-snug text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Vitor S. {randomCopy}
        </p>

        <div className="flex items-center justify-center gap-6 px-5 py-2 rounded-xl bg-zinc-200/30 dark:bg-zinc-800/30 backdrop-blur-sm">
          <div className="flex items-center gap-1 text-cyan-500">
            <FaReact className="animate-[spin_8s_linear_infinite] text-base" />
            <span className="font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              React
            </span>
          </div>

          <div className="flex items-center gap-1 text-blue-500">
            <SiTypescript className="text-base" />
            <span
              className="font-semibold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent"
              style={{ fontSize: "0.84rem" }}
            >
              TypeScript
            </span>
          </div>

          <div className="flex items-center gap-1 text-sky-500">
            <SiTailwindcss className="text-base" />
            <span className="font-semibold text-sm bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Tailwind
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
