export type PlatformRole  = 'thrinxs_admin' | 'client' | 'affiliate'
export type OrgMemberRole = 'owner' | 'editor' | 'viewer'
export type ProjectStatus = 'building' | 'live' | 'paused' | 'suspended'
export type ContentStatus = 'draft' | 'published'
export type PlanTier      = 'free' | 'starter' | 'pro' | 'agency' | 'enterprise'
export type FieldType     = 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'file' | 'date' | 'select' | 'relation' | 'json'
export type ImageFormat   = 'webp' | 'png' | 'jpeg' | 'avif'

export interface User {
  id: string; email: string; name: string
  platformRole: PlatformRole; plan: PlanTier; createdAt: Date
}
export interface Organization {
  id: string; name: string; slug: string; plan: PlanTier; createdAt: Date
}
export interface FieldSchema {
  name: string; type: FieldType; required?: boolean
  label?: string; description?: string; options?: string[]; relation?: string
}
export interface Collection {
  id: string; projectId: string; name: string; slug: string
  fieldsSchema: FieldSchema[]; isSingleton: boolean
}
export interface Entry {
  id: string; collectionId: string; data: Record<string, unknown>
  status: ContentStatus; publishedAt?: Date; createdAt: Date; updatedAt: Date
}
export interface MediaFile {
  id: string; projectId: string; originalUrl: string; processedUrl: string
  thumbnailUrl?: string; format: string; width?: number; height?: number
  sizeKb: number; altText?: string; folder?: string; uploadedAt: Date
}
export interface ApiResponse<T> { data: T; message?: string; success: boolean }
export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; pageSize: number; totalPages: number
}
