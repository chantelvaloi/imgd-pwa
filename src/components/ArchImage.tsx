interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Signature visual element: an arch-topped image frame, referencing
 * church doorways and windows. Used sparingly for hero/featured imagery.
 */
export default function ArchImage({ src, alt, className = '' }: ArchImageProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ borderRadius: '999px 999px 16px 16px' }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}
