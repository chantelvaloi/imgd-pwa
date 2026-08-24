import { Play } from 'lucide-react';
import type { ShortVideo } from '../types';

export default function ShortCard({
  short,
  onClick,
  className = 'shrink-0 w-32',
}: {
  short: ShortVideo;
  onClick?: () => void;
  className?: string;
}) {
  const mins = Math.floor(short.durationSeconds / 60);
  const secs = short.durationSeconds % 60;
  return (
    <button
      onClick={onClick}
      className={`relative aspect-[9/16] rounded-xl overflow-hidden shadow-sm border border-black/5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] ${className}`}
    >
      <img
        src={short.thumbnail}
        alt={short.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
        {mins}:{secs.toString().padStart(2, '0')}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <Play size={22} className="text-white/90" fill="currentColor" />
      </span>
      <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium leading-snug line-clamp-2">
        {short.title}
      </p>
    </button>
  );
}
