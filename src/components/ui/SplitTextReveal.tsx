'use client'

import { motion, type Variants } from 'framer-motion'

interface SplitTextRevealProps {
  text: string
  className?: string
  mode?: 'words' | 'chars'
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const charVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
    rotateX: 40,
  },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
}

export function SplitTextReveal({ text, className, mode = 'chars' }: SplitTextRevealProps) {
  if (mode === 'words') {
    const words = text.split(' ')
    return (
      <motion.span
        className={className}
        style={{ fontFamily: 'var(--font-heading)', display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.3em' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block" style={{ lineHeight: 1.2 }}>
            <motion.span
              className="inline-block"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    )
  }

  const chars = text.split('')
  return (
    <motion.span
      className={className}
      style={{ fontFamily: 'var(--font-heading)', display: 'inline-block', perspective: 600 }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block"
          style={{ lineHeight: 1.2 }}
        >
          <motion.span
            className="inline-block"
            style={{ minWidth: char === ' ' ? '0.3em' : undefined }}
            variants={charVariants}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
