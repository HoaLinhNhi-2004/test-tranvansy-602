"use client";

import { useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  AlertTriangle,
  Play,
} from "lucide-react";
import { Video } from "@/types";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(video.likesCount);

  useVideoAutoplay(videoRef, { disabled: hasError });

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v || hasError) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      setLikes((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black
                 md:h-[min(100%,90vh)] md:aspect-[9/16] md:w-auto md:rounded-2xl"
    >
      {hasError ? (
        <ErrorFallback />
      ) : (
        <video
          ref={videoRef}
          src={video.videoUrl}
          loop
          playsInline
          muted
          preload="metadata"
          onClick={togglePlay}
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
          onError={() => setHasError(true)}
          className="h-full w-full cursor-pointer object-cover"
        />
      )}

      {!hasError && isPaused && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Play
            size={72}
            className="text-white/80 drop-shadow-2xl"
            fill="currentColor"
          />
        </div>
      )}

      {!hasError && (
        <div className="absolute bottom-4 left-4 right-20 text-white drop-shadow-lg">
          <h3 className="text-lg font-bold">{video.authorName}</h3>
          <p className="mt-1 line-clamp-2 text-sm opacity-90">
            {video.description}
          </p>
        </div>
      )}

      {!hasError && (
        <ActionBar likes={likes} isLiked={isLiked} onLike={toggleLike} />
      )}
    </div>
  );
}

function ErrorFallback() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center
                 gap-3 bg-gradient-to-b from-zinc-800 to-zinc-950 text-zinc-400"
    >
      <AlertTriangle size={56} className="text-yellow-500/80" />
      <p className="text-base font-medium">Video không khả dụng</p>
      <p className="text-xs text-zinc-500">
        Link video có thể đã bị xoá hoặc lỗi kết nối
      </p>
    </div>
  );
}

function ActionBar({
  likes,
  isLiked,
  onLike,
}: {
  likes: number;
  isLiked: boolean;
  onLike: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="absolute bottom-4 right-2 flex flex-col items-center gap-5 text-white">
      <ActionButton
        icon={<Heart size={30} fill={isLiked ? "currentColor" : "none"} />}
        label={formatCount(likes)}
        onClick={onLike}
        active={isLiked}
      />
      <ActionButton icon={<MessageCircle size={30} />} label="128" />
      <ActionButton icon={<Share2 size={28} />} label="Chia sẻ" />
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 transition-transform active:scale-90"
    >
      <span
        className={`rounded-full bg-zinc-800/50 p-2 backdrop-blur
                   ${active ? "text-red-500" : "text-white"}`}
      >
        {icon}
      </span>
      <span className="text-xs font-semibold drop-shadow">{label}</span>
    </button>
  );
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}