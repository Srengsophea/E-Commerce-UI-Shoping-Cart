import { useState } from 'react';
import { PRODUCTS } from '../data/products';

function FallbackSvg({ productId, className = '' }) {
  switch (productId) {
    case 'laptop':
      return (
        <svg
          viewBox="0 0 120 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect
            x="22"
            y="16"
            width="76"
            height="48"
            rx="5"
            fill="#1F2937"
            stroke="#111827"
            strokeWidth="2"
          />
          <rect x="26" y="20" width="68" height="40" rx="2.5" fill="#F8FAFC" />
          <path
            d="M12 66H108L113 73C113.5 74 112.8 75 111.7 75H8.3C7.2 75 6.5 74 7 73L12 66Z"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'mouse':
      return (
        <svg
          viewBox="0 0 120 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect
            x="40"
            y="18"
            width="40"
            height="58"
            rx="20"
            fill="#1F2937"
            stroke="#111827"
            strokeWidth="2"
          />
          <rect x="57.5" y="26" width="5" height="11" rx="2.5" fill="#F3F4F6" />
        </svg>
      );
    case 'keyboard':
      return (
        <svg
          viewBox="0 0 120 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect
            x="14"
            y="27"
            width="92"
            height="42"
            rx="6"
            fill="#1F2937"
            stroke="#111827"
            strokeWidth="2"
          />
          <rect x="20" y="33" width="80" height="7" rx="1.5" fill="#F3F4F6" />
          <rect x="20" y="43" width="80" height="7" rx="1.5" fill="#D1D5DB" />
          <rect x="40" y="53" width="40" height="7" rx="1.5" fill="#F9FAFB" />
        </svg>
      );
    case 'monitor':
      return (
        <svg
          viewBox="0 0 120 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect
            x="16"
            y="14"
            width="88"
            height="54"
            rx="5"
            fill="#111827"
            stroke="#111827"
            strokeWidth="2"
          />
          <rect x="20" y="18" width="80" height="44" rx="2.5" fill="#F8FAFC" />
          <rect x="54" y="68" width="12" height="10" fill="#D1D5DB" />
          <rect x="40" y="77" width="40" height="4" rx="2" fill="#9CA3AF" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProductArtwork({ productId, image, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  const product = PRODUCTS.find((p) => p.id === productId);
  const imageUrl = image || product?.image;
  const imageAlt = alt || product?.name || 'Product image';

  if (!imageUrl || failed) {
    return <FallbackSvg productId={productId} className={className} />;
  }

  return (
    <img
      src={imageUrl}
      alt={imageAlt}
      className={`product-photo ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
