import { Photo, ApiError } from '@/types/photo';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const PHOTO_LIMIT = 50;

export async function fetchPhotos(limit: number = PHOTO_LIMIT): Promise<Photo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/photos?_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const photos: Photo[] = await response.json();
    
    const mappedPhotos = photos.map(photo => ({
      ...photo,
      url: `https://picsum.photos/seed/${photo.id}/1200/800`,        
      thumbnailUrl: `https://picsum.photos/seed/${photo.id}/600/800` 
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

// Processes photo data to ensure valid URLs
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

// Filters photos by album ID
export function filterPhotosByAlbum(photos: Photo[], albumId: number): Photo[] {
  return photos.filter(photo => photo.albumId === albumId);
}

// Gets unique album IDs from photos
export function getUniqueAlbums(photos: Photo[]): number[] {
  const albumIds = new Set<number>();
  
  for (const photo of photos) {
    albumIds.add(photo.albumId);
  }
  
  return Array.from(albumIds).sort((a, b) => a - b);
}


