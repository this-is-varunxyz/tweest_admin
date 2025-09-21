import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const menuItems = [
    {
      path: "/add",
      name: "Add Products",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      path: "/list",
      name: "Product List",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      path: "/orders",
      name: "Orders",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ]

  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-200'>
      <div className='p-4 sm:p-6'>
        {/* Brand */}
        <div className='flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8'>
          <div className='w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center'>
            <span className='text-white font-display font-bold text-lg sm:text-xl'>T</span>
          </div>
          <div>
            <span className='text-lg sm:text-xl font-display font-bold text-black'>Tweest</span>
            <span className='block text-xs sm:text-sm text-gray-500 font-medium'>Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className='space-y-2'>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-50 text-black border-r-2 border-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`
              }
            >
              <span className='flex-shrink-0'>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className='mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg'>
          <h3 className='text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3'>Quick Stats</h3>
          <div className='space-y-1 sm:space-y-2 text-xs text-gray-600'>
            <div className='flex justify-between'>
              <span>Products</span>
              <span className='font-medium'>Active</span>
            </div>
            <div className='flex justify-between'>
              <span>Orders</span>
              <span className='font-medium'>Pending</span>
            </div>
            <div className='flex justify-between'>
              <span>Revenue</span>
              <span className='font-medium text-black'>Growing</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-100 rounded-lg'>
          <h3 className='text-xs sm:text-sm font-medium text-gray-700 mb-2'>Need Help?</h3>
          <p className='text-xs text-gray-600 mb-2 sm:mb-3'>
            Check our admin documentation or contact support
          </p>
          <button className='w-full text-xs bg-black text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-gray-800 transition-colors duration-200'>
            Get Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar