import React from 'react'
import Upload from '../components/Upload'
import UserInfo from '../components/UserInfo'
import UserImages from '../components/UserImages'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-2'>
      <UserInfo />
      <Upload />
      <UserImages />
    </div>
  )
}

export default Dashboard