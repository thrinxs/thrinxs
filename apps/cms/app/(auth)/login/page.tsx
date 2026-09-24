'use client'
import { useState } from 'react'
import { Button }   from '@thrinxs/ui'
import { Input }    from '@thrinxs/ui'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-brand-700">Thrinxs CMS</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="/forgot-password" className="text-brand-600 hover:underline">Forgot password?</a>
            </div>
            <Button className="w-full" size="lg">Sign in</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            No account?{' '}
            <a href="/signup" className="text-brand-600 hover:underline font-medium">Sign up free</a>
          </p>
        </div>
      </div>
    </div>
  )
}
