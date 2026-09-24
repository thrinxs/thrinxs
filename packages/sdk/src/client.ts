import type { Entry, MediaFile, PaginatedResponse } from '@thrinxs/types'

export interface ThrinxsClientOptions { projectId: string; apiKey: string; baseUrl?: string }
export interface FetchEntriesOptions  { status?: 'draft' | 'published'; page?: number; pageSize?: number; orderBy?: string }

export class ThrinxsClient {
  private projectId: string
  private apiKey:    string
  private baseUrl:   string

  constructor(options: ThrinxsClientOptions) {
    this.projectId = options.projectId
    this.apiKey    = options.apiKey
    this.baseUrl   = options.baseUrl ?? 'https://api.thrinxs.com.ng/v1'
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Project-Id':  this.projectId,
        'Content-Type':  'application/json',
        ...init?.headers,
      },
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message ?? `Request failed: ${res.status}`)
    }
    return res.json()
  }

  collection(slug: string) {
    return {
      getAll:    (options: FetchEntriesOptions = {}) => {
        const params = new URLSearchParams(Object.entries(options).filter(([,v]) => v !== undefined).map(([k,v]) => [k, String(v)]))
        return this.request<PaginatedResponse<Entry>>(`/content/${slug}?${params}`)
      },
      getOne:    (id: string)        => this.request<Entry>(`/content/${slug}/${id}`),
      getBySlug: (s: string)         => this.request<Entry>(`/content/${slug}/slug/${s}`),
    }
  }

  media() {
    return {
      getAll: ()           => this.request<PaginatedResponse<MediaFile>>('/media'),
      getOne: (id: string) => this.request<MediaFile>(`/media/${id}`),
    }
  }
}
