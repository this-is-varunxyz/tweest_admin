import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-3 sm:px-4'>
      <div className='w-full max-w-sm sm:max-w-md'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
          <div className='flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6'>
            <div className='w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center'>
              <span className='text-white font-display font-bold text-2xl sm:text-3xl'>T</span>
            </div>
            <span className='text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-black'>Tweest</span>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-black mb-2'>Admin Panel</h1>
          <p className='text-gray-600 text-sm sm:text-base'>
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Form */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100'>
          <form onSubmit={onSubmitHandler} className='space-y-4 sm:space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                className='input-field' 
                type="email" 
                placeholder='admin@Tweest.com' 
                required 
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} 
                className='input-field' 
                type="password" 
                placeholder='Enter your password' 
                required 
              />
            </div>

            <button 
              type="submit" 
              className='w-full btn-primary text-base sm:text-lg py-3 sm:py-4'
            >
              Sign In to Admin Panel
            </button>
          </form>

          {/* Security Note */}
          <div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-start space-x-2 sm:space-x-3'>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className='text-xs sm:text-sm text-gray-600'>
                <p className='font-medium text-gray-700 mb-1'>Secure Access</p>
                <p>This is a protected admin area. Only authorized personnel can access this panel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login