import { useState, useRef, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import type { HeroProps } from '../types'
import { BioluminescentLetter } from './BioluminescentLetter'
import { BioluminescentParticles } from './BioluminescentParticles'

export function Hero({
  content,
  assets,
  animationConfig,
  onCtaClick,
  onVideoEnd,
  onAnimationComplete,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [revealedLetters, setRevealedLetters] = useState(0)

  const letters = content.brandName.split('')
  const totalLetters = letters.length

  // Handle video end
  const handleVideoEnd = () => {
    setVideoEnded(true)
    onVideoEnd?.()
    // Start content reveal after a brief pause
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  // Letter-by-letter reveal
  useEffect(() => {
    if (!showContent) return

    if (revealedLetters < totalLetters) {
      const timer = setTimeout(() => {
        setRevealedLetters((prev) => prev + 1)
      }, animationConfig.letterRevealDelay)
      return () => clearTimeout(timer)
    } else {
      // All letters revealed, show tagline
      const taglineTimer = setTimeout(() => {
        setShowTagline(true)
      }, animationConfig.taglineDelay)
      return () => clearTimeout(taglineTimer)
    }
  }, [showContent, revealedLetters, totalLetters, animationConfig])

  // Show CTA after tagline
  useEffect(() => {
    if (!showTagline) return

    const ctaTimer = setTimeout(() => {
      setShowCta(true)
      onAnimationComplete?.()
    }, animationConfig.ctaDelay)
    return () => clearTimeout(ctaTimer)
  }, [showTagline, animationConfig, onAnimationComplete])

  // Skip video for development (click anywhere)
  const handleSkip = () => {
    if (!videoEnded && videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration
    }
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: assets.backgroundColor }}
      onClick={handleSkip}
    >
      {/* Ocean Video - Full screen background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoEnded ? 'opacity-0' : 'opacity-100'
        }`}
        src={assets.videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Deep Ocean Background Gradient - visible after video */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          videoEnded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, ${assets.backgroundColor} 0%, #001122 50%, #000510 100%),
            linear-gradient(180deg, ${assets.backgroundColor} 0%, #000510 100%)
          `,
        }}
      />

      {/* Underwater light rays from above */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ${
          videoEnded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 animate-light-ray"
            style={{
              left: `${15 + i * 18}%`,
              width: '8%',
              height: '70%',
              background: `linear-gradient(180deg,
                rgba(0, 212, 255, 0.08) 0%,
                rgba(0, 212, 255, 0.03) 40%,
                transparent 100%)`,
              filter: 'blur(20px)',
              transform: `rotate(${-8 + i * 4}deg)`,
              transformOrigin: 'top center',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Bioluminescent Particles */}
      <BioluminescentParticles
        visible={videoEnded}
        glowColor={animationConfig.glowColor}
      />

      {/* Fish School Lottie Animation */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ${
          videoEnded ? 'opacity-60' : 'opacity-0'
        }`}
        style={{ zIndex: 5 }}
      >
        <DotLottieReact
          src={assets.fishLottieSrc}
          loop
          autoplay
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center px-6 transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Brand Name - Bioluminescent Letter Reveal */}
        <h1 className="relative flex justify-center items-center gap-1 sm:gap-2 md:gap-3">
          {letters.map((letter, index) => (
            <BioluminescentLetter
              key={index}
              letter={letter}
              revealed={index < revealedLetters}
              glowColor={animationConfig.glowColor}
              delay={index * 50}
            />
          ))}
        </h1>

        {/* Tagline - Letter Cascade */}
        <p
          className="mt-6 sm:mt-8 md:mt-10 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {content.tagline.split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-500 ${
                showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: showTagline ? `${index * 25}ms` : '0ms',
                color: 'rgba(186, 230, 253, 0.95)',
                textShadow: '0 0 20px rgba(56, 189, 248, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>

        {/* CTA Button */}
        <div
          className={`mt-10 sm:mt-12 md:mt-14 transition-all duration-1000 ${
            showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCtaClick?.()
            }}
            className={`group relative px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${showCta ? 'animate-cta-float' : ''}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#ffffff',
              background: `linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(56, 189, 248, 0.1) 100%
              )`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {/* Glass highlight - top edge */}
            <span
              className="absolute inset-x-0 top-0 h-[1px] opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
              }}
            />
            {/* Hover glow effect */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, rgba(56, 189, 248, 0.2) 0%, transparent 70%)`,
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              {content.ctaText}
              <svg
                className="w-5 h-5 animate-float"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Skip hint */}
      {!videoEnded && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-pulse">
          Cliquez pour passer
        </div>
      )}

      {/* CSS Keyframes */}
      <style>{`
        @keyframes light-ray {
          0%, 100% {
            opacity: 0.6;
            transform: rotate(var(--rotation, 0deg)) scaleY(1);
          }
          50% {
            opacity: 0.3;
            transform: rotate(var(--rotation, 0deg)) scaleY(1.1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        .animate-light-ray {
          animation: light-ray 8s ease-in-out infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        @keyframes cta-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .animate-cta-float {
          animation: cta-float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
