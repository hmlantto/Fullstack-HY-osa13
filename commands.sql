CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author text,
	url text NOT NULL,
	title text NOT NULL,
	likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Ann Author', 'http://testurl.com', 'Blog by Ann' );
INSERT INTO blogs (author, url, title) values ('Clara Coder', 'http://testurl.com', 'Super Great Coding Blog' );