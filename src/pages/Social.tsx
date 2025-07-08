import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

type CreatePayload = { text: string; file: File | null };

export default function Social() {
  const token = sessionStorage.getItem('apitoken');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const queryClient = useQueryClient();

  // Fetch existing posts
  const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${baseUrl}/social/posts`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  };

  const { data: posts, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['social', 'posts'],
    queryFn: fetchPosts,
  });

  // Combined mutation: create post then upload attachment
  const createAndUpload = useMutation<any, Error, CreatePayload, unknown>({
    mutationFn: async ({ text, file }: CreatePayload) => {
      // 1) Create post
      const postRes = await fetch(`${baseUrl}/social/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          post_text: text,
          like_active: true,
          comments_active: true,
          visibility: 'friends',
        }),
      });
      if (!postRes.ok) throw new Error(`Create post failed ${postRes.status}`);
      const { id } = await postRes.json();

      // 2) Upload attachment if provided
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const attachRes = await fetch(
          `${baseUrl}/social/posts/${id}/attachments`,
          {
            method: 'POST',
            headers: { Authorization: token ? `Bearer ${token}` : '' },
            body: formData,
          }
        );
        if (!attachRes.ok) throw new Error(`Upload failed ${attachRes.status}`);
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social', 'posts'] });
    },
  });

  // Form state
  const [newText, setNewText] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!newText.trim()) return;
    createAndUpload.mutate({ text: newText, file: newFile });
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 p-4">
      {/* New post form */}
      <div className="border rounded-lg p-4 shadow-sm">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="What's on your mind?"
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={e => setNewFile(e.target.files?.[0] || null)}
          />
        </div>
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleSubmit}
          disabled={createAndUpload.status === 'pending'}
        >
          {createAndUpload.status === 'pending' ? 'Posting...' : 'Post'}
        </button>
        {createAndUpload.status === 'error' && (
          <div className="text-red-600 mt-2">
            {(createAndUpload.error as Error).message}
          </div>
        )}
      </div>

      {/* Existing posts */}
      {posts?.map(post => (
        <div key={post.id} className="border rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">
            {new Date(post.date_creation).toLocaleString()}
          </div>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.post_text }} />

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
