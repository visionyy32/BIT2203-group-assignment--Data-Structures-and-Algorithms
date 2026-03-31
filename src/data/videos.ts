import thumbArrays from "@/assets/thumb-arrays.jpg";
import thumbLinkedList from "@/assets/thumb-linked-list.jpg";
import thumbStacks from "@/assets/thumb-stacks.jpg";
import thumbQueues from "@/assets/thumb-queues.jpg";
import thumbTrees from "@/assets/thumb-trees.jpg";
import thumbHashtable from "@/assets/thumb-hashtable.jpg";

export interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadedAt: string;
  duration: string;
  thumbnail: string;
  description: string;
  category: string;
  videoUrl: string;
}

// Default local sample video. Copy your file
// `Data Structures Explained for Beginners - How I Wish I was Taught - Sajjaad Khader (360p, h264).mp4`
// into the `public/videos` folder (keeping the same filename), and it will
// be used for all demo videos.
const SAMPLE_VIDEO =
  "/videos/Data Structures Explained for Beginners - How I Wish I was Taught - Sajjaad Khader (360p, h264).mp4";

const defaultVideos: Video[] = [
  {
    id: "arrays-101",
    title: "Arrays Explained — The Most Fundamental Data Structure",
    channel: "DS Academy",
    views: "1.2M views",
    uploadedAt: "2 weeks ago",
    duration: "10:05",
    thumbnail: thumbArrays,
    description:
      "Learn how arrays work under the hood — contiguous memory allocation, O(1) access by index, and the trade-offs of insertion and deletion. Perfect for beginners!",
    category: "Arrays",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    id: "linked-list-basics",
    title: "Linked Lists — Nodes, Pointers & When to Use Them",
    channel: "DS Academy",
    views: "890K views",
    uploadedAt: "1 month ago",
    duration: "14:32",
    thumbnail: thumbLinkedList,
    description:
      "Understand singly and doubly linked lists, how they differ from arrays, and when a linked list is the better choice. Includes code examples in Python and C++.",
    category: "Linked Lists",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    id: "stacks-deep-dive",
    title: "Stacks — LIFO Principle, Push, Pop & Real-World Uses",
    channel: "Code With Sarah",
    views: "654K views",
    uploadedAt: "3 weeks ago",
    duration: "11:47",
    thumbnail: thumbStacks,
    description:
      "Dive into the stack data structure. Learn about LIFO ordering, push/pop operations, and real-world applications like undo systems and expression evaluation.",
    category: "Stacks",
    videoUrl:
      "https://www.youtube.com/watch?v=I37kGX-nZEI&list=PLBlnK6fEyqRgWh1emltdMOz8O2m5X3YYn",
  },
  {
    id: "queues-explained",
    title: "Queues — FIFO, Enqueue, Dequeue & Priority Queues",
    channel: "Tech Tutorials",
    views: "432K views",
    uploadedAt: "5 days ago",
    duration: "12:18",
    thumbnail: thumbQueues,
    description:
      "Everything about queues: FIFO ordering, circular queues, double-ended queues (deques), and priority queues. Great for interview preparation!",
    category: "Queues",
    videoUrl: "/videos/videoplayback (2).mp4",
  },
  {
    id: "binary-trees",
    title: "Binary Trees — Traversals, BST & Balancing",
    channel: "DS Academy",
    views: "1.5M views",
    uploadedAt: "2 months ago",
    duration: "18:55",
    thumbnail: thumbTrees,
    description:
      "Master binary trees: in-order, pre-order, post-order traversals, binary search trees, and AVL tree balancing. Animated examples included.",
    category: "Trees",
    videoUrl: "/videos/videoplayback (3).mp4",
  },
  {
    id: "hash-tables",
    title: "Hash Tables — Hashing, Collisions & O(1) Lookups",
    channel: "Code With Sarah",
    views: "780K views",
    uploadedAt: "1 week ago",
    duration: "15:40",
    thumbnail: thumbHashtable,
    description:
      "Learn how hash tables achieve constant-time lookups, handle collisions with chaining and open addressing, and when to use them over other structures.",
    category: "Hash Tables",
    videoUrl: "/videos/videoplayback (4).mp4",
  },
  {
    id: "music-lofi",
    title: "Gata only",
    channel: "YouTube Clone Music",
    views: "2.3M views",
    uploadedAt: "6 months ago",
    duration: "1:00:00",
    thumbnail: thumbQueues,
    description:
      "Chill lo-fi beats to help you focus while working through data structures and algorithms.",
    category: "Music",
    videoUrl: "/videos/videoplayback (6).mp4",
  },
  {
    id: "podcast-deep-dive",
    title: "Wakurugenzi minisodes",
    channel: "YouTube Clone Podcasts",
    views: "540K views",
    uploadedAt: "3 months ago",
    duration: "45:12",
    thumbnail: thumbLinkedList,
    description:
      "Long-form podcast episode discussing system design, scalability, and real-world engineering stories.",
    category: "Podcasts",
    videoUrl: "/videos/videoplayback (7).mp4",
  },
];

// Mutable array so uploaded videos persist during the session
export const videos: Video[] = [...defaultVideos];

export const categories = ["All", "Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Tables", "Music", "Podcasts"];

let idCounter = 0;

export function addUserVideo(params: {
  title: string;
  description: string;
  category: string;
  channel: string;
  videoUrl: string;
  thumbnail: string;
}): Video {
  idCounter++;
  const newVideo: Video = {
    id: `user-video-${idCounter}-${Date.now()}`,
    title: params.title,
    channel: params.channel,
    views: "0 views",
    uploadedAt: "Just now",
    duration: "—",
    thumbnail: params.thumbnail,
    description: params.description,
    category: params.category,
    videoUrl: params.videoUrl,
  };
  videos.unshift(newVideo);
  return newVideo;
}
