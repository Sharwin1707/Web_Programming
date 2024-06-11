import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUsers,
  faHashtag,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider";

const ForumPage = () => {
  const [searchBar, setSearchBar] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [forumTopic, setTopic] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useStateContext();

  // Filter topic data based on search input
  const searchTopic = () => {
    const searchLower = searchBar.toLowerCase();
    const filteredTopic = forumTopic.filter(
      (topic) =>
        topic.title.toLowerCase().includes(searchLower) ||
        topic.content.toLowerCase().includes(searchLower)
    );
    setTopic(filteredTopic);
  };

  const createPostModal = () => {
    setOpenModal(!openModal);
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/post`
      );
      if (response.status === 200) {
        console.log(response);
        setTopic(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // Add a new post
  const addPost = async () => {
    try {
      const newPost = {
        userId: user._id,
        username: user.username,
        title,
        content,
      }; // Add username as needed
      await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/post`, newPost);
      fetchPosts(); // Refresh the posts after adding a new one
      setTitle("");
      setContent("");
      setOpenModal(false);
      return;
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {}, [forumTopic]);

  return (
    <div className="relative px-[10%] josefin py-10">
      <div className="flex justify-between">
        <form className="m-4 flex justify-center" id="searchForm ">
          <input
            className="px-2 py-1 rounded-l-md"
            type="text"
            placeholder="Search..."
            value={searchBar}
            onChange={(event) => {
              if (!event.target.value) {
                fetchPosts();
              }
              setSearchBar(event.target.value);
            }}
          />
          <button
            className="red px-2 py-1 rounded-r-md ml-1"
            type="button"
            onClick={searchTopic}
          >
            Search
          </button>
        </form>

        <div>
          <select
            className="px-4 py-2 rounded-md text-black focus:outline-none"
            name=""
            id=""
          >
            <option value="">Music</option>
            <option value="">Artist</option>
            <option value="">Live</option>
            <option value="">Announcement and News</option>
            <option value="">Fan</option>
          </select>
        </div>
      </div>

      {/* ---------------create post modal----------------------- */}
      {openModal ? (
        <div className="absolute w-screen h-screen top-0 left-0 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[800px] h-[600px] bg-white rounded-md text-black">
            <div className="flex flex-col px-6 py-3">
              <label htmlFor="">Title:</label>
              <input
                onChange={(event) => setTitle(event.target.value)}
                className="border border-gray-600 rounded-md px-4 py-2"
                type="text"
                value={title}
              />
            </div>
            <div className="flex flex-col px-6 py-3">
              <label htmlFor="">Content:</label>
              <textarea
                onChange={(event) => setContent(event.target.value)}
                className="border border-gray-600 px-4 py-2"
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
      ) : (
        ""
      )}
      {/* ---------------create post modal----------------------- */}

      {/* ---------------Trending discussion--------------------------- */}
      <div className="flex justify-between items-center ">
        <h1 className="mt-16 mb-6 text-2xl josefin">TRENDING NOW</h1>
        <button
  onClick={createPostModal}
  className="flex gap-3 items-center mt-16 mb-6 bg-white px-4 py-2 rounded-md hover:bg-red-500"
>
  <FontAwesomeIcon icon={faMessage} color="black" className="hover:text-white" />
  <h1 className="text-black hover:text-white">Create Post</h1>
</button>

      </div>

      <div className="flex flex-col m-5 mt-5">
  <div className="flex overflow-x-scroll pb-2 hide-scroll-bar">
    <div className="flex flex-nowrap">
      <div className="inline-block px-3">
        <div className="group w-[700px] h-[200px] border border-gray-300 bg-gray-800 text-white p-2 mb-5 transition duration-300 ease-in-out hover:bg-white">
          <Link
            to={`/forum/${"Taylor Swift - The Tortured Poets Department ALBUM REVIEW"}`}
            className="no-underline text-inherit outline-none"
          >
            <h3 className="text-lg font-semibold josefin group-hover:text-red-400">
              Taylor Swift - The Tortured Poets Department ALBUM REVIEW
            </h3>
          </Link>
          <p className="line-clamp-5 group-hover:text-red-400">
            Reviews: Rolling Stone: 100/100 The Tortured Poets Department
            combines the intimacy of Folklore and Evermore with the synth-pop
            gloss of Midnights to create music that's wildly ambitious and
            gloriously chaotic. The Independent: 5/5 With its playful
            narratives and hooks like anchors, Swift’s 11th studio album is a
            terrific reminder of her storytelling powers. Variety: 94/100 Taylor
            Swift Renews Her Vows With Heartbreak in Audacious, Transfixing
            ‘Tortured Poets Department’ The Irish Times: 4.5/5 This album is the
            fruit of abject misery but is also steeped in Swift’s trademark
            indefatigable optimism.
          </p>
        </div>
      </div>

      <div className="inline-block px-3">
        <div className="group w-[700px] h-[200px] border border-gray-300 bg-gray-800 text-white p-2 mb-5 transition duration-300 ease-in-out hover:bg-white">
          <Link className="no-underline text-inherit outline-none">
            <h3 className="text-lg font-semibold josefin group-hover:text-red-400">
              What songs sound like they’d fit perfect for a movie soundtrack,
              even though they aren’t?
            </h3>
          </Link>
          <p className="line-clamp-5 group-hover:text-red-400">
            Are there any songs throughout time, that you thought would sound
            really good for a specific movie (or TV series) despite not being
            associated with the film in any way? I thought “My Boy Only Breaks
            His Favorite Toys” by Taylor Swift would’ve been great for the
            Barbie movie, she even references Ken. It would’ve been a fitting
            song for when Ken has his tantrum! “II MOST WANTED” by Beyoncé &
            Miley would fit well in any sisterhood type movie, maybe Little
            Women? Or going back a bit, Thelma and Louise? And just for fun -
            Lorde’s “Tennis Court” for the new Challengers movie!
          </p>
        </div>
      </div>
    </div>
  </div>

  <hr className="my-8" />
</div>





      {/*-------------------- Top discussion------------------------------------- */}

      <div className="flex gap-[10%]">
        <div className="flex gap-[10%]">
     <div className="w-[1000px] flex flex-col gap-4">
  {/* ---------sample post---------- */}
  <h1 className="text-2xl font-bold josefin">NEW DISCUSSION</h1>

  {forumTopic
    .slice()
    .reverse()
    .map((topic) => (
      <div
        key={topic._id}
        className="border bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-red-400"
      >
        <Link to={user ? `/forum/${topic._id}` : `/guest/forum/${topic._id}`} className="no-underline">
          <h1 className="text-2xl font-bold josefin text-gray-800 mb-2 hover:text-white">
            {topic.title}
          </h1>
        </Link>
        <div className="flex items-center justify-between text-gray-600 text-sm mb-4 hover:text-white">
          <span>
            post by <span className="font-semibold">{topic.username} on <span className="text-gray-400">{new Date(topic.postAt).toLocaleDateString()}</span></span>
          </span>
        </div>
        <p className="line-clamp-3 text-gray-800 hover:text-white">{topic.content}</p>
      </div>
    ))}
</div>



        </div>

        {/*-------------------- Top discussion------------------------------------- */}

        {/* -------- Top community and search dekat kanan---------- */}
        <div className="w-[35%] flex flex-col gap-8">
  <div className="p-2 bg-gray-800 text-white rounded-lg"> 
    <h1 className="">Top Communities</h1>

    <div className="flex gap-3 my-2">
      <FontAwesomeIcon
        className="rounded-full p-1"
        icon={faUsers}
      />
      <Link className="hover:text-red-400">
        <h1>Swifties</h1>
      </Link>
    </div>

    <div className="flex gap-3 my-2">
      <FontAwesomeIcon
        className="rounded-full p-1"
        icon={faUsers}
      />
      <Link className="hover:text-red-400">
        <h1>Everything Mitsky</h1>
      </Link>
    </div>

    <div className="flex gap-3 my-2">
      <FontAwesomeIcon
        className="rounded-full p-1"
        icon={faUsers}
      />
      <Link className="hover:text-red-400">
        <h1>Live Laugh Lamp</h1>
      </Link>
    </div>

    <div className="flex gap-3 my-2">
      <FontAwesomeIcon
        className="rounded-full p-1"
        icon={faUsers}
      />
      <Link className="hover:text-red-400">
        <h1>Pop Genre Club</h1>
      </Link>
    </div>

    <div className="flex gap-3 my-2">
      <FontAwesomeIcon
        className="rounded-full p-1"
        icon={faUsers}
      />
      <Link className="hover:text-red-400">
        <h1>Music Discussion Group</h1>
      </Link>
    </div>
  </div>

  <div>
    <div className="p-2 bg-gray-800 text-white rounded-lg">
      <h1>Top Search</h1>

      <div className="flex gap-3 my-2">
        <FontAwesomeIcon
          className="rounded-full p-1"
          icon={faHashtag}
        />
        <Link className="hover:text-red-400">
          <h1>The Tortured Poets Album</h1>
        </Link>
      </div>

      <div className="flex gap-3 my-2">
        <FontAwesomeIcon
          className="rounded-full p-1"
          icon={faHashtag}
        />
        <Link className="hover:text-red-400">
          <h1>New Releases</h1>
        </Link>
      </div>

      <div className="flex gap-3 my-2">
        <FontAwesomeIcon
          className="rounded-full p-1"
          icon={faHashtag}
        />
        <Link className="hover:text-red-400">
          <h1>Coachella</h1>
        </Link>
      </div>

      <div className="flex gap-3 my-2">
        <FontAwesomeIcon
          className="rounded-full p-1"
          icon={faHashtag}
        />
        <Link className="hover:text-red-400">
          <h1>Music Video</h1>
        </Link>
      </div>

      <div className="flex gap-3 my-2">
        <FontAwesomeIcon
          className="rounded-full p-1"
          icon={faHashtag}
        />
        <Link className="hover:text-red-400">
          <h1>Tyler The Creator</h1>
        </Link>
      </div>
    </div>
  </div>
</div>


        {/* -------- Top community and search dekat kanan---------- */}
      </div>
    </div>
  );
};

export default ForumPage;
