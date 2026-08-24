import { X } from 'lucide-react';

export default function VideoModal({
  videoUrl,
  title,
  onClose,
}: {
  videoUrl: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
      >
        <X size={26} />
      </button>
      <div
        className="w-full max-w-sm aspect-[9/16] rounded-xl overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
