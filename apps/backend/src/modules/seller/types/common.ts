import { PayoutAccountDTO } from '#/modules/payout/types'

export type SellerDTO = {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  name: string
  description: string | null
  handle: string
  photo: string | null
  members?: Partial<MemberDTO>[]
}

export interface SellerUpdateDTO extends Omit<SellerDTO, 'members'> {
  members?: string[]
}

export type SellerWithPayoutAccountDTO = SellerDTO & {
  payout_account: PayoutAccountDTO
}

export enum MemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member'
}

export type MemberDTO = {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
  seller_id: string
  role: MemberRole
  email: string | null
  name: string
  bio: string | null
  photo: string | null
  phone: string | null
  seller: SellerDTO
}

export type MemberInviteDTO = {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
  seller_id: string
  email: string
  role: MemberRole
  // seller: SellerDTO
  token: string
  expires_at: Date
  accepted: boolean
}
