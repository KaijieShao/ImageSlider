export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;             // full-screen slider
  download_url: string;
  thumbnailUrl: string;    // gallery grid
}

export interface ApiError {
  message: string;
  status?: number;
}

