import React from 'react'
import SignupForm from '@/components/SignupForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Signup = async () => {
  const session = await getServerSession(authOptions);

  if(session) redirect("/blog");

  return (
    <div className='py-20 h-[100vh]'>
      <SignupForm />
    </div>
  )
}

export default Signup