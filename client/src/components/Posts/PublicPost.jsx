
import React from 'react';
import './PublicPost.css';

export default function PublicPost({ data }) {
  const { alumniName, avatarUrl, content } = data || {};

  return (
    <div className="public-post">
      <div className="post-header">
        <img 
          src={avatarUrl} 
          className="rounded-circle avatar"
        />
        <div className="header-info">
          <p className="alumni-name">{alumniName}</p>
        </div>
      </div>
      
      <div className="post-content">
        <p>{content}</p>
      </div>
      
      <div className="post-actions">
        <button type="button" className="btn btn-light action-btn"> Like
        </button>
        <button type="button" className="btn btn-light action-btn"> Comment
        </button>
      </div>
    </div>
  );
}
