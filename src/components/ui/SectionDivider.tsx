'use client'

import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <div className="relative py-2 flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-px w-full max-w-3xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), rgba(34, 211, 238, 0.3), rgba(99, 102, 241, 0.4), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Center glow dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={{ boxShadow: '0 0 12px rgba(34, 211, 238, 0.4)' }}
      />
    </div>
  )
}
