import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { EventItem } from '../types';

function formatDateBadge(dateStr: string) {
  const d = new Date(dateStr);
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  return { month, day };
}

export default function EventCard({ event }: { event: EventItem }) {
  const { month, day } = formatDateBadge(event.date);
  return (
    <Link
      to={`/events/${event.id}`}
      className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-black/5 active:scale-[0.99] transition-transform"
    >
      <div className="shrink-0 w-14 h-14 rounded-xl bg-[var(--color-ink)] text-[var(--color-cream)] flex flex-col items-center justify-center">
        <span className="text-[10px] font-semibold tracking-wide text-[var(--color-gold-light)]">
          {month}
        </span>
        <span className="text-lg font-bold font-[var(--font-display)] leading-none">{day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-teal)] bg-[var(--color-teal)]/10 px-2 py-0.5 rounded-full mb-1">
          {event.category}
        </span>
        <h3 className="font-semibold text-[var(--color-ink)] leading-snug truncate">
          {event.title}
        </h3>
        <p className="text-sm text-[var(--color-ink)]/60 flex items-center gap-1 mt-0.5">
          <MapPin size={13} /> {event.location} &middot; {event.time}
        </p>
      </div>
    </Link>
  );
}
