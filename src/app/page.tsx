
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  publishDate: string;
};

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Errore durante il fetch dei post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</div>;
  }

  return (
    <div>
      <div id="postsContainer" className="postsGrid">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="postCard">
            <img src={post.image} alt={post.title} className="cardImg" />
            <h2 className="cardTitle">{post.title}</h2>
            <p className="cardExcerpt">{post.excerpt}</p>
            <small className="date">
              Published on: {new Date(post.publishDate).toLocaleDateString()}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
}
