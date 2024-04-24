import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping , faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PaymentPage = () => {
  return (
    <div className='px-[8%] josefin'>
        <Link to={'/shop'}><FontAwesomeIcon icon={faArrowLeft} size='2x'/></Link>
        <div className='w-full flex flex-col xl:flex-row gap-8'>

            <div className='relative w-full xl:w-[50%]'>
                <h1 className='text-2xl py-4'>Your Cart</h1>
                <ul className=' text-black rounded-md overflow-hidden bg-white'>
                    <li className='px-4 py-2 bg-white border-b border-gray-400'>
                        <div className='flex justify-between'>
                            <h1>Product name</h1>
                            <h1 className='text-gray-600'>RM120</h1>
                        </div>
                        <p className='text-gray-700'>Brief description</p>
                    </li>
                    <li className='px-4 py-2 bg-white border-b border-gray-400'>
                        <div className='flex justify-between'>
                            <h1>Product name</h1>
                            <h1 className='text-gray-600'>RM120</h1>
                        </div>
                        <p className='text-gray-700'>Brief description</p>
                    </li>
                    <li className='px-4 py-2 bg-white border-b border-gray-400'>
                        <div className='flex justify-between'>
                            <h1>Product name</h1>
                            <h1 className='text-gray-600'>RM120</h1>
                        </div>
                        <p className='text-gray-700'>Brief description</p>
                    </li>

                    <li className='px-4 py-4 flex justify-between'>
                        <h1>Total(RM)</h1>
                        <h1><strong>RM360</strong></h1>
                    </li>
                </ul>

                <div className='flex my-4 p-2 border rounded-md'>
                    <input className='flex flex-1  px-4 py-2 rounded-md' type="text" placeholder='Promo code'/>
                    <button className='bg-gray-600 px-4 rounded-md'>Redeem</button>
                </div>
            </div>

            <div className='relative w-full '>
                <form className='w-full p-4 flex flex-col gap-4' action="">
                    <h1 className='text-3xl'>Billing Address</h1>
                    <div className='w-full flex gap-12'>
                        <div className='flex flex-1 flex-col'>
                            <label htmlFor="">First name</label>
                            <input className='px-4 py-2 rounded-md' type="text" required/>
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <label htmlFor="">Last name</label>
                            <input className='px-4 py-2 rounded-md' type="text" required/>
                        </div>   
                    </div>

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">Email</label>
                        <input className='px-4 py-2 rounded-md' type="text" required/>
                    </div>  

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">Address</label>
                        <input className='px-4 py-2 rounded-md' type="text" required/>
                    </div>  

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">Address2 (Optional)</label>
                        <input className='px-4 py-2 rounded-md' type="text" />
                    </div>  

                    <div className='flex flex-col md:flex-row  gap-4'>
                        <div className='flex flex-1 flex-col'>
                            <label htmlFor="">Postcode</label>
                            <input className='px-4 py-2 rounded-md' type="number" required/>
                        </div> 

                        <div className='flex flex-1 flex-col'>
                            <label htmlFor="">State</label>
                            <select className='text-black px-4 py-3  rounded-md' required>
                                <option value="Malaysia">Kuala Lumpur</option> 
                                <option value="Malaysia">Kedah</option> 
                                <option value="Malaysia">Johor</option> 
                                <option value="Malaysia">Sabah</option>   
                            </select>
                        </div> 

                        <div className='flex flex-1 flex-col'>
                            <label htmlFor="">Country</label>
                            <select className='text-black px-4 py-3  rounded-md' required>
                                <option value="Malaysia">Malaysia</option>   
                            </select>
                        </div> 
                    </div>

                    <hr />

                    <h1 className='text-3xl'>Payment</h1>

                    <div className='text-xl'>
                        <div className='flex items-center gap-4'>
                            <input type='radio' value={'Credit Card'} name='payment-type'/>
                            <label htmlFor="">Credit Card</label>  
                        </div>
                        <div className='flex items-center gap-4'>
                            <input type='radio' value={'Debit Card'} name='payment-type'/>
                            <label htmlFor="">Debit Card</label>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input type='radio' value={'Tng'} name='payment-type'/>
                            <label htmlFor="">TouchnGo</label>
                        </div>    
                    </div>

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">Name on Card</label>
                        <input className='px-4 py-2 rounded-md' type="text" required/>
                        <div className='text-gray-500'>Full name as display on card</div>
                    </div>  

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">Credit card number</label>
                        <input className='px-4 py-2 rounded-md' type="text" required/>
                    </div>  

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">Expiration</label>
                        <input className='px-4 py-2 rounded-md' type="text" required/>
                    </div>  

                    <div className='flex flex-1 flex-col'>
                        <label htmlFor="">CVV</label>
                        <input className='px-4 py-2 rounded-md' type="text" required/>
                    </div>  

                    <button className='w-max my-4 px-4 py-3 bg-red-500 rounded-md'>Continue to checkout</button>

                </form>
            </div>
            

        </div>
    </div>
  )
}

export default PaymentPage