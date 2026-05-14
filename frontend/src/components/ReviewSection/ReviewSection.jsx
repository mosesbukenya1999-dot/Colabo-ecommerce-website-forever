import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ReviewSection.css";

const ReviewsSection = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const { productId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews/${productId}`);
      if (res.data.success) {
        // Ensure rating is a number
        const cleanReviews = res.data.reviews.map(r => ({
          ...r,
          rating: Number(r.rating)
        }));
        setReviews(cleanReviews);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Submit review
  const submitReview = async (e) => {
    e.preventDefault();
    if (!rating || !text) {
      setError("Please provide rating and review text");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${backendUrl}/api/reviews/${productId}`,
        { rating, text, productId },
        { headers: { token } }
      );

      if (res.data.success) {
        // Reset form
        setRating(0);
        setText("");
        fetchReviews(); // refresh reviews
      } else {
        setError(res.data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit review");
    }
    setLoading(false);
  };

  return (
    <div className="reviews-section">
      <h3>Customer Reviews</h3>

      {/* Review Form */}
      {token && (
        <form className="review-form" onSubmit={submitReview}>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map((i) => (
              <i
                key={i}
                className={`bi bi-star-fill ${i <= (hoverRating || rating) ? "filled" : ""}`}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
              ></i>
            ))}
          </div>
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      )}

      {/* Reviews List */}
      <div className="reviews-list">

                    {
                        token=== ""? 
                        (
                            <>
                            <p>Please Login to submit Review!!!</p>
                            <button onClick={()=> navigate("/login")} className="btn btn-danger">Login</button>
                            </>
                        ):
                        (
                            <>

{reviews.length === 0 ? (
  <p>No reviews yet. Be the first!</p>
) : (
  reviews
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((r) => (
      <div key={r._id} className="review-card">
        <div className="review-header">
          <span className="review-user">{r.userName}</span>
          <span className="review-date">
            {new Date(r.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="review-rating">
{[1, 2, 3, 4, 5].map((i) => (
<i
key={i}
className={`bi ${i <= Number(r.rating) ? "bi-star-fill filled" : "bi-star"}`}
></i>
))}
</div>
        <p className="review-text">{r.text}</p>
      </div>
    ))
)}
                            </>
                        )
                    }

      </div>
    </div>
  );
};

export default ReviewsSection;