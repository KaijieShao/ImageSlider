import { Photo, ApiError } from '@/types/photo';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const PHOTO_LIMIT = 50;

/**
 * Fetches photos from JSONPlaceholder API
 * Demonstrates error handling and async/await pattern
 * Note: We map via.placeholder.com URLs to picsum.photos for better reliability
 */
export async function fetchPhotos(limit: number = PHOTO_LIMIT): Promise<Photo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/photos?_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const photos: Photo[] = await response.json();
    
    // Map to reliable image source (picsum.photos)
    // Keep original metadata but replace image URLs
    // Using /seed/ to ensure same ID always returns the same image
    const mappedPhotos = photos.map(photo => ({
      ...photo,
      url: `https://picsum.photos/seed/${photo.id}/1200/800`,        // High-res for slider
      thumbnailUrl: `https://picsum.photos/seed/${photo.id}/600/800` // Larger for tall masonry cards
    }));
    
    return mappedPhotos;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Failed to fetch photos',
      status: error instanceof Error ? undefined : 500
    };
    throw apiError;
  }
}

/**
 * Processes photo data to ensure valid URLs
 * Demonstrates traditional for loop
 */
export function validatePhotos(photos: Photo[]): Photo[] {
  const validPhotos: Photo[] = [];
  
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    if (photo.url && photo.thumbnailUrl && photo.title) {
      validPhotos.push(photo);
    }
  }
  
  return validPhotos;
}

/**
 * Filters photos by album ID
 * Demonstrates filter method
 */
export function filterPhotosByAlbum(photos: Photo[], albumId: number): Photo[] {
  return photos.filter(photo => photo.albumId === albumId);
}

/**
 * Gets unique album IDs from photos
 * Demonstrates for...of loop and Set
 */
export function getUniqueAlbums(photos: Photo[]): number[] {
  const albumIds = new Set<number>();
  
  for (const photo of photos) {
    albumIds.add(photo.albumId);
  }
  
  return Array.from(albumIds).sort((a, b) => a - b);
}


