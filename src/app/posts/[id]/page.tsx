"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BlogPost = {
  id: string;
  title: string;
  text: string;
  image: string;
  publishDate: string;
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Errore durante il fetch del post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);


  if (loading) {
    return <div style={{ margin: "4rem" }}>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="detailContainer">
      <h2>{post.title}</h2>
      <img src={post.image} alt={post.title} className="detailImg" />
      <small>Published on: {new Date(post.publishDate).toLocaleDateString()}</small>
      <p className="detailText">{post.text}</p>
    </div>
  );
}
