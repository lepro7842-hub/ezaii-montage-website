'use client'

import { useMemo } from 'react'

interface BioluminescentParticlesProps {
  visible: boolean
  glowColor: string
  count?: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function BioluminescentParticles({
  visible,
  count = 15,
}: BioluminescentParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 8,
    }))
  }, [count])

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-2000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 4 }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: 'rgba(56, 189, 248, 0.6)',
            boxShadow: '0 0 8px rgba(56, 189, 248, 0.5)',
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <div
          key={`large-${i}`}
          className="absolute rounded-full animate-large-float"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 30}%`,
            width: '6px',
            height: '6px',
            backgroundColor: 'rgba(125, 211, 252, 0.7)',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
            animationDuration: `${14 + i * 2}s`,
            animationDelay: `${i * 2}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-20px); opacity: 0.7; }
        }
        @keyframes large-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          33% { transform: translate(10px, -25px); opacity: 0.8; }
          66% { transform: translate(-10px, -15px); opacity: 0.6; }
        }
        .animate-particle-float { animation: particle-float ease-in-out infinite; }
        .animate-large-float { animation: large-float ease-in-out infinite; }
      `}</style>
    </div>
  )
}
