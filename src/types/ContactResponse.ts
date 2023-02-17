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

export interface ContactResponse {
  id: number
  name: string
  first_name: string
  last_name: string
  responsible_user_id: number
  group_id: number
  created_by: number
  updated_by: number
  created_at: number
  updated_at: number
  closest_task_at?: any
  is_deleted: boolean
  is_unsorted: boolean
  custom_fields_values?: any
  account_id: number
  _links: Links
  _embedded: Embedded
}
