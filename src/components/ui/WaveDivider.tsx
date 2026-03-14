'use client'

import { useEffect, useRef } from 'react'

interface WaveDividerProps {
  flip?: boolean
  variant?: 'blue' | 'indigo' | 'subtle'
}

export function WaveDivider({ flip = false, variant = 'blue' }: WaveDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // Color palettes — rgb tuples for smooth blending
    const palettes = {
      blue: [
        [29, 78, 216],
        [59, 130, 246],
        [99, 102, 241],
      ],
      indigo: [
        [99, 102, 241],
        [79, 70, 229],
        [59, 130, 246],
      ],
      subtle: [
        [30, 64, 175],
        [37, 99, 235],
        [79, 70, 229],
      ],
    }
    const pal = palettes[variant]

    // 6 wave layers with overlapping harmonics for realistic ocean feel
    const layers = [
      { speed: 0.008, freq: 0.0015, amp: 0.38, yBase: 0.15, color: pal[0], alpha: 0.18 },
      { speed: -0.006, freq: 0.0025, amp: 0.30, yBase: 0.25, color: pal[1], alpha: 0.14 },
      { speed: 0.010, freq: 0.0020, amp: 0.25, yBase: 0.35, color: pal[2], alpha: 0.12 },
      { speed: -0.012, freq: 0.0035, amp: 0.18, yBase: 0.48, color: pal[0], alpha: 0.10 },
      { speed: 0.007, freq: 0.0030, amp: 0.14, yBase: 0.58, color: pal[1], alpha: 0.08 },
      { speed: -0.005, freq: 0.0045, amp: 0.10, yBase: 0.70, color: pal[2], alpha: 0.06 },
    ]

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const l of layers) {
        ctx.beginPath()

        // Start from bottom-left
        ctx.moveTo(-2, h + 2)

        // Draw wave across the width
        for (let x = -2; x <= w + 2; x += 3) {
          // Multiple harmonics for organic shape
          const nx = x / w
          const wave =
            Math.sin(x * l.freq + t * l.speed) * l.amp * h +
            Math.sin(x * l.freq * 2.3 + t * l.speed * 0.7 + 1.3) * l.amp * h * 0.3 +
            Math.sin(x * l.freq * 0.7 + t * l.speed * 1.4 + 2.8) * l.amp * h * 0.15

          // Fade amplitude at edges so no hard cut
          const edgeFade = Math.sin(nx * Math.PI)
          const y = h * l.yBase + wave * (0.4 + edgeFade * 0.6)

          ctx.lineTo(x, y)
        }

        // Close to bottom-right
        ctx.lineTo(w + 2, h + 2)
        ctx.closePath()

        // Vertical gradient fill
        const grad = ctx.createLinearGradient(0, h * l.yBase - l.amp * h, 0, h)
        const [r, g, b] = l.color
        grad.addColorStop(0, `rgba(${r},${g},${b},${l.alpha * 0.3})`)
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${l.alpha})`)
        grad.addColorStop(0.7, `rgba(${r},${g},${b},${l.alpha * 0.8})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},${l.alpha * 0.1})`)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Top fade — soft blend into section above (no hard line)
      const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.3)
      topFade.addColorStop(0, 'rgba(2, 6, 23, 1)')    // slate-950
      topFade.addColorStop(1, 'rgba(2, 6, 23, 0)')
      ctx.fillStyle = topFade
      ctx.fillRect(0, 0, w, h * 0.3)

      // Bottom fade — soft blend into section below
      const botFade = ctx.createLinearGradient(0, h * 0.75, 0, h)
      botFade.addColorStop(0, 'rgba(2, 6, 23, 0)')
      botFade.addColorStop(1, 'rgba(2, 6, 23, 1)')    // slate-950
      ctx.fillStyle = botFade
      ctx.fillRect(0, h * 0.75, w, h * 0.25)

      t++
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [variant])

  return (
    <div
      className="relative w-full bg-slate-950"
      style={{
        height: 'clamp(120px, 18vw, 250px)',
        transform: flip ? 'scaleY(-1)' : undefined,
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
