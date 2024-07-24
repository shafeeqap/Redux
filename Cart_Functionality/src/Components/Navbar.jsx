import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black text-white flex justify-between items-center p-3 px-24'>
        <Link to="/" className='text-2xl font-semibold'> e-Shop</Link>
        <Link to="/cart" className=''>Cart</Link>
    </div>
  )
}

export default Navbar