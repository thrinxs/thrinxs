'use client'
import { useState } from 'react'
import { Button }   from '@thrinxs/ui'
import { Input }    from '@thrinxs/ui'

export default function SignupPage() {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-brand-700">Thrinxs CMS</h1>
            <p className="text-gray-500 text-sm mt-1">Create your free account</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <Input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input type="password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" size="lg">Create account</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-brand-600 hover:underline font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}
