import React, {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft,  faMagnifyingGlass, faUserCircle, faHeart, faMessage, faReply } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import FroumChatContainer from '../Components/FroumChatContainer'

const ForumDiscussionPage = () => {

    const {id} = useParams()
    const topicTitle = id.replace('%',' ');
    const [openModal, setOpenModal] = useState(false)
    const [forumDiscussion, setDiscussion] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [isLiked, setLike] = useState(false)
    
    const likeClicked = () => {
        setLike(!isLiked)
    }

    const createPostModal = () => {
        setOpenModal(!openModal)
    }

    const addPost = () => {
        setDiscussion(prevTopic => [...prevTopic, { topic: title, content: content }]);
        setTitle('');
        setContent('');
        setOpenModal(false); // Close the modal after adding the post
    }
    
    
    useEffect(() => {
        const reverse = forumDiscussion.reverse();
        setDiscussion(reverse)
    },[forumDiscussion])


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
        <h1 className='text-2xl'>{topicTitle}</h1>
        
        {/*-------------------Discussion topic -------------*/}
        <div className='my-10 py-4 border-y '> 

            <div className='flex gap-3'>
                <FontAwesomeIcon icon={faUserCircle} size='2x'/>
                <h1>Demo</h1>
            </div>
            <p className='py-4 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In maxime non, illum dolorum sint quaerat esse sequi? Possimus minus sint eaque debitis quidem, reprehenderit dolorum eos. Distinctio, ab. Similique, odio.</p>
            <div className='flex gap-4 items-center'>
                <FontAwesomeIcon className='w-6 h-6' icon={faHeart} color={isLiked ? 'red': ''} onClick={likeClicked}/>
                <FontAwesomeIcon className='w-6 h-6' icon={faMessage} onClick={createPostModal}/>
                <FontAwesomeIcon className='w-6 h-6' icon={faReply}/>
            </div>
        </div>


        {/*---------------------- Reply------------------------------------ */}

        <div className='ml-8'>

            {forumDiscussion.reverse().map(discussions => (
                <FroumChatContainer reply={discussions.content}/>
            ))}

            <FroumChatContainer reply={'Lorem ipsum, dolor sit amet consectetur adipisicing elit. In maxime non, illum dolorum sint quaerat esse sequi? Possimus minus sint eaque debitis quidem, reprehenderit dolorum eos. Distinctio, ab. Similique, odio.'}/>
            <FroumChatContainer reply={'Lorem ipsum, dolor sit amet consectetur adipisicing elit. In maxime non, illum dolorum sint quaerat esse sequi? Possimus minus sint eaque debitis quidem, reprehenderit dolorum eos. Distinctio, ab. Similique, odio.'}/>
            
            

        </div>
        
      </div>


      {openModal ? <div className='absolute w-screen h-screen top-0 left-0 backdrop-blur-sm flex justify-center items-center'>
          <div className=' w-[800px] h-[600px] bg-white rounded-md text-black'>
              <div className='flex flex-col px-6 py-3'>
                <label htmlFor="">Reply:</label>
                <textarea onChange={event => setContent(event.target.value)} className='border border-gray-600 px-4 py-2' name="" id="" cols="30" rows="15"></textarea>
              </div>

              <div className='px-6 flex gap-10'>
                <button onClick={addPost} className='px-4 py-2 border-4 border-red-400 rounded-md'>Create</button>
                <button onClick={createPostModal} className='px-5 py-3 rounded-md bg-red-400 text-white'>Cancel</button>
              </div>
          </div>
      </div> : ''}

    </div>
  )
}

export default ForumDiscussionPage