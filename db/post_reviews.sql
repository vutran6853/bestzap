INSERT INTO	reviews(place_id, user_review_id, user_review_rate, user_review_text, user_review_time, user_review_url)
VALUES ($1, $2, $3, $4, NOW(), $5)
ON CONFLICT(user_review_id)
DO NOTHING;