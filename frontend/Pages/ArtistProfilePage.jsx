import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { data } from "../sampleData";
import { useStateContext } from "../Context/ContextProvider";

const ArtistProfilePage = ({ image }) => {
  const { id } = useParams();
  const {isGuest} = useStateContext()

  const artistData = data.filter((artist) => artist.id === id);
  return (
    <div className="px-[12%] pt-8">
      <Link to={isGuest ? "/guest/artist" : "/artist"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>

      <div className="flex flex-col justify-center items-center">
        <br />
        <br />
        <h1 className="text-center text-4xl josefin">
          {artistData[0].nickname}
        </h1>
        <br />
        <div>Profile Music Photo Video</div>
        <br />
        <div className="w-[600px] h-[600px] overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover rounded-md"
            src={artistData[0].image}
            alt=""
          />
        </div>

        <p className="text-center my-4 josefin">
          <strong>About</strong>
          <br />
          I am a Malaysian singer, songwriter and male <br />
          actor. I was a champion in a competition on <br />
          YouTube and the son of a veteran singer of <br />
          the 1980s, Suliza Salam.
        </p>

        <p className="text-center josefin">
          Career: Malaysian Singer
          <br />
          Genre: Pop and R&B
          <br />
          Birthday: April 13th, 2000 (24 years old)
          <br />
          Music: Sabar, Demi Kita, Bidadari and more.
        </p>

        <br />
        <br />
        <br />

        <h1 className="josefin text-2xl">GALLERY</h1>

        <div className="flex justify-center flex-wrap gap-8 my-4">
          <div className="w-72 h-72 border">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAjXJvZlf4HfgS2ymq19yLF17hnTuiWJBBKL9WP29rqJYoLPB_"
              alt=""
            />
          </div>

          <div className="w-72 h-72 border">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRz5XjwGbOsUFWFXiEiq_lFr1yW4FWma1OuUTPT7zZuDX6pWQyz"
              alt=""
            />
          </div>

          <div className="w-72 h-72 border">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcREl_W8z2M-hvL4GynE1x3ZVYvWT2iuE9sw961s8lu-kuaz5RVr"
              alt=""
            />
          </div>

          <div className="w-72 h-72 border">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvEg6TYrZR9nO1uFjpcKrwsmiAxf8ja9f7Cymd7ZzVT3R0JLTS"
              alt=""
            />
          </div>

          <div className="w-72 h-72 border">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSDESydYY3nitDE4INBWsUsPLQaQsXgX6LiFH-1EVFYGX-pwwsA
"
              alt=""
            />
          </div>

          <div className="w-72 h-72 border">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRG-NzNP2uvqlKPzQYyYdbGjh8hPoK_a-1Zz6fcFHY2dm_5-Pxx
"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
