import { Photo, ApiError } from '@/types/photo';

const API_BASE_URL = 'https://picsum.photos/v2';

export async function fetchPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/list`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const photos: Photo[] = await response.json();

    // Transform the photos to add the url and thumbnailUrl
    const mappedPhotos = photos.map(photo => ({
      ...photo,
      url: `${photo.download_url}?w=1200&h=800`,
      thumbnailUrl: `${photo.download_url}?w=600&h=800`
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
    if (photo.url && photo.thumbnailUrl && photo.author) {
      validPhotos.push(photo);
    }
  }

  return validPhotos;
}

// Filters photos by author
export function filterPhotosByAuthor(photos: Photo[], author: string): Photo[] {
  return photos.filter(photo => photo.author === author);
}

// Gets unique authors from photos
export function getUniqueAuthors(photos: Photo[]): string[] {
  const authors = new Set<string>();

  for (const photo of photos) {
    authors.add(photo.author);
  }

  return Array.from(authors).sort();
}


