import { useState, useEffect, useCallback } from 'react';

export interface S3Image {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

export interface UseS3ImagesOptions {
  prefix?: string;
  autoFetch?: boolean;
}

export interface UseS3ImagesReturn {
  images: S3Image[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useS3Images(options: UseS3ImagesOptions = {}): UseS3ImagesReturn {
  const { prefix, autoFetch = true } = options;
  
  const [images, setImages] = useState<S3Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      if (prefix) {
        queryParams.append('prefix', prefix);
      }
      
      const response = await fetch(`/api/images?${queryParams}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch images');
      }
      
      setImages(data.images);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching S3 images:', err);
    } finally {
      setLoading(false);
    }
  }, [prefix]);

  useEffect(() => {
    if (autoFetch) {
      fetchImages();
    }
  }, [autoFetch, fetchImages]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
  };
}

export interface UseS3ImageCategoriesReturn {
  categories: Record<string, S3Image[]>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useS3ImageCategories(): UseS3ImageCategoriesReturn {
  const [categories, setCategories] = useState<Record<string, S3Image[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/images/categories');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch image categories');
      }
      
      setCategories(data.categories);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching S3 image categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
} 