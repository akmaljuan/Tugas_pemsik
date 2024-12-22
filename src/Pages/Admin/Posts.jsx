import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Posts
    const fetchPosts = async () => {
        try {
            console.log('Fetching posts...'); // Debug log
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log('Posts fetched:', response.data); // Debug log
            setPosts(response.data.slice(0, 10));
        } catch (error) {
            console.error('Error fetching posts:', error); // Debug log
            setError('Failed to fetch posts');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data posts'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Debug render
    console.log('Current state:', { posts, loading, error }); // Debug log

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Daftar Posts</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">Loading...</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600">{post.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Posts;
