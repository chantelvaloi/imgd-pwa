import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import type { Sermon } from '../types';

export default function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link
      to={`/watch/sermon/${sermon.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 active:scale-[0.99] transition-transform"
    >
      <div className="relative aspect-video bg-[var(--color-ink)]">
        <img
          src={sermon.thumbnail}
          alt={sermon.title}
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
            <Play size={18} className="text-[var(--color-ink)] ml-0.5" fill="currentColor" />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded flex items-center gap-1">
          <Clock size={11} /> {sermon.durationMinutes} min
        </span>
      </div>
      <div className="p-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-gold)]">
          {sermon.series}
        </span>
        <h3 className="font-semibold text-[var(--color-ink)] leading-snug mt-0.5">
          {sermon.title}
        </h3>
        <p className="text-sm text-[var(--color-ink)]/60 mt-0.5">{sermon.speaker}</p>
      </div>
    </Link>
  );
}
