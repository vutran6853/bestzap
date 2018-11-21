INSERT INTO	reviews(place_id, user_review_rate, user_review_text, user_review_time)
VALUES ($1, $2, $3, NOW())
RETURNING  place_id, user_review_rate, user_review_text, user_review_time;
