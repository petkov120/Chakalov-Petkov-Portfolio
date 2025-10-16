import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  src, 
  alt, 
  className = "", 
  style, 
  placeholder,
  onLoad, 
  onError 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={style}>
      {/* Placeholder/Loading state */}
      <motion.div
        className="absolute inset-0 bg-gray-200 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {hasError ? (
          <div className="text-gray-400 text-sm text-center p-4">
            <div className="text-2xl mb-2">🖼️</div>
            <div>Image unavailable</div>
          </div>
        ) : (
          <motion.div
            className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('${src}')` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Hidden img element for loading detection */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className="sr-only"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </div>
  );
}