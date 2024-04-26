import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft,  faMagnifyingGlass, faUserCircle, faHeart, faMessage, faReply } from '@fortawesome/free-solid-svg-icons'


const FroumChatContainer = ({reply}) => {

    const [isLiked, setLike] = useState(false)

    const likeClicked = () => {
        setLike(!isLiked)
    }

  return (
    <div>
        <div className='my-10 py-4 bg-blue-gray-300 p-3 rounded-md'>
            <div className='flex gap-3'>
                <FontAwesomeIcon icon={faUserCircle} size='2x'/>
                <h1>Abu</h1>
            </div>
            <p className='py-4 '>{reply}</p>
            <div className='flex gap-4 items-center'>
                <FontAwesomeIcon className='w-6 h-6' icon={faHeart} color={isLiked ? 'red': ''} onClick={likeClicked}/>
                <FontAwesomeIcon className='w-6 h-6' icon={faMessage}/>
                <FontAwesomeIcon className='w-6 h-6' icon={faReply}/>
            </div>
        </div>
    </div>
  )
}

export default FroumChatContainer