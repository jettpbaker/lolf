'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/utils/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = await authClient.signUp.email({
      email: email,
      name: name,
      password: password,
    })

    if (data?.data?.user) {
      router.push('/p/')
    }
  }

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create account
          </h1>
          <p className='text-sm text-muted-foreground'>Sign up to continue</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='email'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='name'>Username</Label>
            <Input
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete='username'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
            />
          </div>
          <Button type='submit' className='w-full'>
            Sign up
          </Button>
        </form>
        <p className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link className='underline underline-offset-4' href='/sign-in'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
