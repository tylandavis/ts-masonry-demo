'use client';

import { useEffect, useState } from "react";

type imageObject = {
  url: string,
  w: number,
  h: number
  alt: string,
};

type props = {
  images: [number, imageObject][],
  lightbox: boolean,
  currentImage: number,
  closeLightbox: () => void
  nextImage: () => void,
  previousImage: () => void
}

const Lightbox = (props: props) => {
  
  return (
    <div className={`lightbox ${props.lightbox ? "open" : ""}`}>
      <div className="lightbox-arrows">
        <div className="lightbox-arrow">
          <img src="/arrow-left.svg" className="lightbox-arrow-left" onClick={()=> props.previousImage()}/>
        </div>
        <div className="lightbox-arrow">
          <img src="/arrow-right.svg" className="lightbox-arrow-right" onClick={()=> props.nextImage()} />
        </div>
      </div>
      <div className="lightbox-overlay" onClick={props.closeLightbox}></div>
      {
        // 
        props.images.map((image, index) => {;
          return (
            <div className={`lightbox-image ${(index == props.currentImage) ? "current" : (index < props.currentImage) ? "left" : "right"}`} key={index}>
              <img src={image[1].url} />
            </div>
          )
        })
      }
    </div>
  )
    
}

export default Lightbox;