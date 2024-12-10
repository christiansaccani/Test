import { BlogPost } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

// Funzione per generare una data casuale
const getRandomDate = (): Date => {
  const start = new Date(1970, 0, 1).getTime();
  const end = new Date().getTime();
  const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
  return new Date(randomTimestamp);
};

// Funzione per generare un post casuale
const generateRandomPost = (id: number) => {
  const titles = [
    "Next.js Guide",
    "React Hooks Deep Dive",
    "Understanding TypeScript",
    "Advanced State Management",
    "Deploying with Vercel",
  ];
  const excerpts = [
    "A deep dive into Next.js.",
    "All about React hooks.",
    "Mastering TypeScript.",
    "Advanced concepts in state management.",
    "How to deploy your app on Vercel.",
  ];
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return {
    id,
    title: titles[(id - 1) % titles.length],
    excerpt: excerpts[(id - 1) % titles.length],
    text: text,
    image: `https://picsum.photos/seed/${id}/400/300`,
    publishDate: getRandomDate(),
  } as BlogPost;
};

// Gestione per la richiesta di un singolo post tramite ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const postId = parseInt(id);

  // Se il post con l'ID specificato non esiste
  if (isNaN(postId) || postId <= 0) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }

  // Genera il post casuale in base all'ID
  const post = generateRandomPost(postId);

  return NextResponse.json(post);
}
