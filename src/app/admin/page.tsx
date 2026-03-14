'use client'

import { useState, useEffect, useCallback } from 'react'
import { Login } from '@/components/sections/admin/Login'
import { AdminDashboard } from '@/components/sections/admin/AdminDashboard'
import { VideoForm } from '@/components/sections/admin/VideoForm'
import { TestimonialForm } from '@/components/sections/admin/TestimonialForm'
import { ConfirmDialog } from '@/components/sections/admin/ConfirmDialog'
import type { AdminVideo, AdminTestimonial, VideoType } from '@/components/sections/admin/types'

type ModalState =
  | { type: 'none' }
  | { type: 'videoForm'; video?: AdminVideo }
  | { type: 'testimonialForm'; testimonial?: AdminTestimonial }
  | { type: 'confirmDelete'; entityType: 'video' | 'testimonial'; id: string; name: string }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)

  const [videos, setVideos] = useState<AdminVideo[]>([])
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([])
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [formLoading, setFormLoading] = useState(false)

  // Check session on mount
  useEffect(() => {
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false))
  }, [])

  // Fetch data when authenticated
  const fetchData = useCallback(async () => {
    const [videosRes, testimonialsRes] = await Promise.all([
      fetch('/api/admin/videos'),
      fetch('/api/admin/testimonials'),
    ])
    if (videosRes.ok) setVideos(await videosRes.json())
    if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json())
  }, [])

  useEffect(() => {
    if (authenticated) fetchData()
  }, [authenticated, fetchData])

  // Auth handlers
  const handleLogin = async (password: string) => {
    setLoginLoading(true)
    setLoginError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setAuthenticated(true)
      } else {
        const data = await res.json()
        setLoginError(data.error || 'Erreur de connexion')
      }
    } catch {
      setLoginError('Erreur réseau')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAuthenticated(false)
    setVideos([])
    setTestimonials([])
  }

  // Video CRUD
  const handleVideoSubmit = async (data: {
    youtubeUrl: string
    title: string
    clientName: string
    clientChannel: string
    description: string
    type: VideoType
  }) => {
    setFormLoading(true)
    try {
      const editingVideo = modal.type === 'videoForm' ? modal.video : undefined
      const url = editingVideo ? `/api/videos/${editingVideo.id}` : '/api/videos'
      const method = editingVideo ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setModal({ type: 'none' })
        await fetchData()
      }
    } finally {
      setFormLoading(false)
    }
  }

  // Testimonial CRUD
  const handleTestimonialSubmit = async (data: {
    clientName: string
    channelName: string
    channelUrl: string
    avatarUrl: string
    text: string
    videoId: string | null
  }) => {
    setFormLoading(true)
    try {
      const editingTestimonial = modal.type === 'testimonialForm' ? modal.testimonial : undefined
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : '/api/testimonials'
      const method = editingTestimonial ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setModal({ type: 'none' })
        await fetchData()
      }
    } finally {
      setFormLoading(false)
    }
  }

  // Delete
  const handleDelete = async () => {
    if (modal.type !== 'confirmDelete') return
    setFormLoading(true)
    try {
      const endpoint = modal.entityType === 'video' ? 'videos' : 'testimonials'
      const res = await fetch(`/api/${endpoint}/${modal.id}`, { method: 'DELETE' })
      if (res.ok) {
        setModal({ type: 'none' })
        await fetchData()
      }
    } finally {
      setFormLoading(false)
    }
  }

  // Loading state
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    )
  }

  // Not authenticated
  if (!authenticated) {
    return <Login onLogin={handleLogin} error={loginError} isLoading={loginLoading} />
  }

  return (
    <>
      <AdminDashboard
        videos={videos}
        testimonials={testimonials}
        onAddVideo={() => setModal({ type: 'videoForm' })}
        onEditVideo={(id) => {
          const video = videos.find(v => v.id === id)
          if (video) setModal({ type: 'videoForm', video })
        }}
        onDeleteVideo={(id) => {
          const video = videos.find(v => v.id === id)
          if (video) setModal({ type: 'confirmDelete', entityType: 'video', id, name: video.title })
        }}
        onAddTestimonial={() => setModal({ type: 'testimonialForm' })}
        onEditTestimonial={(id) => {
          const testimonial = testimonials.find(t => t.id === id)
          if (testimonial) setModal({ type: 'testimonialForm', testimonial })
        }}
        onDeleteTestimonial={(id) => {
          const testimonial = testimonials.find(t => t.id === id)
          if (testimonial) setModal({ type: 'confirmDelete', entityType: 'testimonial', id, name: testimonial.clientName })
        }}
        onLogout={handleLogout}
      />

      {modal.type === 'videoForm' && (
        <VideoForm
          video={modal.video}
          onSubmit={handleVideoSubmit}
          onCancel={() => setModal({ type: 'none' })}
          isLoading={formLoading}
        />
      )}

      {modal.type === 'testimonialForm' && (
        <TestimonialForm
          testimonial={modal.testimonial}
          videos={videos}
          onSubmit={handleTestimonialSubmit}
          onCancel={() => setModal({ type: 'none' })}
          isLoading={formLoading}
        />
      )}

      {modal.type === 'confirmDelete' && (
        <ConfirmDialog
          title={modal.entityType === 'video' ? 'Supprimer la vidéo' : 'Supprimer le témoignage'}
          message={`Êtes-vous sûr de vouloir supprimer "${modal.name}" ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={() => setModal({ type: 'none' })}
          isLoading={formLoading}
        />
      )}
    </>
  )
}
