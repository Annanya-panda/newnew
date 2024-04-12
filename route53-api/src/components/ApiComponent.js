import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiComponent = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                console.log(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchPosts();
        fetchComments();
    }, []);

    return (
        <div>
            <h1>API Data</h1>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ApiComponent;
