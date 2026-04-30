import { getUserAction } from '@/app/actions';
import { redirect } from 'next/navigation';
import WelcomeClient from './WelcomeClient';

export default async function WelcomePage() {
  const user = await getUserAction();
  
  if (!user) {
    redirect('/login');
  }

  return <WelcomeClient user={user} />;
}
