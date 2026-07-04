export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  credits: number
  is_subscribed: boolean
  subscription_end_date: string | null
  created_at: string
}

export interface Tokens {
  access: string
  refresh: string
}

export interface GoogleLoginResponse {
  user: User
  tokens: Tokens
  is_new_user: boolean
}

export interface Option {
  id: number
  name: string
  slug: string
}

export interface GenerationOptions {
  room_types: Option[]
  design_styles: Option[]
  color_themes: Option[]
  room_sizes: Option[]
}

export interface GeneratedImage {
  id: number
  image: string
  created_at: string
}

export type GenerationStatus = "pending" | "processing" | "completed" | "failed"

export interface Generation {
  id: number
  input_image: string
  room_type: Option
  design_style: Option
  color_theme: Option
  room_size: Option
  num_samples: number
  prompt_used: string
  status: GenerationStatus
  error_message: string
  created_at: string
  completed_at: string | null
  images: GeneratedImage[]
}

export interface Plan {
  id: number
  name: string
  price: string
  duration_days: number
  description: string
}

export interface RazorpayOrder {
  order_id: string
  amount: number
  currency: string
  key_id: string
}

export interface SubscriptionStatus {
  is_subscribed: boolean
  credits: number
  subscription: {
    id: number
    plan: Plan
    status: string
    started_at: string
    expires_at: string
  } | null
}
