'use client'

import {
  createContext, useContext, useEffect,
  useState, useCallback, ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

interface AuthUser {
  id:       string
  name:     string
  email:    string
  role:     string
  plan:     string
  orgId?:   string
  orgSlug?: string
  orgName?: string
}

interface AuthContextType {
  user:     AuthUser | null
  loading:  boolean
  login:    (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup:   (data: Record<string, unknown>)   => Promise<{ success: boolean; message: string }>
  logout:   () => Promise<void>
  refresh:  () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router                = useRouter()

  const refresh = useCallback(async () => {
    try {
      const res  = await fetch('/api/auth/me')
      const data = await res.json()
      if (data.success) setUser(data.user)
      else              setUser(null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = async (email: string, password: string) => {
    const res  = await fetch('/api/auth/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.success) {
      setUser(data.user)
      router.push('/overview')
    }
    return { success: data.success, message: data.message }
  }

  const signup = async (formData: Record<string, unknown>) => {
    const res  = await fetch('/api/auth/signup', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(formData),
    })
    const data = await res.json()
    if (data.success) {
      setUser(data.user)
    }
    return { success: data.success, message: data.message }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
