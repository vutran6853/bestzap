CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	place_id VARCHAR(255) UNIQUE,
	user_review_id	VARCHAR(255) UNIQUE,
	user_review_rate INTEGER,
	user_review_text TEXT,
	user_review_time TIMESTAMP WITHOUT TIME ZONE,
	user_review_url VARCHAR(255)
)

INSERT INTO	reviews(place_id, user_review_id, user_review_rate, user_review_text, user_review_time, user_review_url)
VALUES ($1, $2, $3, $4, NOW(), $5)
ON CONFLICT(user_review_id)
DO NOTHING;

