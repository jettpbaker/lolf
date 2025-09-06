'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/utils/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = await authClient.signIn.email({
      email: email,
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
          <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your credentials
          </p>
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
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
          </div>
          <Button type='submit' className='w-full'>
            Sign in
          </Button>
        </form>
        <p className='text-sm text-muted-foreground'>
          Dont have an account?{' '}
          <Link className='underline underline-offset-4' href='/sign-up'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
