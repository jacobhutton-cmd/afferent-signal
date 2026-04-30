export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: { Row: { id: string; first_name: string; zip_code: string; demographics: Json; premium_status: boolean; badges_count: number; }; };
      campaigns: { Row: { id: string; target_store: string; location: string; target_goal: number; current_progress: number; status: string; }; };
      product_requests: { Row: { id: string; user_id: string; location_zip: string; status: string; created_at: string; }; };
      transactions: { Row: { id: string; user_id: string | null; amount_cents: number; transaction_type: string; transaction_status: string; created_at: string; }; };
    };
  };
}
