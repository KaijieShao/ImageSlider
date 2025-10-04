'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo';
import { fetchPhotos, validatePhotos } from '@/services/photoService';
import ImageSlider from './ImageSlider';

export default function ImageGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  // Loads photos from API 
  async function loadPhotos() {
    try {
      setIsLoading(true);
      setError(null);
      
      const fetchedPhotos = await fetchPhotos(50);
      const validPhotos = validatePhotos(fetchedPhotos);
      
      setPhotos(validPhotos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  }

  // Opens modal slider at specific photo ID
  const openSlider = (photoId: number) => {
    const index = photos.findIndex(photo => photo.id === photoId);
    if (index !== -1) {
      setSelectedImageIndex(index);
    }
  };

  const closeSlider = () => {
    setSelectedImageIndex(null);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#1a0f3a] to-[#0f0820] p-3 sm:p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-10">
            <div className="h-8 sm:h-10 w-48 sm:w-64 bg-[#5b7cff]/20 rounded-lg mb-3 sm:mb-4 animate-pulse" />
            <div className="h-3 sm:h-4 w-36 sm:w-48 bg-slate-700/50 rounded animate-pulse" />
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {Array.from({ length: 12 }).map((_, index) => {
              const heightClass = index % 5 === 0 ? 'h-[300px] sm:h-[450px] lg:h-[500px]' : 
                                 index % 3 === 0 ? 'h-[250px] sm:h-[380px] lg:h-[400px]' : 
                                 'h-[220px] sm:h-[320px] lg:h-[350px]';
              return (
                <div key={index} className="break-inside-avoid mb-4 sm:mb-6">
                  <div className="bg-[#1a2845] rounded-xl sm:rounded-2xl overflow-hidden">
                    <div className={`${heightClass} bg-slate-700/30 animate-pulse`} />
                    <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-[#1e3a8a]/50 to-[#1e40af]/50">
                      <div className="h-2 sm:h-3 w-16 sm:w-20 bg-slate-600/50 rounded mb-2 sm:mb-3 animate-pulse" />
                      <div className="h-4 sm:h-5 w-3/4 bg-slate-600/50 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#1a0f3a] to-[#0f0820] flex items-center justify-center p-4">
        <div className="bg-[#1a2845] rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-red-500/20">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={loadPhotos}
            className="bg-[#5b7cff] hover:bg-[#4a6aef] text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-[0_10px_30px_rgba(91,124,255,0.3)]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b4e] via-[#1a0f3a] to-[#0f0820] p-3 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5b7cff] mb-2 tracking-wider">
            IMAGE GALLERY
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {photos.length} images • Tap to view full screen • Use &lt; or &gt; to slide • Esc or tap outside to exit
          </p>
        </header>

        {/* Masonry Gallery Grid - Demonstrates map() method */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {photos.map((photo, index) => {
            // Vary card heights for masonry effect - smaller on mobile
            const heightClass = index % 5 === 0 ? 'h-[300px] sm:h-[450px] lg:h-[500px]' : 
                               index % 3 === 0 ? 'h-[250px] sm:h-[380px] lg:h-[400px]' : 
                               'h-[220px] sm:h-[320px] lg:h-[350px]';
            
            return (
              <div
                key={photo.id}
                onClick={() => openSlider(photo.id)}
                className="group relative break-inside-avoid mb-4 sm:mb-6 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
              >
                <div className="bg-[#1a2845] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(91,124,255,0.3)] hover:-translate-y-1">
                  {/* Image Section */}
                  <div className={`relative ${heightClass} overflow-hidden`}>
                    <Image
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-105"
                      loading="lazy"
                    />
                    {/* Play button overlay for first few items - hidden on mobile */}
                    {index < 3 && (
                      <div className="hidden sm:flex absolute top-4 left-4 w-12 h-12 bg-[#5b7cff]/20 backdrop-blur-sm rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] p-4 sm:p-5 lg:p-6">
                    <div className="text-[10px] sm:text-xs text-[#93c5fd] uppercase tracking-wider mb-1 sm:mb-2 font-semibold">
                      Photo #{photo.id}
                    </div>
                    <h3 className="text-[#5b7cff] font-bold text-base sm:text-lg leading-tight line-clamp-2">
                      {photo.title.split(' ').slice(0, 4).join(' ')}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Slider */}
      {selectedImageIndex !== null && (
        <ImageSlider
          photos={photos}
          initialSlide={selectedImageIndex}
          onClose={closeSlider}
        />
      )}
    </div>
  );
}


