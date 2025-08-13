import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-3 sm:py-4'>
          
          {/* Brand */}
          <div className='flex items-center space-x-2 sm:space-x-3'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center'>
              <span className='text-white font-display font-bold text-lg sm:text-xl'>R</span>
            </div>
            <div>
              <span className='text-lg sm:text-xl font-display font-bold text-black'>Roviks</span>
              <span className='block text-xs sm:text-sm text-gray-500 font-medium'>Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <div className='hidden md:flex items-center space-x-6 lg:space-x-8'>
            <a href="#" className='text-gray-600 hover:text-black transition-colors duration-200 font-medium text-sm lg:text-base'>
              Dashboard
            </a>
            <a href="#" className='text-gray-600 hover:text-black transition-colors duration-200 font-medium text-sm lg:text-base'>
              Analytics
            </a>
            <a href="#" className='text-gray-600 hover:text-black transition-colors duration-200 font-medium text-sm lg:text-base'>
              Reports
            </a>
          </div>

          {/* User Menu */}
          <div className='flex items-center space-x-3 sm:space-x-4'>
            <div className='hidden md:flex items-center space-x-2 text-sm text-gray-600'>
              <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className='text-xs sm:text-sm'>Admin User</span>
            </div>
            
            <button 
              onClick={()=>setToken('')} 
              className='bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center space-x-2'
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar