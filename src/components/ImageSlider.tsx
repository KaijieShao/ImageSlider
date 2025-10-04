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
        className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full transition-colors"
        aria-label="Close slider"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Swiper Slider */}
      <div className="w-full h-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
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
          {/* Generate slides using map() */}
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                {/* Image Container */}
                <div className="relative w-full h-[70vh] sm:h-[80vh]">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    quality={90}
                    className="object-contain"
                    priority={photo.id === photos[initialSlide].id}
                    sizes="(max-width: 1024px) 100vw, 1200px"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full transition-colors group"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full transition-colors group"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </Swiper>
      </div>
    </div>
  );
}


