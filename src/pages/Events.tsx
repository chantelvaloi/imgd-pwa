import { useEffect, useMemo, useState } from 'react';
import { getEvents } from '../services/events';
import type { EventItem } from '../types';
import TopBar from '../components/TopBar';
import EventCard from '../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(events.map((e) => e.category)))],
    [events]
  );

  const filtered = filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <div>
      <TopBar title="Eventos" />
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === c
                ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                : 'bg-white text-[var(--color-ink)]/70 border-black/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="px-4 space-y-2.5 pb-4">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-[var(--color-ink)]/50 py-10">
            Sem nenhum evento nesta categoria ainda — check back soon.
          </p>
        )}
        {filtered.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}
