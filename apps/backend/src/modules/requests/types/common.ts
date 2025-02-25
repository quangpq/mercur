export type RequestDTO = {
  id: string
  type: string
  data: Record<string, unknown>
  submitter_id: string
  reviewer_id: string | null
  reviewer_note: string | null
  status: 'pending' | 'accepted' | 'rejected'
  created_at: Date
  updated_at: Date
}
