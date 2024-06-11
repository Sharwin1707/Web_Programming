import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faUserCircle,
  faHeart,
  faMessage,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import FroumChatContainer from "../Components/FroumChatContainer";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider";

const ForumDiscussionPage = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [mainTopic, setMainTopic] = useState({});
  const [forumDiscussion, setDiscussion] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {token} = useStateContext()

  const [isLiked, setLike] = useState(false);
  const {user} = useStateContext()

  useEffect(() => {
    const fetchTopic = async () => {
      await axios.get(`http://localhost:3000/post/${id}`).then((response) => {
        if(response.status === 200){
          setMainTopic(response.data)
          console.log(response.data)
        }
      })
    }

    const fetchComments = async () => {
      await axios.get(`http://localhost:3000/comment/${id}`).then((response) => {
        if(response.status === 200){
          setDiscussion(response.data)
        }
      });
    };
    
    fetchTopic();
    fetchComments();
  },[id]);

  const likeClicked = () => {
    setLike(!isLiked);
  };

  const createPostModal = () => {
    setOpenModal(!openModal);
  };

  const addPost = async () => {
    try {
      const newComment = { topicId: id, username: user.username, reply: content }; // Adjust the username as needed
      await axios.post("http://localhost:3000/comment", newComment);
      setDiscussion((prevDiscussion) => [
        ...prevDiscussion,
        newComment,
      ]);
      setContent("");
      setOpenModal(false); // Close the modal after adding the post
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="px-[12%] py-10">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <Link to={token ? "/forum" : "/guest/forum" }>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" color="white" />
          </Link>
          {/* <div className="w-[400px] p-2  bg-white rounded-full">
            <FontAwesomeIcon
              className="px-2"
              icon={faMagnifyingGlass}
              color="gray"
            />
            <input
              className="border border-white"
              type="text"
              placeholder="Search.."
            />
          </div> */}
        </div>
      </div>

      <div className="py-10 bg-white p-5"> 
      <h1 className="text-2xl bg-red-400 h-20 text-white  p-2 rounded-lg flex items-center justify-center font-bold josefin"> 
  {mainTopic.title}
</h1>

        {/*-------------------Discussion topic -------------*/}
        <div className="py-4 my-10 p-2 rounded-lg relative">
  <div className="absolute top-0 left-0 right-0 border-t border-gray-800"></div>
  <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800"></div>
  <div className="py-4 my-10  bg-white p-2 rounded-lg">
          <div className="flex gap-3 text-gray-800">
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
            <div>
              <h1>{mainTopic.username}</h1>
              <p className="text-gray-800 font-semibold josefin"><small>post on {new Date(mainTopic.postAt).toLocaleDateString()}</small> </p>
            </div>
            
          </div>
          <p className="py-4 font-semibold josefin text-gray-800 ">
            {mainTopic.content}
          </p>
          <div className="flex gap-4 items-center text-gray-800">
            <FontAwesomeIcon
              className="w-6 h-6"
              icon={faHeart}
              color={isLiked ? "red" : ""}
              onClick={likeClicked}
            />
            <FontAwesomeIcon
              className="w-6 h-6"
              icon={faMessage}
              onClick={createPostModal}
            />
            <FontAwesomeIcon className="w-6 h-6" icon={faReply} />
          </div>
        </div>
</div>


        {/*---------------------- Reply------------------------------------ */}

        <div className="ml-8 font-semibold josefin text-white"> 
          {forumDiscussion.map((discussion) => (
            <FroumChatContainer 
            key={discussion._id}
            reply={discussion.reply}
            username={discussion.username}
            date={discussion.Date} 
            />
          ))}
        </div>
      </div>


      {/*---------------------- new Reply------------------------------------ */}
      {openModal && (
        <div className="absolute w-screen h-screen top-0 left-0 backdrop-blur-sm flex justify-center items-center font-semibold josefin">
          <div className=" w-[800px] h-[600px] bg-white rounded-md text-black">
            <div className="flex flex-col px-6 py-3">
              <label htmlFor="">Reply:</label>
              <textarea
                onChange={(event) => setContent(event.target.value)}
                className="border border-gray-600 px-4 py-2"
                name=""
                id=""
                cols="30"
                rows="15"
                value={content}
              ></textarea>
            </div>

            <div className="px-6 flex gap-10">
              <button
                onClick={addPost}
                className="px-4 py-2 border-4 border-red-400 rounded-md"
              >
                Create
              </button>
              <button
                onClick={createPostModal}
                className="px-5 py-3 rounded-md bg-red-400 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumDiscussionPage;
