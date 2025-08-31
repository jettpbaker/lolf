'use client';

import { authClient } from '@/utils/auth-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await authClient.signIn.email({
      email: email,
      password: password,
    });

    console.log(data);

    // Redirect to /p/ if sign-in was successful
    if (data?.data?.user) {
      router.push('/p/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email:</label>
        <br />
        <input
          id='email'
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: '1px solid #fff' }}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <br />
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: '1px solid #fff' }}
        />
      </div>
      <button
        type='submit'
        className='bg-white text-black rounded-md px-4 py-2 cursor-pointer'
      >
        Sign In
      </button>
    </form>
  );
}
