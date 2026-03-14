'use client'

import { useState, useEffect } from 'react'
import type { AdminTestimonial, AdminVideo } from './types'

interface TestimonialFormProps {
  testimonial?: AdminTestimonial | null
  videos: AdminVideo[]
  onSubmit: (data: {
    clientName: string
    channelName: string
    channelUrl: string
    avatarUrl: string
    text: string
    videoId: string | null
  }) => void
  onCancel: () => void
  isLoading?: boolean
}

export function TestimonialForm({ testimonial, videos, onSubmit, onCancel, isLoading }: TestimonialFormProps) {
  const [clientName, setClientName] = useState('')
  const [channelName, setChannelName] = useState('')
  const [channelUrl, setChannelUrl] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [text, setText] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)

  useEffect(() => {
    if (testimonial) {
      setClientName(testimonial.clientName)
      setChannelName(testimonial.channelName)
      setChannelUrl(testimonial.channelUrl)
      setAvatarUrl(testimonial.avatarUrl || '')
      setText(testimonial.text)
      setVideoId(testimonial.videoId)
    }
  }, [testimonial])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ clientName, channelName, channelUrl, avatarUrl, text, videoId })
  }

  const isEdit = !!testimonial

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          {isEdit ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nom du client *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nom du YouTubeur"
                required
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nom de la chaîne *</label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Nom de la chaîne"
                required
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">URL de la chaîne *</label>
            <input
              type="url"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              placeholder="https://www.youtube.com/@..."
              required
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">URL de l&apos;avatar</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Témoignage *</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Le témoignage du client..."
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Vidéo liée</label>
            <select
              value={videoId || ''}
              onChange={(e) => setVideoId(e.target.value || null)}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            >
              <option value="">Aucune</option>
              {videos.map(v => (
                <option key={v.id} value={v.id}>{v.title}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading || !clientName || !channelName || !channelUrl || !text}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors text-sm font-medium flex items-center gap-2"
            >
              {isLoading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isEdit ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
