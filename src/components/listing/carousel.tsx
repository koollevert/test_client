'use client';   
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
  images,
  autoSlide = false,
  autoSlideInterval = 3000,
}: {
  images: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);
  
//   className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white

  return (
    <div className="max-w-sm overflow-hidden relative w-full mx-auto">
      {/* Slide Container */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={800} // Adjust width
              height={600} // Adjust height
              className="w-full h-auto object-cover rounded-lg"
              priority={index === 0} // Optimize the first image
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full bg-white transition-all ${
              curr === i ? "p-2" : "bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

