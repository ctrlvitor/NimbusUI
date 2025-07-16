import { SocialIcons } from "./SocialIcons"
import { motion } from "framer-motion"

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between z-50 backdrop-blur-md shadow-sm
        bg-gradient-to-b from-zinc-50/80 via-zinc-50/70 to-transparent dark:from-zinc-900/70 dark:via-zinc-800/50 dark:to-transparent"
    >

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex-shrink-0"
      >
        <SocialIcons />
      </motion.div>

      <div className="flex-1" />

      <motion.h1
  className="text-xl sm:text-2xl font-[Raleway] text-zinc-900 dark:text-zinc-100 select-none"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.5 }}
>
  Nimbus{' '}
  <strong
    className="
      bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600
      bg-clip-text text-transparent
      drop-shadow-[0_0_2px_rgba(255,179,0,0.5)]
      drop-shadow-[0_0_4px_rgba(255,69,0,0.4)]
      drop-shadow-[0_0_6px_rgba(255,140,0,0.5)]
      animate-neonGlow
    "
  >
    UI
  </strong>
</motion.h1>


    </motion.header>
  )
}
