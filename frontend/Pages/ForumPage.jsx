import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMagnifyingGlass, faUsers, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ForumPage = () => {
  return (
    <div className='px-[10%] josefin py-10'>

      <div className='flex justify-between'>
        <div className='w-[400px] p-2  bg-white rounded-full flex flex-nowrap'>
          <FontAwesomeIcon className='px-2' icon={faMagnifyingGlass} color='gray'/>
          <input className='border border-white' type='text' placeholder='Search..'/>
        </div>

        <div>
          <select className='px-4 py-2 rounded-md text-black focus:outline-none' name="" id="">
            <option value="">Music</option>
            <option value="">Artist</option>
            <option value="">Live</option>
            <option value="">Announcement and News</option>
            <option value="">Fan</option>
          </select>
        </div>
      </div>
      


{/* ---------------Trending discussion--------------------------- */}
      <h1 className='mt-16 mb-6 text-2xl josefin'>Trending Now</h1>
      <div class="flex flex-col m-auto p-auto josefin">
        <div class="flex overflow-x-scroll pb-2 hide-scroll-bar mb-10">
          <div
            class="flex flex-nowrap text-black"
          >
            <div class="inline-block px-3 ">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <h1>Trending 1</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1>Trending 2</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1>Trending 3</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1>Trending 4</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1>Trending 5</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <h1>Trending 6</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <h1>Trending 1</h1>
              </div>
            </div>
            <div class="inline-block px-3">
              <div class="w-64 h-44 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <h1>Trending 1</h1>   
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*-------------------- Top discussion------------------------------------- */}

      <div className='flex gap-[5%]'>
        <div className='w-[60%] flex flex-col gap-4'>
          <div className='h-[120px]  border border-white p-2'>
            <Link to={'/forum/detail'}><h1 className='text-xl font-semibold josefin text-blue-500 underline'>Discussion 1</h1></Link>
            <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa eius vel dolorem sed quia, hic ullam quae quasi eligendi provident dignissimos exercitationem sunt consequuntur temporibus recusandae quod optio reiciendis?</p>
          </div>

          <div className='h-[120px]  border border-white p-2'>
            <Link><h1 className='text-xl font-semibold josefin text-blue-500 underline'>Discussion 1</h1></Link>
            <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa eius vel dolorem sed quia, hic ullam quae quasi eligendi provident dignissimos exercitationem sunt consequuntur temporibus recusandae quod optio reiciendis?</p>
          </div>

          <div className='h-[120px]  border border-white p-2'>
            <Link><h1 className='text-xl font-semibold josefin text-blue-500 underline'>Discussion 1</h1></Link>
            <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa eius vel dolorem sed quia, hic ullam quae quasi eligendi provident dignissimos exercitationem sunt consequuntur temporibus recusandae quod optio reiciendis?</p>
          </div>

          <div className='h-[120px]  border border-white p-2'>
            <Link><h1 className='text-xl font-semibold josefin text-blue-500 underline'>Discussion 1</h1></Link>
            <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa eius vel dolorem sed quia, hic ullam quae quasi eligendi provident dignissimos exercitationem sunt consequuntur temporibus recusandae quod optio reiciendis?</p>
          </div>

          <div className='h-[120px]  border border-white p-2'>
            <h1 className='text-xl font-semibold josefin text-blue-500 underline'>Discussion 5</h1>
            <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa eius vel dolorem sed quia, hic ullam quae quasi eligendi provident dignissimos exercitationem sunt consequuntur temporibus recusandae quod optio reiciendis?</p>
          </div>
        </div>

        <div className='w-[35%] flex flex-col gap-8'>
          <div className='border p-2'>
              Top Comunities

              <div className='flex gap-3 my-2'>
                  <FontAwesomeIcon className='border rounded-full p-1' icon={faUsers}/>
                  <Link className='hover:underline'><h1>Community 1</h1></Link>
              </div>

              <div className='flex gap-3 my-2'>
                  <FontAwesomeIcon className='border rounded-full p-1' icon={faUsers}/>
                  <Link className='hover:underline'><h1>Community 2</h1></Link>
              </div>

              <div className='flex gap-3 my-2'>
                  <FontAwesomeIcon className='border rounded-full p-1' icon={faUsers}/>
                  <Link className='hover:underline'><h1>Community 3</h1></Link>
              </div>

              <div className='flex gap-3 my-2'>
                  <FontAwesomeIcon className='border rounded-full p-1' icon={faUsers}/>
                  <Link className='hover:underline'><h1>Community 4</h1></Link>
              </div>

              <div className='flex gap-3 my-2'>
                  <FontAwesomeIcon className='border rounded-full p-1' icon={faUsers}/>
                  <Link className='hover:underline'><h1>Community 5</h1></Link>
              </div>
          </div>

          <div>
            <div className='border p-2'>
                Top Search

                <div className='flex gap-3 my-2'>
                    <FontAwesomeIcon className='border rounded-full p-1' icon={faHashtag}/>
                    <Link className='hover:underline'><h1>Community 1</h1></Link>
                </div>

                <div className='flex gap-3 my-2'>
                    <FontAwesomeIcon className='border rounded-full p-1' icon={faHashtag}/>
                    <Link className='hover:underline'><h1>Community 2</h1></Link>
                </div>

                <div className='flex gap-3 my-2'>
                    <FontAwesomeIcon className='border rounded-full p-1' icon={faHashtag}/>
                    <Link className='hover:underline'><h1>Community 3</h1></Link>
                </div>

                <div className='flex gap-3 my-2'>
                    <FontAwesomeIcon className='border rounded-full p-1' icon={faHashtag}/>
                    <Link className='hover:underline'><h1>Community 4</h1></Link>
                </div>

                <div className='flex gap-3 my-2'>
                    <FontAwesomeIcon className='border rounded-full p-1' icon={faHashtag}/>
                    <Link className='hover:underline'><h1>Community 5</h1></Link>
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ForumPage