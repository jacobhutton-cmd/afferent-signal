export type RequestStatus = 'pending' | 'under_review' | 'approved' | 'rejected'
export type CampaignStatus = 'active' | 'fulfilled' | 'closed'
export type TransactionType = 'premium_donation' | 'data_brokerage_payout' | 'refund'

export interface User {
  id: string
  first_name: string
  zip_code: string
  premium_status: boolean
  badges_count: number
  age_range: string | null
  household_income: string | null
  household_size: string | null
  shopping_frequency: string | null
  demographics: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  upc: string | null
  name: string
  brand: string | null
  description: string | null
  verified: boolean
  created_at: string
  updated_at: string
}

export interface ProductRequest {
  id: string
  user_id: string
  product_id: string | null
  location_zip: string
  status: RequestStatus
  created_at: string
  updated_at: string
  products?: Product
}

export interface Campaign {
  id: string
  product_id: string
  target_store: string
  location_zip: string
  target_goal: number
  current_progress: number
  status: CampaignStatus
  created_at: string
  updated_at: string
  products?: Product
}
