'use client'

import { useState, useEffect } from 'react'
import type { AdminVideo, VideoType } from './types'

interface VideoFormProps {
  video?: AdminVideo | null
  onSubmit: (data: {
    youtubeUrl: string
    title: string
    clientName: string
    clientChannel: string
    description: string
    type: VideoType
  }) => void
  onCancel: () => void
  isLoading?: boolean
}

export function VideoForm({ video, onSubmit, onCancel, isLoading }: VideoFormProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [title, setTitle] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientChannel, setClientChannel] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<VideoType>('long')

  useEffect(() => {
    if (video) {
      setYoutubeUrl(video.youtubeUrl)
      setTitle(video.title)
      setClientName(video.clientName)
      setClientChannel(video.clientChannel)
      setDescription(video.description)
      setType(video.type)
    }
  }, [video])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ youtubeUrl, title, clientName, clientChannel, description, type })
  }

  const isEdit = !!video

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          {isEdit ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">URL YouTube *</label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Titre *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la vidéo"
              required
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>

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
              <label className="block text-sm font-medium text-slate-300 mb-1">Chaîne</label>
              <input
                type="text"
                value={clientChannel}
                onChange={(e) => setClientChannel(e.target.value)}
                placeholder="Nom de la chaîne"
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Type *</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setType('long')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  type === 'long'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                Vidéo longue
              </button>
              <button
                type="button"
                onClick={() => setType('short')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  type === 'short'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                Short
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la vidéo..."
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
            />
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
              disabled={isLoading || !youtubeUrl || !title || !clientName}
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
