import React, { useState } from "react";

const ImageCarousel = ({ images, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  // Check if current image URL contains a comma, indicating it's a spread
  const currentImageUrl = images[currentIndex].url;
  const isSpread = currentImageUrl.includes(',');
  
  // If it's a spread, split the URLs
  const imageUrls = isSpread ? currentImageUrl.split(',') : [currentImageUrl];

  return (
    <div className="mb-10">
      {title && (
        <h3 className="text-2xl font-semibold mb-3 dark:text-white">{title}</h3>
      )}
      {description && (
        <p className="text-lg opacity-80 mb-4 dark:text-gray-300">{description}</p>
      )}
      
      <div className="relative bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <div className="overflow-hidden rounded-lg shadow-md max-w-[1000px] mx-auto">
          {/* Current Image(s) */}
          <div className="relative w-full">
            <div className={`flex ${isSpread ? 'gap-4 justify-center' : 'justify-center'}`}>
              {imageUrls.map((url, idx) => (
                <div 
                  key={idx} 
                  className={`relative ${isSpread ? 'w-1/2' : 'w-full max-w-[800px]'}`}
                >
                  <img
                    src={url}
                    alt={`${images[currentIndex].caption} ${isSpread ? (idx === 0 ? '(Left)' : '(Right)') : ''}`}
                    className="w-full h-auto object-contain max-h-[70vh]"
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-all"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          
          {/* Caption */}
          {images[currentIndex].caption && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center italic text-gray-600 dark:text-gray-300">
                {images[currentIndex].caption}
              </p>
            </div>
          )}
        </div>
        
        {/* Indicator Dots */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-blue-600 dark:bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel; 