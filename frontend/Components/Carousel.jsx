import React from 'react'
import { Carousel } from "@material-tailwind/react";

const CustomCarousel = ({image}) => {
  return (
    <Carousel transition={{ duration: 1 }} autoplay loop className="rounded-xl w-full h-[500px]">
      {image.map((image) => (
        <div key={image.url} className="h-full w-full">
          <img
            src={image.url}
            alt={`image ${image.id}`}
            className="h-full w-full object-cover rounded-xl "
            
          />
        </div>
      ))}

    </Carousel>
  )
}

export default CustomCarousel