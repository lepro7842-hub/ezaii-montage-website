export type VideoType = 'long' | 'short'

export interface AdminVideo {
  id: string
  youtubeUrl: string
  title: string
  clientName: string
  clientChannel: string
  description: string
  type: VideoType
  createdAt: string
}

export interface AdminTestimonial {
  id: string
  clientName: string
  channelName: string
  channelUrl: string
  avatarUrl: string | null
  text: string
  videoId: string | null
  createdAt: string
}
