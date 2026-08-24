import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, PlayCircle, Radio, Menu } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/events', label: 'Events', icon: CalendarDays, end: false },
  { to: '/watch', label: 'Watch', icon: PlayCircle, end: false },
  { to: '/live', label: 'Live', icon: Radio, end: false },
  { to: '/more', label: 'More', icon: Menu, end: false },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-ink)] border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <ul className="flex justify-between px-2">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] ${
                  isActive ? 'text-[var(--color-gold-light)]' : 'text-white/60'
                }`
              }
            >
              <Icon size={22} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
