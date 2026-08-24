import { useEffect, useState } from 'react';
import { getSermons, getShorts } from '../services/sermons';
import type { Sermon, ShortVideo } from '../types';
import TopBar from '../components/TopBar';
import SermonCard from '../components/SermonCard';
import ShortCard from '../components/ShortCard';
import VideoModal from '../components/VideoModal';

export default function Watch() {
  const [tab, setTab] = useState<'sermons' | 'shorts'>('sermons');
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [shorts, setShorts] = useState<ShortVideo[]>([]);
  const [activeShort, setActiveShort] = useState<ShortVideo | null>(null);

  useEffect(() => {
    getSermons().then(setSermons);
    getShorts().then(setShorts);
  }, []);

  return (
    <div>
      <TopBar title="Assista" />
      <div className="flex gap-2 px-4 py-3">
        {(['sermons', 'shorts'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors capitalize ${
              tab === t
                ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                : 'bg-white text-[var(--color-ink)]/70 border-black/10'
            }`}
          >
            {t === 'sermons' ? 'Sermons' : 'Shorts'}
          </button>
        ))}
      </div>

      {tab === 'sermons' && (
        <div className="px-4 grid grid-cols-1 gap-3 pb-4">
          {sermons.map((s) => (
            <SermonCard key={s.id} sermon={s} />
          ))}
        </div>
      )}

      {tab === 'shorts' && (
        <div className="px-4 grid grid-cols-2 gap-3 pb-4">
          {shorts.map((s) => (
            <ShortCard key={s.id} short={s} onClick={() => setActiveShort(s)} className="w-full" />
          ))}
        </div>
      )}

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
