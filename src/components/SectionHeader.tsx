import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  action?: { label: string; to: string };
  children?: ReactNode;
}

export default function SectionHeader({ title, action, children }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between px-4 mb-3">
      <div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          {title}
        </h2>
        {children}
      </div>
      {action && (
        <Link
          to={action.to}
          className="text-sm font-medium text-[var(--color-teal)] hover:underline whitespace-nowrap"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
