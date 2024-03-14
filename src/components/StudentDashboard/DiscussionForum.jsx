// A component for course-related discussions, allowing students to post questions and respond to their peers.

import React, { useState } from 'react';

function DiscussionForum({ posts }) {
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    // Submit new post to the forum
    console.log(newPost);
    setNewPost('');
    // Add logic to append the new post to the posts array
  };

  return (
    <div className="discussion-forum">
      <h2>Discussion Forum</h2>
      <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Write something..."></textarea>
      <button onClick={handlePostSubmit}>Post</button>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <p>{post.content}</p>
            <small>— {post.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscussionForum;
