import React from 'react'
import { auth } from '@clerk/nextjs'

const ProfilePage = () => {
  const { userId } = auth();

  console.log(userId)
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage