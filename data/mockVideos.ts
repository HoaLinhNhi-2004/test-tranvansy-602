import { Video } from "@/types";

export const mockVideos: Video[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "@bigbuckbunny",
    description: "Big Buck Bunny — chú thỏ siêu cute #animation #cute",
    likesCount: 1200,
  },
  {
    id: "2",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "@friday_vibes",
    description: "Cuối tuần chill nha mọi người #friday #vibes",
    likesCount: 3400,
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "@sintel_official",
    description: "Trailer Sintel — cinematic vibes #shortfilm",
    likesCount: 8900,
  },
];