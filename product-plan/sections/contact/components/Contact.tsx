import { useState } from 'react'
import type { ContactProps } from '../types'

export function Contact({
  contactInfo,
  onEmailClick,
  onDiscordClick,
}: ContactProps) {
  const [emailHovered, setEmailHovered] = useState(false)
  const [discordHovered, setDiscordHovered] = useState(false)

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20 px-6"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% 100%, rgba(0, 180, 216, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 100% 60% at 20% 80%, rgba(0, 119, 182, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse 100% 60% at 80% 80%, rgba(72, 202, 228, 0.1) 0%, transparent 40%),
          linear-gradient(180deg, #000510 0%, #001122 50%, #002233 100%)
        `,
      }}
    >
      {/* Ambient light rays from below */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 animate-ray-pulse"
            style={{
              left: `${20 + i * 20}%`,
              width: '12%',
              height: '60%',
              background: `linear-gradient(0deg,
                rgba(0, 212, 255, 0.06) 0%,
                rgba(0, 212, 255, 0.02) 50%,
                transparent 100%)`,
              filter: 'blur(30px)',
              transform: `rotate(${-6 + i * 4}deg)`,
              transformOrigin: 'bottom center',
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `radial-gradient(circle, rgba(56, 189, 248, ${0.3 + Math.random() * 0.4}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${6 + Math.random() * 10}px rgba(56, 189, 248, 0.3)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'rgba(255, 255, 255, 0.95)',
            textShadow: `
              0 0 40px rgba(56, 189, 248, 0.4),
              0 0 80px rgba(56, 189, 248, 0.2),
              0 4px 8px rgba(0, 0, 0, 0.4)
            `,
          }}
        >
          {contactInfo.headline}
        </h2>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl md:text-2xl mb-16 max-w-xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(186, 230, 253, 0.85)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            lineHeight: 1.6,
          }}
        >
          {contactInfo.subheadline}
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {/* Email Button */}
          <a
            href={`mailto:${contactInfo.email}`}
            onClick={(e) => {
              if (onEmailClick) {
                e.preventDefault()
                onEmailClick()
              }
            }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
            className="group relative w-full sm:w-auto"
          >
            {/* Cinematic glow effect - expands on hover */}
            <div
              className="absolute -inset-4 rounded-3xl transition-all duration-700 ease-out"
              style={{
                background: emailHovered
                  ? 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(56, 189, 248, 0.5) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 70%)'
                  : 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 60%)',
                filter: emailHovered ? 'blur(20px)' : 'blur(10px)',
                transform: emailHovered ? 'scale(1.2)' : 'scale(1)',
                opacity: emailHovered ? 1 : 0.5,
              }}
            />

            {/* Secondary pulsing glow */}
            <div
              className="absolute -inset-2 rounded-2xl transition-all duration-500"
              style={{
                background: emailHovered
                  ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.4) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(14, 165, 233, 0.4) 100%)'
                  : 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(14, 165, 233, 0.05) 100%)',
                filter: emailHovered ? 'blur(8px)' : 'blur(4px)',
                animation: emailHovered ? 'pulse-glow 2s ease-in-out infinite' : 'none',
              }}
            />

            {/* Main button */}
            <div
              className="relative px-10 py-5 rounded-2xl overflow-hidden transition-all duration-500 group-active:scale-95"
              style={{
                background: `
                  linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%)
                `,
                border: emailHovered
                  ? '1px solid rgba(56, 189, 248, 0.6)'
                  : '1px solid rgba(56, 189, 248, 0.2)',
                boxShadow: emailHovered
                  ? `
                    0 0 30px rgba(56, 189, 248, 0.4),
                    0 0 60px rgba(56, 189, 248, 0.2),
                    0 20px 40px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(56, 189, 248, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                  `
                  : `
                    0 0 20px rgba(56, 189, 248, 0.1),
                    0 10px 30px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                  `,
                transform: emailHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {/* Inner highlight line */}
              <div
                className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.5) 50%, transparent 100%)',
                  opacity: emailHovered ? 1 : 0.3,
                }}
              />

              <div className="relative flex items-center justify-center gap-4">
                {/* Email Icon */}
                <svg
                  className="w-7 h-7 transition-all duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={emailHovered ? '#38bdf8' : '#7dd3fc'}
                  strokeWidth={1.5}
                  style={{
                    filter: emailHovered ? 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' : 'none',
                    transform: emailHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>

                <span
                  className="text-xl sm:text-2xl font-semibold tracking-wide transition-all duration-500"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: emailHovered ? '#38bdf8' : '#7dd3fc',
                    textShadow: emailHovered
                      ? '0 0 20px rgba(56, 189, 248, 0.8), 0 0 40px rgba(56, 189, 248, 0.4)'
                      : '0 0 10px rgba(56, 189, 248, 0.3)',
                  }}
                >
                  {contactInfo.email}
                </span>
              </div>
            </div>
          </a>

          {/* Discord Button */}
          <a
            href={contactInfo.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onDiscordClick) {
                e.preventDefault()
                onDiscordClick()
              }
            }}
            onMouseEnter={() => setDiscordHovered(true)}
            onMouseLeave={() => setDiscordHovered(false)}
            className="group relative w-full sm:w-auto"
          >
            {/* Cinematic glow effect - expands on hover */}
            <div
              className="absolute -inset-4 rounded-3xl transition-all duration-700 ease-out"
              style={{
                background: discordHovered
                  ? 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(88, 101, 242, 0.5) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 70%)'
                  : 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(88, 101, 242, 0.15) 0%, transparent 60%)',
                filter: discordHovered ? 'blur(20px)' : 'blur(10px)',
                transform: discordHovered ? 'scale(1.2)' : 'scale(1)',
                opacity: discordHovered ? 1 : 0.5,
              }}
            />

            {/* Secondary pulsing glow */}
            <div
              className="absolute -inset-2 rounded-2xl transition-all duration-500"
              style={{
                background: discordHovered
                  ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.4) 0%, rgba(129, 140, 248, 0.3) 50%, rgba(99, 102, 241, 0.4) 100%)'
                  : 'linear-gradient(135deg, rgba(88, 101, 242, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                filter: discordHovered ? 'blur(8px)' : 'blur(4px)',
                animation: discordHovered ? 'pulse-glow 2s ease-in-out infinite' : 'none',
              }}
            />

            {/* Main button */}
            <div
              className="relative px-10 py-5 rounded-2xl overflow-hidden transition-all duration-500 group-active:scale-95"
              style={{
                background: `
                  linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%)
                `,
                border: discordHovered
                  ? '1px solid rgba(88, 101, 242, 0.6)'
                  : '1px solid rgba(88, 101, 242, 0.2)',
                boxShadow: discordHovered
                  ? `
                    0 0 30px rgba(88, 101, 242, 0.4),
                    0 0 60px rgba(88, 101, 242, 0.2),
                    0 20px 40px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(88, 101, 242, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                  `
                  : `
                    0 0 20px rgba(88, 101, 242, 0.1),
                    0 10px 30px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                  `,
                transform: discordHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {/* Inner highlight line */}
              <div
                className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(88, 101, 242, 0.5) 50%, transparent 100%)',
                  opacity: discordHovered ? 1 : 0.3,
                }}
              />

              <div className="relative flex items-center justify-center gap-4">
                {/* Discord Icon */}
                <svg
                  className="w-7 h-7 transition-all duration-500"
                  fill={discordHovered ? '#a5b4fc' : '#c7d2fe'}
                  viewBox="0 0 24 24"
                  style={{
                    filter: discordHovered ? 'drop-shadow(0 0 8px rgba(88, 101, 242, 0.8))' : 'none',
                    transform: discordHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>

                <span
                  className="text-xl sm:text-2xl font-semibold tracking-wide transition-all duration-500"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: discordHovered ? '#a5b4fc' : '#c7d2fe',
                    textShadow: discordHovered
                      ? '0 0 20px rgba(88, 101, 242, 0.8), 0 0 40px rgba(88, 101, 242, 0.4)'
                      : '0 0 10px rgba(88, 101, 242, 0.3)',
                  }}
                >
                  {contactInfo.discordLabel}
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes ray-pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scaleY(1) rotate(var(--rotation, 0deg));
          }
          50% {
            opacity: 0.3;
            transform: scaleY(1.15) rotate(var(--rotation, 0deg));
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.7;
          }
        }

        .animate-ray-pulse {
          animation: ray-pulse 6s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  )
}
