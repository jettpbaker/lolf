'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';

export async function getStarted() {
  console.log('Hello!');

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect('/sign-in');
  return redirect('/p');
}
