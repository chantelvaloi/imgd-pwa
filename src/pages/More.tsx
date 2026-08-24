import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getChurchInfo } from '../services/churchInfo';
import { getUpdates } from '../services/live';
import type { ChurchInfo, UpdatePost } from '../types';
import TopBar from '../components/TopBar';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../components/SocialIcons';

const socialIcons: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};

export default function More() {
  const [info, setInfo] = useState<ChurchInfo | null>(null);
  const [updates, setUpdates] = useState<UpdatePost[]>([]);

  useEffect(() => {
    getChurchInfo().then(setInfo);
    getUpdates().then(setUpdates);
  }, []);

  if (!info) return <TopBar title="More" />;

  return (
    <div>
      <TopBar title="More" />

      {/* About */}
      <section className="px-4 py-5 border-b border-black/5">
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-2">
          About {info.name}
        </h2>
        <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">{info.about}</p>
      </section>

      {/* Service times */}
      <section className="px-4 py-5 border-b border-black/5">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-3 flex items-center gap-2">
          <Clock size={18} className="text-[var(--color-gold)]" /> Service times
        </h2>
        <div className="space-y-2">
          {info.serviceTimes.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white border border-black/5 rounded-xl px-3.5 py-2.5"
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">{s.label}</p>
                <p className="text-xs text-[var(--color-ink)]/50">{s.day}</p>
              </div>
              <span className="text-sm font-semibold text-[var(--color-teal)]">{s.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 py-5 border-b border-black/5">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-3">
          Get in touch
        </h2>
        <div className="space-y-2.5">
          <a
            href={info.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 text-sm text-[var(--color-ink)]/80"
          >
            <MapPin size={18} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
            {info.address}
          </a>
          <a
            href={`tel:${info.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 text-sm text-[var(--color-ink)]/80"
          >
            <Phone size={18} className="text-[var(--color-gold)] shrink-0" />
            {info.phone}
          </a>
          <a
            href={`mailto:${info.email}`}
            className="flex items-center gap-3 text-sm text-[var(--color-ink)]/80"
          >
            <Mail size={18} className="text-[var(--color-gold)] shrink-0" />
            {info.email}
          </a>
        </div>

        <div className="flex gap-3 mt-4">
          {info.socials.map((s) => {
            const Icon = socialIcons[s.platform] ?? InstagramIcon;
            return (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.platform}
                className="w-10 h-10 rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </section>

      {/* Updates */}
      <section className="px-4 py-5">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-3">
          Announcements
        </h2>
        <div className="space-y-3">
          {updates.map((u) => (
            <div key={u.id} className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              {u.image && (
                <img src={u.image} alt="" className="w-full aspect-[16/9] object-cover" loading="lazy" />
              )}
              <div className="p-3.5">
                <p className="text-xs text-[var(--color-ink)]/40">
                  {new Date(u.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <h3 className="font-semibold text-[var(--color-ink)] text-sm mt-0.5">{u.title}</h3>
                <p className="text-sm text-[var(--color-ink)]/70 mt-1 leading-relaxed">{u.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
