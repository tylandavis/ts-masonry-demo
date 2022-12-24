'use client';

import CSS from 'csstype';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Lightbox from './Lightbox';

type imageObject = {
  url: string,
  w: number,
  h: number
  alt: string,
};

type columnObject = {
  columns: number,
  breakpoint: number,
  [key: number]: number,
  length?: number
}

type props = {
  images: imageObject[],
  columns: number | columnObject[],
  gap?: number | string | { columnGap: number | string, rowGap: number | string }
}

const Masonry = (props: props) => {
  const imageArray: [number, imageObject][] = props.images.map((image: imageObject, index: number) => [index, image]);

  const [currentBreakpoint, setCurrentBreakpoint] = useState<number | null>(null);
  const [rowGap, setRowGap] = useState<number | string>(0);
  const [columnGap, setColumnGap] = useState<number | string>(0);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  function getColumnGap() {
    if (typeof props.gap === "number") {
      setColumnGap(props.gap);
    } else if (typeof props.gap === "string") {
      setColumnGap(props.gap);
    } else if (typeof props.gap === "object") {
      setColumnGap(props.gap.columnGap);
    } else {
      setColumnGap(0);
    }
  }
    
  function getRowGap() {
    if (typeof props.gap === "number") {
      setRowGap(props.gap);
    } else if (typeof props.gap === "string") {
      setRowGap(props.gap)
    } else if (typeof props.gap === "object") {
      setRowGap(props.gap.rowGap);
    } else {
      setRowGap(0);
    }
  }

  function openLightBox(key: number) {
    setLightboxOpen(true);
    setCurrentImage(key);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  function nextImage() {
    if (currentImage == imageArray.length + 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  function previousImage() {
    if (currentImage == 0) {
      setCurrentImage(imageArray.length + 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }

  function handleResize() { 
    if (typeof props.columns !== "number") {
      // if window width is greater than the breakpoint, set the current breakpoint to the next breakpoint
      for (let i = 0; i < props.columns.length; i++) {
        if (window.innerWidth > props.columns[i].breakpoint) {
          setCurrentBreakpoint(i);
        }
      }
    }
  }
  
  useEffect(() => {
    // create a css object for each breakpoint
    getColumnGap();
    getRowGap();
    handleResize();
    window.addEventListener("resize", handleResize);
  });
  

  // checks height of an image
  function imageHeight(image: imageObject) {
    // if image is wider than it is tall, return the height times the ratio
    const imageRatio = image.h / image.w;
    if (imageRatio < 1) {
      return image.h * imageRatio;
    } else {
      return image.h;
    }
  }

  // checks height of a column
  function columnHeight(columnContents: imageObject[]) {
    columnContents.map((image: imageObject) => {
      return imageHeight(image);
    });
    return columnContents.reduce((a: number, b: imageObject) => a + imageHeight(b), 0);
  }

  function getShortestColumn(arr: number[]) {
    return arr.indexOf(Math.min(...arr));
  }

  if (typeof props.columns === "number") {
    const columnSet: [number, imageObject][][] = [];
    let columnHeights: number[] = [];
    // create an array with that many columns
    for (let i = 0; i < props.columns; i++) {
      columnSet.push([]);
      columnHeights[i] = 0;
    }
    // push images to the shortest column
    
    imageArray.map((image, index) => {
      let shortestColumn = getShortestColumn(columnHeights);
      columnSet[shortestColumn].push(image);
      columnHeights[shortestColumn] += Math.round(imageHeight(image[1]));
    });
    return <>(
      <div className="masonry" style={{ gap: `${columnGap}`}}>
        {columnSet.map((column: [number, imageObject][], key: number) => {
          return (
              <div className="column" key={key} style={{ gap: `${rowGap}`}}>
                {column.map((image: [number, imageObject], key: number) => {
                  return (
                    <div className="masonry-image" key={key} onClick={() => openLightBox(image[0])} >
                      <Image src={image[1].url} width={image[1].w} height={image[1].h} alt={image[1].alt} />
                    </div>
                  )
                })}
              </div>
            )
        })}
      </div>
      <Lightbox images={imageArray} lightbox={lightboxOpen} currentImage={currentImage} closeLightbox={()=>closeLightbox()} nextImage={()=>nextImage()} previousImage={()=>previousImage()} />
    )</>
  } else {
    // define breakpointColumnSet
    const breakpointColumnSet: [number,imageObject][][][] = [];
    const columnCount: CSS.Properties[] = props.columns.map((column: columnObject) => {
      return {
        gridTemplateColumns: `repeat(${column.columns}, 1fr)`,
        gap: `${columnGap}`
      };
    });
    // for each breakpoint, create a set of arrays with the number of columns
    for (let i = 0; i < props.columns.length; i++) {
      breakpointColumnSet.push([]);
      let columnHeights: number[] = [];

      for (let j = 0; j < props.columns[i].columns; j++) {
        breakpointColumnSet[i].push([]);
        columnHeights[j] = 0;
      }
      imageArray.map((image: [number, imageObject], index) => {
        let shortestColumn = getShortestColumn(columnHeights);
        breakpointColumnSet[i][shortestColumn].push(image);
        columnHeights[shortestColumn] += Math.round(imageHeight(image[1]));
      });
    };
    return <>
      <h1>{lightboxOpen ? "true" : "false"}, {currentImage}</h1>
      {
      breakpointColumnSet.map((columnSet: [number, imageObject][][], key: number) => {
        return (currentBreakpoint === key) && (
          <div className="masonry" style={columnCount[key]} key={key}>
            {columnSet.map((column: [number, imageObject][], key: number) => {
              return (
                <div className="column" key={key} style={{ gap: `${rowGap}`}}>
                  {column.map((image: [number, imageObject], key: number) => {
                    return (
                      <div className="masonry-image" key={key} onClick={() => openLightBox(image[0])} >
                        <Image src={image[1].url} width={image[1].w} height={image[1].h} alt={image[1].alt} />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })
    })
      <Lightbox images={imageArray} lightbox={lightboxOpen} currentImage={currentImage} closeLightbox={()=>closeLightbox()} nextImage={()=>nextImage()} previousImage={()=>previousImage()}/>
    </>
  }
}

  export default Masonry;