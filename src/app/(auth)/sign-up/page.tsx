'use client';

import { authClient } from '@/utils/auth-client';
import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await authClient.signUp.email({
      email: email,
      name: name,
      password: password,
    });

    console.log(data);
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
        <label htmlFor='name'>Username:</label>
        <br />
        <input
          id='name'
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        Sign Up
      </button>
    </form>
  );
}
