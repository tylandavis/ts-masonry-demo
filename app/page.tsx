import Image from "next/image";
import Masonry from "../components/Masonry";
export default function Home() {

  type galleryType = {url: string, w: number, h: number, alt: string}[];

  const gallery: galleryType = [
    { url: "/1.jpg", w: 800, h: 800, alt: "1" },
    { url: "/2.jpg", w: 800, h: 1200, alt: "2" },
    { url: "/3.jpg", w: 1200, h: 800, alt: "3" },
    { url: "/4.jpg", w: 800, h: 800, alt: "4" },
    { url: "/5.jpg", w: 800, h: 1200, alt: "5" },
    { url: "/6.jpg", w: 1200, h: 800, alt: "6" },
    { url: "/7.jpg", w: 800, h: 800, alt: "7" },
    { url: "/8.jpg", w: 800, h: 1200, alt: "8" },
    { url: "/9.jpg", w: 1200, h: 800, alt: "9" },
    { url: "/10.jpg", w: 800, h: 800, alt: "10" },
    { url: "/11.jpg", w: 800, h: 1200, alt: "11" },
    { url: "/12.jpg", w: 1200, h: 800, alt: "12" },
    { url: "/13.jpg", w: 800, h: 800, alt: "13" },
    { url: "/14.jpg", w: 800, h: 1200, alt: "14" },
    { url: "/15.jpg", w: 1200, h: 800, alt: "15" },
    { url: "/16.jpg", w: 800, h: 800, alt: "16" },
    { url: "/17.jpg", w: 800, h: 1200, alt: "17" },
    { url: "/18.jpg", w: 1200, h: 800, alt: "18" },
    { url: "/19.jpg", w: 800, h: 800, alt: "19" },
    { url: "/20.jpg", w: 800, h: 1200, alt: "20" },
    { url: "/21.jpg", w: 1200, h: 800, alt: "21" },
    { url: "/22.jpg", w: 800, h: 800, alt: "22" },
    { url: "/23.jpg", w: 800, h: 1200, alt: "23" },
    { url: "/24.jpg", w: 1200, h: 800, alt: "24" },
    { url: "/25.jpg", w: 800, h: 800, alt: "25" },
    { url: "/26.jpg", w: 800, h: 1200, alt: "26" },
    { url: "/27.jpg", w: 1200, h: 800, alt: "27" },
    { url: "/28.jpg", w: 800, h: 800, alt: "28" },
    { url: "/29.jpg", w: 800, h: 1200, alt: "29" },
    { url: "/30.jpg", w: 1200, h: 800, alt: "30" },
    { url: "/31.jpg", w: 800, h: 800, alt: "31" },
    { url: "/32.jpg", w: 800, h: 1200, alt: "32" },
    { url: "/33.jpg", w: 1200, h: 800, alt: "33" },
    { url: "/34.jpg", w: 800, h: 800, alt: "34" },
    { url: "/35.jpg", w: 800, h: 1200, alt: "35" },
    { url: "/36.jpg", w: 1200, h: 800, alt: "36" },
  ];

  return (
    <main>
      <Masonry images={gallery} gap={'1rem'} columns={[
        { columns: 2, breakpoint: 200 },
        { columns: 3, breakpoint: 600 },
        { columns: 6, breakpoint: 1200 },
      ]} />
    </main>
  )
}
