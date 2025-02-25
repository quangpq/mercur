export type ReturnRequestStatus =
  | 'pending'
  | 'refunded'
  | 'withdrawn'
  | 'escalated'
  | 'canceled'

export type LineItem = {
  id: string
  line_item_id: string
  quantity: number
  return_request: OrderReturnRequestDTO
  return_request_id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export type OrderReturnRequestDTO = {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  customer_id: string
  customer_note: string
  vendor_reviewer_id: string | null
  vendor_reviewer_note: string | null
  vendor_review_date: Date | null
  admin_reviewer_id: string | null
  admin_reviewer_note: string | null
  admin_review_date: Date | null
  line_items: LineItem[]
  status: ReturnRequestStatus
}
