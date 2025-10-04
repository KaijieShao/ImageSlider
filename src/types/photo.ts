/**
 * Photo data structure from JSONPlaceholder API
 */
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/**
 * API response state for error handling
 */
export interface ApiError {
  message: string;
  status?: number;
}


