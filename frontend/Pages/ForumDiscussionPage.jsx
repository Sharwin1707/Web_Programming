import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft,  faMagnifyingGlass, faUserCircle, faHeart, faMessage, faReply } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'

const ForumDiscussionPage = () => {

    const {id} = useParams()
    const title = id.replace('%',' ');


  return (
    <div className='px-[12%] py-10'>

        <div className='flex justify-between'>
            <div className='flex items-center gap-8'>
                <Link to={'/forum'}><FontAwesomeIcon icon={faArrowLeft} size='2x'/></Link>
                <div className='w-[400px] p-2  bg-white rounded-full'>
                    <FontAwesomeIcon className='px-2' icon={faMagnifyingGlass} color='gray'/>
                    <input className='border border-white' type='text' placeholder='Search..'/>
                </div>
            </div>         
        </div>

        
      <div className='py-10'>
        <h1 className='text-2xl'>{title}</h1>
        
        {/*-------------------Discussion topic -------------*/}
        <div className='my-10 py-4 border-y '> 

            <div className='flex gap-3'>
                <FontAwesomeIcon icon={faUserCircle} size='2x'/>
                <h1>Demo</h1>
            </div>
            <p className='py-4 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In maxime non, illum dolorum sint quaerat esse sequi? Possimus minus sint eaque debitis quidem, reprehenderit dolorum eos. Distinctio, ab. Similique, odio.</p>
            <div className='flex gap-4 items-center'>
                <FontAwesomeIcon className='w-6 h-6' icon={faHeart}/>
                <FontAwesomeIcon className='w-6 h-6' icon={faMessage}/>
                <FontAwesomeIcon className='w-6 h-6' icon={faReply}/>
            </div>
        </div>


        {/*---------------------- Reply------------------------------------ */}

        <div className='ml-8'>
            <div className='my-10 py-4 bg-blue-gray-300 p-3 rounded-md'> 

                <div className='flex gap-3'>
                    <FontAwesomeIcon icon={faUserCircle} size='2x'/>
                    <h1>Ali</h1>
                </div>
                <p className='py-4 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In maxime non, illum dolorum sint quaerat esse sequi? Possimus minus sint eaque debitis quidem, reprehenderit dolorum eos. Distinctio, ab. Similique, odio.</p>
                <div className='flex gap-4 items-center'>
                    <FontAwesomeIcon className='w-6 h-6' icon={faHeart}/>
                    <FontAwesomeIcon className='w-6 h-6' icon={faMessage}/>
                    <FontAwesomeIcon className='w-6 h-6' icon={faReply}/>
                </div>
            </div>

            <div className='my-10 py-4 bg-blue-gray-300 p-3 rounded-md'> 

                <div className='flex gap-3'>
                    <FontAwesomeIcon icon={faUserCircle} size='2x'/>
                    <h1>Abu</h1>
                </div>
                <p className='py-4 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In maxime non, illum dolorum sint quaerat esse sequi? Possimus minus sint eaque debitis quidem, reprehenderit dolorum eos. Distinctio, ab. Similique, odio.</p>
                <div className='flex gap-4 items-center'>
                    <FontAwesomeIcon className='w-6 h-6' icon={faHeart}/>
                    <FontAwesomeIcon className='w-6 h-6' icon={faMessage}/>
                    <FontAwesomeIcon className='w-6 h-6' icon={faReply}/>
                </div>
            </div>
        </div>
        
      </div>

    </div>
  )
}

export default ForumDiscussionPage