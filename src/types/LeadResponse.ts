export interface Self {
  href: string
}

export interface Links {
  self: Self
}

export interface Embedded {
  tags: any[]
  companies: any[]
}

export interface LeadResponse {
  id: number
  name: string
  price: number
  responsible_user_id: number
  group_id: number
  status_id: number
  pipeline_id: number
  loss_reason_id?: any
  created_by: number
  updated_by: number
  created_at: number
  updated_at: number
  closed_at?: any
  closest_task_at?: any
  is_deleted: boolean
  custom_fields_values?: any
  score?: any
  account_id: number
  labor_cost?: any
  _links: Links
  _embedded: Embedded
}
