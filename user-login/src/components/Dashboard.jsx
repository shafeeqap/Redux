import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

const Dashboard = () => {
  return (
    <div className='flex justify-between px-5'>
        <Sidebar/>
        <Content/>
    </div>
  )
}

export default Dashboard