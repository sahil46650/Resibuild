import React, { useState, useEffect } from "react";
import axios from "axios";
import avtar from '../../assets/images/avtar.png'

const Comment = ({ postId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [comments, setComments] = useState([]);

  const username = "aspire.developer3@gmail.com";
  const appPassword = "3JqY 8K2G GvsU ZgoT nAJD s4Fd";
  const authHeader = "Basic " + btoa(`${username}:${appPassword}`);

  useEffect(() => {
    if (postId) {
      axios
        .get(`https://resi.build/backend/wp-json/wp/v2/comments?post=${postId}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error("Failed to load comments:", error);
        });
    }
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://resi.build/backend/wp-json/wp/v2/comments",
        {
          post: postId,
          author_name: formData.name,
          author_email: formData.email,
          content: formData.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      setFormData({ name: "", email: "", message: "" });
      setComments([...comments, response.data]);
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <div id="comments-section">
      <div id="comment" className="comments">
        <h3>{comments.length} Comments</h3>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className="d-flex">
                <div className="flex-shrink-0 avtar-img">
                  <img
                    src={avtar} // Replace with actual avatar source if available
                    alt="User Avatar"
                  />
                </div>
                <div className="comment-details ms-3">
                  <span>{new Date(comment.date).toLocaleDateString()}</span>
                  <h4>{comment.author_name}</h4>
                  <p>{comment.content.rendered.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                  {/* <a href="#reply" className="reply">
                    Reply
                    <i className="ri-arrow-right-s-line"></i>
                  </a> */}
                </div>
              </li>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </ul>
      </div>

      <div id="reply" className="leave-form">
        <h3>Leave A Reply</h3>
        <p>Your email address will not be published. Required fields are marked *</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="message">Comment *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  required
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-0">
                <button type="submit" className="default-btn">
                  Post A Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
