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

const SAMPLE_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

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
    videoUrl: SAMPLE_VIDEO,
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
    videoUrl: SAMPLE_VIDEO,
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
    videoUrl: SAMPLE_VIDEO,
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
    videoUrl: SAMPLE_VIDEO,
  },
];

// Mutable array so uploaded videos persist during the session
export const videos: Video[] = [...defaultVideos];

export const categories = ["All", "Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Tables"];

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
