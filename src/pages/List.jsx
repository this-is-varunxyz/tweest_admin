import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

        if (response.data.success) {
          toast.success(response.data.message)
          await fetchList();
        } else {
          toast.error(response.data.message)
        }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-roviks-600'></div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-dark-900 mb-2'>Product Management</h1>
        <p className='text-dark-600'>Manage all products in your store</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Total Products</p>
              <p className='text-2xl font-bold text-dark-900'>{list.length}</p>
            </div>
            <div className='w-12 h-12 bg-roviks-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-roviks-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Men's Products</p>
              <p className='text-2xl font-bold text-dark-900'>{list.filter(item => item.category === 'Men').length}</p>
            </div>
            <div className='w-12 h-12 bg-dark-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Women's Products</p>
              <p className='text-2xl font-bold text-dark-900'>{list.filter(item => item.category === 'Women').length}</p>
            </div>
            <div className='w-12 h-12 bg-dark-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Bestsellers</p>
              <p className='text-2xl font-bold text-dark-900'>{list.filter(item => item.bestseller).length}</p>
            </div>
            <div className='w-12 h-12 bg-roviks-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-roviks-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className='card overflow-hidden'>
        <div className='px-6 py-4 border-b border-dark-100'>
          <h2 className='text-xl font-semibold text-dark-900'>All Products</h2>
        </div>

        {list.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className='text-lg font-medium text-dark-900 mb-2'>No products found</h3>
            <p className='text-dark-600'>Start adding products to see them here</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-dark-50'>
                  <th className='table-header'>Image</th>
                  <th className='table-header'>Name</th>
                  <th className='table-header'>Category</th>
                  <th className='table-header'>Sub Category</th>
                  <th className='table-header'>Price</th>
                  <th className='table-header'>Bestseller</th>
                  <th className='table-header'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-dark-100'>
                {list.map((item, index) => (
                  <tr key={index} className='hover:bg-dark-50 transition-colors duration-200'>
                    <td className='table-cell'>
                      <img 
                        className='w-16 h-16 object-cover rounded-lg' 
                        src={item.image[0]} 
                        alt={item.name} 
                      />
                    </td>
                    <td className='table-cell'>
                      <div>
                        <p className='font-medium text-dark-900'>{item.name}</p>
                        <p className='text-sm text-dark-500 line-clamp-2'>{item.description}</p>
                      </div>
                    </td>
                    <td className='table-cell'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'Men' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'Women' ? 'bg-pink-100 text-pink-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className='table-cell'>
                      <span className='text-sm text-dark-600'>{item.subCategory}</span>
                    </td>
                    <td className='table-cell'>
                      <span className='font-semibold text-roviks-600'>{currency}{item.price}</span>
                    </td>
                    <td className='table-cell'>
                      {item.bestseller ? (
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-roviks-100 text-roviks-800'>
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-100 text-dark-800'>
                          No
                        </span>
                      )}
                    </td>
                    <td className='table-cell'>
                      <div className='flex items-center space-x-2'>
                        <button className='p-2 text-dark-400 hover:text-roviks-600 hover:bg-roviks-50 rounded-lg transition-colors duration-200'>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => removeProduct(item._id)}
                          className='p-2 text-dark-400 hover:text-roviks-600 hover:bg-roviks-50 rounded-lg transition-colors duration-200'
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default List