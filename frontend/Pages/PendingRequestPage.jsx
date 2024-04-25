import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PendingRequestPage = () => {
  return (
    <div className='flex flex-1 flex-col  relative mx-10'>
        <div className='mt-12'>
          
        </div>
        <h1 className='text-3xl poppins mb-12'>
            <Link to={'/book'}>
                <FontAwesomeIcon className='mr-2' size='1x' icon={faArrowLeft}/>
            </Link>  
            Booking Status
        </h1>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg my-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="poppins text-md text-white bg-blue-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Artist
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Service Requested
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Cancel</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-semibold text-black whitespace-nowrap">
                            Ismail Izzani
                        </th>
                        <td className="px-6 py-4">
                            in review
                        </td>
                        <td className="px-6 py-4">
                            Event
                        </td>
                        <td className="px-6 py-4">
                            2 May 2024
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cancel</a>
                        </td>
                    </tr>

                    <tr className="bg-white border hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-semibold text-black whitespace-nowrap">
                            Yuna
                        </th>
                        <td className="px-6 py-4">
                            in review
                        </td>
                        <td className="px-6 py-4">
                            Ambassador
                        </td>
                        <td className="px-6 py-4">
                            28 Disember 2024
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cancel</a>
                        </td>
                    </tr>

                    <tr className="bg-white border hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-semibold text-black whitespace-nowrap">
                            Luqman Podlski
                        </th>
                        <td className="px-6 py-4">
                            in review
                        </td>
                        <td className="px-6 py-4">
                            Collaboration
                        </td>
                        <td className="px-6 py-4">
                            12 Jun 2024
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cancel</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default PendingRequestPage