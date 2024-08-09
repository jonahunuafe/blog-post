import React from 'react'
import ProfileDetails from './ProfileDetails'

async function getUserData(params) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${apiUrl}/api/user/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const UserProfile = async ({params}) => {
    const profile = await getUserData(params)
  return (
    <div className='py-24 h-[100vh]'>
      <ProfileDetails profile={profile} params={params} />
    </div>
  )
}

export default UserProfile