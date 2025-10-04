'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Photo } from '@/types/photo';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSliderProps {
  photos: Photo[];
  initialSlide: number;
  onClose: () => void;
}

export default function ImageSlider({ photos, initialSlide, onClose }: ImageSliderProps) {
  /**
   * Handles ESC key press to close modal
   * Demonstrates useCallback for memoized function
   */
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  /**
   * Sets up keyboard event listener
   * Demonstrates useEffect for side effects
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyPress]);

  /**
   * Handles backdrop click to close modal
   */
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/70 active:bg-black/90 sm:hover:bg-black/80 rounded-full transition-colors touch-manipulation"
        aria-label="Close slider"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Swiper Slider */}
      <div className="w-full h-full max-w-6xl mx-auto px-2 sm:px-4 py-12 sm:py-16 lg:py-20">
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          initialSlide={initialSlide}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: false,
          }}
          loop={false}
          spaceBetween={30}
          className="h-full"
          onSlideChange={(swiper: SwiperType) => {
            // Could add analytics or other side effects here
            console.log('Slide changed to:', swiper.activeIndex + 1);
          }}
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                {/* Image Container */}
                <div className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[80vh]">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    quality={90}
                    className="object-contain"
                    priority={photo.id === photos[initialSlide].id}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6">
                    <h3 className="text-white text-xs sm:text-sm lg:text-base font-medium text-center max-w-3xl mx-auto line-clamp-2">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black/70 active:bg-black/90 sm:hover:bg-black/80 rounded-full transition-colors touch-manipulation"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black/70 active:bg-black/90 sm:hover:bg-black/80 rounded-full transition-colors touch-manipulation"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </Swiper>
      </div>
    </div>
  );
}


