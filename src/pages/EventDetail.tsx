import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { getEventById } from '../services/events';
import type { EventItem } from '../types';
import TopBar from '../components/TopBar';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventItem | null | undefined>(undefined);

  useEffect(() => {
    if (id) getEventById(id).then(setEvent);
  }, [id]);

  if (event === undefined) return <TopBar title="Event" showBack />;

  if (!event) {
    return (
      <div>
        <TopBar title="Event" showBack />
        <div className="px-4 py-10 text-center">
          <p className="text-[var(--color-ink)]/60">
            We couldn't find that event. It may have already passed.
          </p>
          <Link to="/events" className="text-[var(--color-teal)] font-medium mt-2 inline-block">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  const dateLabel = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <TopBar title="Event details" showBack />
      <img src={event.image} alt={event.title} className="w-full aspect-[4/3] object-cover" />
      <div className="px-4 py-5">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[var(--color-teal)] bg-[var(--color-teal)]/10 px-2 py-0.5 rounded-full mb-2">
          {event.category}
        </span>
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          {event.title}
        </h1>

        <div className="mt-4 space-y-2.5 text-sm text-[var(--color-ink)]/80">
          <div className="flex items-center gap-2.5">
            <CalendarDays size={18} className="text-[var(--color-gold)]" />
            {dateLabel}
          </div>
          <div className="flex items-center gap-2.5">
            <Clock size={18} className="text-[var(--color-gold)]" />
            {event.time}
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={18} className="text-[var(--color-gold)]" />
            {event.location}
          </div>
        </div>

        <p className="mt-5 text-[var(--color-ink)]/80 leading-relaxed text-sm">
          {event.description}
        </p>

        <button className="mt-6 w-full bg-[var(--color-ink)] text-white font-semibold py-3 rounded-xl active:scale-[0.99] transition-transform">
          I'm going
        </button>
        <p className="text-center text-xs text-[var(--color-ink)]/40 mt-2">
          RSVP is not connected yet — this is a prototype
        </p>
      </div>
    </div>
  );
}
