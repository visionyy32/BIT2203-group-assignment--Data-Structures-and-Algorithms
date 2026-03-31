## YouTube Clone — Data Structures Learning Hub

This project is a small "YouTube-style" React app built with Vite and TypeScript. It’s designed as a visual way to explore classic data structures (arrays, linked lists, stacks, queues, trees, hash tables) using a familiar video interface.

When you click on a card like "Arrays Explained" or "Queues — FIFO", you’re not just playing a video — you’re also interacting with a few simple data-structure concepts under the hood.

---

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui components
- React Router for pages (Home, Watch, Upload, NotFound)

To run locally:

```bash
npm install
npm run dev
```

Then open the printed localhost URL (for example `http://localhost:8081/`).

---

## Core Data Structures in This App

All of the “content” in the app lives in a single source of truth: the videos array in [src/data/videos.ts](src/data/videos.ts).

```ts
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

export const videos: Video[] = [...defaultVideos];
```

### 1. Arrays

- The home feed is literally just an **array of videos**.
- Filtering by category or search runs simple array operations:
	- `filter` by `category` ("Arrays", "Stacks", "Queues", etc.).
	- `filter` + `includes` for full-text search in title/description.
- This mimics how a real video service would keep a list of content in memory before applying more advanced indexing.

Relevant code:
- Video model and data: [src/data/videos.ts](src/data/videos.ts)
- Home page filtering logic: [src/pages/Index.tsx](src/pages/Index.tsx)

### 2. Linked Lists (Conceptual)

- There is a dedicated "Linked Lists" video in the catalog.
- In a real backend, a **linked list** might be used for play queues or undo/redo history.
- In this frontend demo, we represent each video as a node-like object in the `videos` array, and we navigate between them using routing (`/watch/:id`) and filtering instead of explicit next/prev pointers.

Relevant code:
- Linked-list video entry in [src/data/videos.ts](src/data/videos.ts)
- Video detail page: [src/pages/Watch.tsx](src/pages/Watch.tsx)

### 3. Stacks (LIFO)

- The "Stacks — LIFO" concept is showcased as its own video.
- A real YouTube-like system might use a **stack** for navigation history (back stack) or temporary operations.
- In this app, the idea of LIFO is explained by the video content itself, while React Router handles the history stack for you in the browser.

Relevant code:
- Stacks video entry: [src/data/videos.ts](src/data/videos.ts)
- Player UI and actions (like/subscribe): [src/components/VideoPlayer.tsx](src/components/VideoPlayer.tsx)

### 4. Queues (FIFO)

- The "Queues — FIFO" video is wired to your own local MP4.
- Conceptually, a video **watch queue** behaves like a FIFO queue: first video added is the first played.
- In this demo, the Suggested videos sidebar behaves like a linear queue of "up next" items, derived from the same `videos` array.

Relevant code:
- Queues video entry: [src/data/videos.ts](src/data/videos.ts)
- Suggested videos list: [src/components/SuggestedVideos.tsx](src/components/SuggestedVideos.tsx)

### 5. Trees (Binary Trees)

- The "Binary Trees" video in the catalog explains traversal, BSTs, and balancing.
- Real recommendation systems often model content relationships in **graph** or **tree-like** structures.
- In this simple clone, the concept is represented by the video itself; structurally, we still use a flat array of videos, but you can imagine categories forming a tree:
	- Root: "All"
	- Children: Arrays, Stacks, Queues, Trees, Hash Tables, Music, Podcasts

Relevant code:
- Trees video entry: [src/data/videos.ts](src/data/videos.ts)
- Category chips: [src/components/CategoryChips.tsx](src/components/CategoryChips.tsx)

### 6. Hash Tables

- The "Hash Tables" video explains how to get O(1) lookups using hashing.
- In a real service, user IDs, video IDs, and sessions are often stored in **hash maps** for fast access.
- On this frontend, we simulate the idea by:
	- Giving each video a unique `id`.
	- Looking up a single video by id when you navigate to `/watch/:id` using `Array.prototype.find`. In a production system this would likely be a dictionary / hash map instead.

Relevant code:
- Hash tables video entry: [src/data/videos.ts](src/data/videos.ts)
- Video lookup by id: [src/pages/Watch.tsx](src/pages/Watch.tsx)

---

## Custom Content (Local & YouTube Videos)

The app is wired to your own local MP4 files and one YouTube playlist:

- Arrays, Queues, Trees, Hash Tables, Music, and Podcasts use local files from `public/videos`.
- The Stacks/LIFO video uses an embedded YouTube URL, rendered via an `<iframe>` when `videoUrl` is a YouTube link.

Relevant code:
- Video player (HTML5 video vs YouTube iframe): [src/components/VideoPlayer.tsx](src/components/VideoPlayer.tsx)
- Local file mappings: [src/data/videos.ts](src/data/videos.ts)

To add more custom videos, you can:
1. Drop an MP4 into `public/videos/`.
2. Add a new entry to `defaultVideos` in [src/data/videos.ts](src/data/videos.ts) with `videoUrl` set to `/videos/your-file-name.mp4` and choose a `category`.

---

## How This Mirrors a Real YouTube Backend

While this is a simplified frontend-only clone, it mirrors a few real-world ideas:

- **Content catalog** → `videos: Video[]` acts like a tiny in-memory content database.
- **Indexing and search** → filtering the array by `category` and text search simulates basic indexing.
- **Routing & IDs** → video `id` fields and the `/watch/:id` route mimic how deep links to videos work.
- **Playlists / categories** → categories like Arrays, Stacks, Queues, Music, Podcasts feel like separate shelves or playlists.

You can treat this project both as a mini YouTube-style UI and as a concrete, visual way to talk about data structures in the context of a product you already understand.

