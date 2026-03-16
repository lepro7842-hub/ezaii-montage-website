'use client'

import { TestimonialStack } from './TestimonialStack'
import type { TestimonialData } from './TestimonialCard'

const testimonials: TestimonialData[] = [
  {
    id: 'testi-001',
    clientName: 'LeMoove',
    channelName: 'LeMoove',
    channelUrl: '',
    text: "Ezai est un monteur passionné, et surtout l'un des rare avec autant de potentiel ! Très expérimenté en montage il a toujours su trouver une solution pour un meilleur rendu 😉",
  },
  {
    id: 'testi-002',
    clientName: 'Gugu',
    channelName: 'Gugu',
    channelUrl: '',
    text: 'Ezai est un monteur polyvalent',
  },
]

export function TemoignagesSection() {
  return <TestimonialStack testimonials={testimonials} />
}
