import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  right?: ReactNode;
}

export default function TopBar({ title, showBack = false, right }: TopBarProps) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-cream)]/95 backdrop-blur border-b border-black/5 pt-[env(safe-area-inset-top)]">
      <div className="flex items-center gap-2 px-4 h-14">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="-ml-2 p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <h1 className="font-[var(--font-display)] text-lg font-semibold truncate flex-1">
          {title}
        </h1>
        {right}
      </div>
    </header>
  );
}
