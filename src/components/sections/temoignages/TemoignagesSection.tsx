'use client'

import { useEffect, useState } from 'react'
import { TestimonialStack } from './TestimonialStack'
import type { TestimonialData } from './TestimonialCard'

export function TemoignagesSection() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <TestimonialStack testimonials={testimonials} />
}
