import { headers } from 'next/headers';
import { auth } from '@/utils/auth';

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Profile</h1>
        <p className='text-muted-foreground'>You are not signed in.</p>
        <a href='/sign-in' className='underline'>
          Sign in
        </a>
      </div>
    );
  }

  const user = session.user;
  const createdAt = (user as any)?.createdAt
    ? new Date((user as any).createdAt).toLocaleString()
    : undefined;

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Your Profile</h1>
      <div className='rounded-md border p-4 bg-card text-card-foreground'>
        <div className='grid gap-2'>
          <div>
            <span className='font-medium'>Name:</span> {user?.name ?? '—'}
          </div>
          <div>
            <span className='font-medium'>Email:</span> {user?.email ?? '—'}
          </div>
          <div>
            <span className='font-medium'>User ID:</span> {user?.id ?? '—'}
          </div>
          {createdAt && (
            <div>
              <span className='font-medium'>Joined:</span> {createdAt}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
