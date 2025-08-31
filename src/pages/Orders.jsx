import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency, formatPrice } from '../App'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Order status updated successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-800'
      case 'Packing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Out for delivery':
        return 'bg-orange-100 text-orange-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-dark-100 text-dark-800'
    }
  }

  const getPaymentStatusColor = (payment) => {
    return payment ? 'bg-green-100 text-green-800' : 'bg-roviks-100 text-roviks-800'
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

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
        <h1 className='text-3xl font-bold text-dark-900 mb-2'>Order Management</h1>
        <p className='text-dark-600'>Track and manage all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Total Orders</p>
              <p className='text-2xl font-bold text-dark-900'>{orders.length}</p>
            </div>
            <div className='w-12 h-12 bg-roviks-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-roviks-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Pending</p>
              <p className='text-2xl font-bold text-dark-900'>{orders.filter(order => order.status === 'Order Placed').length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Shipped</p>
              <p className='text-2xl font-bold text-dark-900'>{orders.filter(order => order.status === 'Shipped').length}</p>
            </div>
            <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className='card p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-dark-600'>Delivered</p>
              <p className='text-2xl font-bold text-dark-900'>{orders.filter(order => order.status === 'Delivered').length}</p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className='card p-12 text-center'>
          <div className='w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className='text-lg font-medium text-dark-900 mb-2'>No orders found</h3>
          <p className='text-dark-600'>Orders will appear here once customers start placing them</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {orders.map((order, index) => (
            <div key={index} className='card p-6'>
              <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
                
                {/* Order Icon & Items */}
                <div className='lg:col-span-2'>
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 bg-roviks-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <svg className="w-6 h-6 text-roviks-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-dark-900 mb-2'>Order Items</h4>
                      <div className='space-y-1'>
                        {order.items.map((item, itemIndex) => (
                          <p key={itemIndex} className='text-sm text-dark-600'>
                            {item.name} × {item.quantity} 
                            <span className='ml-2 px-2 py-1 bg-dark-100 text-dark-700 text-xs rounded'>
                              {item.size}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h4 className='font-medium text-dark-900 mb-2'>Customer Details</h4>
                  <div className='space-y-1 text-sm text-dark-600'>
                    <p className='font-medium'>{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}</p>
                    <p>{order.address.country} {order.address.zipcode}</p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h4 className='font-medium text-dark-900 mb-2'>Order Details</h4>
                  <div className='space-y-1 text-sm text-dark-600'>
                    <p>Items: {order.items.length}</p>
                    <p>Method: {order.paymentMethod}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    <div className='mt-2'>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment)}`}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount & Status */}
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium text-dark-900 mb-2'>Total Amount</h4>
                    <p className='text-2xl font-bold text-roviks-600'>{formatPrice(order.amount)}</p>
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-dark-700 mb-2'>Order Status</label>
                    <select 
                      onChange={(event) => statusHandler(event, order._id)} 
                      value={order.status} 
                      className='input-field text-sm'
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <div className='mt-2'>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders