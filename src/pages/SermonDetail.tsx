import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, User, Calendar } from 'lucide-react';
import { getSermonById } from '../services/sermons';
import type { Sermon } from '../types';
import TopBar from '../components/TopBar';

export default function SermonDetail() {
  const { id } = useParams();
  const [sermon, setSermon] = useState<Sermon | null | undefined>(undefined);

  useEffect(() => {
    if (id) getSermonById(id).then(setSermon);
  }, [id]);

  if (sermon === undefined) return <TopBar title="Message" showBack />;

  if (!sermon) {
    return (
      <div>
        <TopBar title="Message" showBack />
        <div className="px-4 py-10 text-center">
          <p className="text-[var(--color-ink)]/60">Não foi possível encontrar essa mensagem.</p>
          <Link to="/watch" className="text-[var(--color-teal)] font-medium mt-2 inline-block">
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  const dateLabel = new Date(sermon.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      <TopBar title="Mensagem" showBack />
      <div className="aspect-video bg-black">
        <iframe
          src={sermon.videoUrl}
          title={sermon.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-4 py-5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-gold)]">
          {sermon.series}
        </span>
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] mt-0.5">
          {sermon.title}
        </h1>

        <div className="mt-4 space-y-2.5 text-sm text-[var(--color-ink)]/80">
          <div className="flex items-center gap-2.5">
            <User size={17} className="text-[var(--color-teal)]" />
            {sermon.speaker}
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar size={17} className="text-[var(--color-teal)]" />
            {dateLabel}
          </div>
          <div className="flex items-center gap-2.5">
            <BookOpen size={17} className="text-[var(--color-teal)]" />
            {sermon.scripture}
          </div>
        </div>

        <p className="mt-5 text-[var(--color-ink)]/80 leading-relaxed text-sm">
          {sermon.description}
        </p>
      </div>
    </div>
  );
}
