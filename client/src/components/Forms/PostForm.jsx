// App.jsx
import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    // Here you would typically handle the form submission
    console.log('Posting article:', { title, content });
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <div className="m-3">
      {/* Button to trigger modal */}
      <button 
        type="button" 
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Article
      </button>

      {/* Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1" 
        aria-labelledby="articleModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="articleModalLabel">New Article</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="articleTitle" className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="articleTitle" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="articleContent" className="form-label">Content</label>
                  <textarea 
                    className="form-control" 
                    id="articleContent" 
                    rows="5" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article here..."
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop */}
      {showModal && (
        <div 
          className="modal-backdrop fade show"
          onClick={handleCancel}
        ></div>
      )}
    </div>
  );
}

export default App;