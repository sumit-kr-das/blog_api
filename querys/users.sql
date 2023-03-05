-- USER TABLES
CREATE TABLE users (
	ID SERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	UNIQUE(email, user_name)
);

	-- school_name VARCHAR(255),
	-- avatar VARCHAR(255),
	-- details VARCHAR(255),

CREATE TABLE roles (
	ID SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255)
);

CREATE TABLE user_roles (
	ID SERIAL NOT NULL,
	user_id INT PRIMARY KEY,
	role_id INT,
	FOREIGN KEY(user_id) REFERENCES users(ID),
	FOREIGN KEY(role_id) REFERENCES roles(ID)
);


SELECT * FROM users;

INSERT INTO users(user_name, name, email, password)
VALUES ('sumit2001','Sumit Kumar Das', 'sumit@gmail.com', 'sumit2001'),
		('sneha2005','Snehasis Das','snehasis@gmail.com', 'snehasis2001');

		INSERT INTO roles(name) VALUES('admin'),('user');


SELECT * FROM roles;

INSERT INTO user_roles(user_id,role_id) VALUES (1,1),(2,2);

SELECT * FROM user_roles;

DELETE FROM user_roles WHERE id IN (3);