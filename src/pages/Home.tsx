import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { getChurchInfo } from '../services/churchInfo';
import { getEvents } from '../services/events';
import { getSermons, getShorts } from '../services/sermons';
import { getLiveStatus, getUpdates } from '../services/live';
import type { ChurchInfo, EventItem, Sermon, ShortVideo, LiveStatus, UpdatePost } from '../types';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import SermonCard from '../components/SermonCard';
import ShortCard from '../components/ShortCard';
import VideoModal from '../components/VideoModal';

export default function Home() {
  const [info, setInfo] = useState<ChurchInfo | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [shorts, setShorts] = useState<ShortVideo[]>([]);
  const [live, setLive] = useState<LiveStatus | null>(null);
  const [updates, setUpdates] = useState<UpdatePost[]>([]);
  const [activeShort, setActiveShort] = useState<ShortVideo | null>(null);

  useEffect(() => {
    getChurchInfo().then(setInfo);
    getEvents().then((e) => setEvents(e.slice(0, 3)));
    getSermons().then((s) => setSermons(s.slice(0, 2)));
    getShorts().then(setShorts);
    getLiveStatus().then(setLive);
    getUpdates().then((u) => setUpdates(u.slice(0, 1)));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-8 text-[var(--color-cream)]"
        style={{ background: 'linear-gradient(180deg, #1B2340 0%, #2B3A63 100%)' }}
      >
        <p className="text-[var(--color-gold-light)] text-sm font-medium tracking-wide">
          Bem-vindo a
        </p>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold leading-tight mt-1">
          {info?.name ?? 'Grace Fellowship Church'}
        </h1>
        <p className="text-[var(--color-cream)]/70 mt-2 text-sm">
          {info?.tagline ?? 'A place to belong, believe, and grow.'}
        </p>

        {live?.isLive && (
          <Link
            to="/live"
            className="mt-5 flex items-center gap-2 bg-[var(--color-rose)]/90 rounded-xl px-3 py-2.5 w-fit"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span className="text-sm font-semibold">Estamos em directo — Participe</span>
          </Link>
        )}

        {!live?.isLive && info && (
          <div className="mt-5 inline-flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 text-sm">
            <Clock size={16} className="text-[var(--color-gold-light)]" />
            <span>
              Próximo culto {formatNextService(live?.startsAt)} &middot;{' '}
              {info.serviceTimes[0]?.day} {info.serviceTimes[0]?.time}
            </span>
          </div>
        )}
      </section>

      <div className="py-6 space-y-8">
        {/* Latest update */}
        {updates[0] && (
          <section className="px-4">
            <Link
              to="/more"
              className="flex gap-3 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 rounded-2xl p-3"
            >
              <div className="w-1 rounded-full bg-[var(--color-gold)]" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-gold)]">
                  Latest update
                </p>
                <p className="font-medium text-[var(--color-ink)] text-sm mt-0.5 truncate">
                  {updates[0].title}
                </p>
              </div>
            </Link>
          </section>
        )}

        {/* Upcoming events */}
        <section>
          <SectionHeader title="Próximos eventos" action={{ label: 'Ver todos', to: '/events' }} />
          <div className="px-4 space-y-2.5">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        {/* Shorts */}
        <section>
          <SectionHeader title="Vídeos curtos" action={{ label: 'Ver todos', to: '/watch' }} />
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
            {shorts.map((s) => (
              <ShortCard key={s.id} short={s} onClick={() => setActiveShort(s)} />
            ))}
          </div>
        </section>

        {/* Recent sermons */}
        <section>
          <SectionHeader title="Poder de Deus" action={{ label: 'Ver todos', to: '/watch' }} />
          <div className="px-4 grid grid-cols-1 gap-3">
            {sermons.map((s) => (
              <SermonCard key={s.id} sermon={s} />
            ))}
          </div>
        </section>

        {/* Contact teaser */}
        <section className="px-4">
          <Link
            to="/more"
            className="flex items-center justify-between bg-[var(--color-teal)] text-white rounded-2xl px-4 py-3.5"
          >
            <span>
              <span className="block text-sm font-semibold">Novo por aqui?</span>
              <span className="block text-xs text-white/80">
                Informação de localização, horários e contactos
              </span>
            </span>
            <ChevronRight size={20} />
          </Link>
        </section>
      </div>

      {activeShort && (
        <VideoModal
          videoUrl={activeShort.videoUrl}
          title={activeShort.title}
          onClose={() => setActiveShort(null)}
        />
      )}
    </div>
  );
}

function formatNextService(iso?: string) {
  if (!iso) return 'soon';
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  return isToday ? 'today' : d.toLocaleDateString('en-US', { weekday: 'long' });
}
