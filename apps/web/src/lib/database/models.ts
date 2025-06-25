// apps/web/lib/database/models.ts
import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  email: string
  company: {
    name: string
    domain: string
  }
  landivo_integration?: {
    github_repo: string
    api_key: string
    last_sync: Date
  }
  email_settings: {
    smtp_config?: any
    sendgrid_config?: any
  }
  created_at: Date
  updated_at: Date
}

export interface Contact {
  _id?: ObjectId
  user_id: ObjectId
  email: string
  profile: {
    first_name: string
    last_name: string
    location?: any
  }
  preferences: {
    subscribed: boolean
    categories: string[]
    price_range?: {
      min: number
      max: number
    }
  }
  landivo_data?: {
    buyer_id: string
    lead_score: number
    viewing_history: any[]
  }
  tracking: {
    total_opens: number
    total_clicks: number
    engagement_score: number
  }
  created_at: Date
  updated_at: Date
}

export interface Campaign {
  _id?: ObjectId
  user_id: ObjectId
  name: string
  type: 'broadcast' | 'automated'
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused'
  targeting: {
    segments: string[]
    total_recipients: number
  }
  landivo_trigger?: {
    type: string
    conditions: any
  }
  ab_test?: {
    enabled: boolean
    variants: any[]
    winner?: string
  }
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
  }
  created_at: Date
  updated_at: Date
}