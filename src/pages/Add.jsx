import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

  const ImageUpload = ({ image, setImage, id, label }) => (
    <div className='space-y-2'>
      <label htmlFor={id} className='block cursor-pointer'>
        <div className={`w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center transition-all duration-200 ${
          image ? 'border-roviks-400 bg-roviks-50' : 'border-dark-300 hover:border-roviks-400 hover:bg-roviks-50'
        }`}>
          {image ? (
            <img 
              src={URL.createObjectURL(image)} 
              alt="Preview" 
              className='w-full h-full object-cover rounded-lg'
            />
          ) : (
            <div className='text-center'>
              <svg className="w-6 h-6 text-dark-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className='text-xs text-dark-500'>{label}</span>
            </div>
          )}
        </div>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id={id} hidden accept="image/*"/>
      </label>
    </div>
  )

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-dark-900 mb-2'>Add New Product</h1>
        <p className='text-dark-600'>Create a new product listing for your store</p>
      </div>

      <form onSubmit={onSubmitHandler} className='space-y-8'>
        {/* Image Upload Section */}
        <div className='card p-6'>
          <h2 className='text-xl font-semibold text-dark-900 mb-4'>Product Images</h2>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            <ImageUpload image={image1} setImage={setImage1} id="image1" label="Image 1" />
            <ImageUpload image={image2} setImage={setImage2} id="image2" label="Image 2" />
            <ImageUpload image={image3} setImage={setImage3} id="image3" label="Image 3" />
            <ImageUpload image={image4} setImage={setImage4} id="image4" label="Image 4" />
          </div>
        </div>

        {/* Basic Information */}
        <div className='card p-6'>
          <h2 className='text-xl font-semibold text-dark-900 mb-4'>Basic Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-dark-700 mb-2'>Product Name</label>
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                className='input-field' 
                type="text" 
                placeholder='Enter product name' 
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-dark-700 mb-2'>Product Price</label>
              <input 
                onChange={(e) => setPrice(e.target.value)} 
                value={price} 
                className='input-field' 
                type="number" 
                placeholder='0.00' 
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className='mt-6'>
            <label className='block text-sm font-medium text-dark-700 mb-2'>Product Description</label>
            <textarea 
              onChange={(e)=>setDescription(e.target.value)} 
              value={description} 
              className='input-field min-h-[120px] resize-none' 
              placeholder='Describe your product in detail...' 
              required
            />
          </div>
        </div>

        {/* Category & Classification */}
        <div className='card p-6'>
          <h2 className='text-xl font-semibold text-dark-900 mb-4'>Category & Classification</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='block text-sm font-medium text-dark-700 mb-2'>Category</label>
              <select 
                onChange={(e) => setCategory(e.target.value)} 
                value={category}
                className='input-field'
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-dark-700 mb-2'>Sub Category</label>
              <select 
                onChange={(e) => setSubCategory(e.target.value)} 
                value={subCategory}
                className='input-field'
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className='flex items-center space-x-3'>
              <input 
                onChange={() => setBestseller(prev => !prev)} 
                checked={bestseller} 
                type="checkbox" 
                id='bestseller'
                className='w-4 h-4 text-roviks-600 border-dark-300 rounded focus:ring-roviks-500 focus:ring-2'
              />
              <label className='text-sm font-medium text-dark-700 cursor-pointer' htmlFor='bestseller'>
                Mark as Bestseller
              </label>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className='card p-6'>
          <h2 className='text-xl font-semibold text-dark-900 mb-4'>Available Sizes</h2>
          <div className='flex flex-wrap gap-3'>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => 
                  prev.includes(size) 
                    ? prev.filter(item => item !== size) 
                    : [...prev, size]
                )}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  sizes.includes(size)
                    ? 'bg-roviks-600 text-white shadow-lg'
                    : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {sizes.length > 0 && (
            <p className='text-sm text-dark-600 mt-3'>
              Selected sizes: {sizes.join(', ')}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button 
            type="submit" 
            className='btn-primary text-lg px-8 py-4'
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add