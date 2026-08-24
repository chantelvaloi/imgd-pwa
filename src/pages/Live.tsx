import { useEffect, useState } from 'react';
import { Radio, Calendar, PlayCircle } from 'lucide-react';
import { getLiveStatus } from '../services/live';
import type { LiveStatus } from '../types';
import TopBar from '../components/TopBar';

export default function Live() {
  const [live, setLive] = useState<LiveStatus | null>(null);

  useEffect(() => {
    getLiveStatus().then(setLive);
  }, []);

  if (!live) return <TopBar title="Live" />;

  const nextDate = new Date(live.startsAt);
  const dateLabel = nextDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const timeLabel = nextDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div>
      <TopBar title="Live" />

      {live.isLive ? (
        <>
          <div className="aspect-video bg-black">
            <iframe
              src={`${live.streamUrl}?autoplay=1`}
              title={live.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="px-4 py-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-rose)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rose)] animate-pulse" />
              AO VIVO
            </span>
            <h1 className="font-[var(--font-display)] text-xl font-semibold mt-1">
              {live.title}
            </h1>
          </div>
        </>
      ) : (
        <div className="px-4 py-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-ink)]/5 flex items-center justify-center mx-auto mb-4">
            <Radio size={28} className="text-[var(--color-ink)]/40" />
          </div>
          <h1 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
            We're not live right now
          </h1>
          <p className="text-[var(--color-ink)]/60 text-sm mt-1.5 flex items-center justify-center gap-1.5">
            <Calendar size={14} /> Next: {live.title} &middot; {dateLabel} at {timeLabel}
          </p>

          {live.replayUrl && (
            <div className="mt-8 text-left">
              <h2 className="text-sm font-semibold text-[var(--color-ink)]/70 mb-2 flex items-center gap-1.5">
                <PlayCircle size={16} /> Acompanhe o último culto
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={live.replayUrl}
                  title="Last service replay"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
