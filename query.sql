CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(200) NOT NULL,
	user_name VARCHAR(200) NOT NULL,
	email VARCHAR(200) NOT NULL,
	password VARCHAR(200) NOT NULL,
	school_name VARCHAR(200),
	avatar VARCHAR(200),
	details VARCHAR(200),
	UNIQUE(email, user_name)
);