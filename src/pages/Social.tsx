import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Define the Post type
interface Post {
  id: number;
  userid_id: number;
  post_text: string;
  date_creation: string;
  attachments: string[];
  like: number;
  comments: number;
  visibility: string;
}

export default function Social() {
  const token = sessionStorage.getItem('apitoken');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // 1) Adjunk vissza Promise<Post[]>
  const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${baseUrl}/social/posts`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Network response was not ok (${res.status})`);
    }
    return res.json();
  };

  // 2) Használjuk a generikus overload-ot: <TData, TError>
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['social', 'posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error)   return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 p-4">
      {/* 3) posts most Post[] | undefined; a ?. biztosítja, hogy ne fusson, ha még nincs adat */}
      {posts?.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">
            {new Date(post.date_creation).toLocaleString()}
          </div>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: post.post_text }}
          />

          {/* 4) attachments is string[], így a map callbacknek már van típusa */}
          {post.attachments.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {post.attachments.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`attachment-${idx}`}
                  className="max-h-48 object-cover rounded"
                />
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center space-x-4 text-gray-700">
            <span>{post.like} Likes</span>
            <span>{post.comments} Comments</span>
          </div>
        </div>
      ))}
    </div>
  );
}
