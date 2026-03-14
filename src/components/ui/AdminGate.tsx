'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AdminGate() {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setError(true)
        setPassword('')
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Styled lock button — bottom-right corner */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white/70 hover:scale-110 active:scale-95 transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.3)',
        }}
        aria-label="Admin"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </button>

      {/* Password modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => { setOpen(false); setPassword(''); setError(false) }}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-80 p-7 rounded-3xl"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 32px 64px rgba(0,0,0,0.5)',
            }}
          >
            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

            {/* Lock icon */}
            <div className="flex justify-center mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, rgba(99,102,241,0.2) 0%, rgba(59,130,246,0.1) 100%)',
                  border: '1px solid rgba(99,102,241,0.2)',
                }}
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
            </div>

            <p
              className="text-base font-semibold text-white/80 mb-1 text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Espace admin
            </p>
            <p className="text-xs text-white/30 mb-5 text-center">
              Entre ton mot de passe pour continuer
            </p>

            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:scale-[1.02]"
              style={{
                background: error ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            />
            {error && (
              <p className="text-xs text-red-400/80 mt-2 text-center">Mot de passe incorrect</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full mt-4 py-3 rounded-xl text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:hover:scale-100 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(59,130,246,0.2) 100%)',
                border: '1px solid rgba(99,102,241,0.25)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(99,102,241,0.15)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {loading ? '...' : 'Accéder'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
