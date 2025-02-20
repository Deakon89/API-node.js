-- creating database
CREATE DATABASE db;
--tap users
CREATE TABLE users(
  id 	INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL, 
  email VARCHAR(70) UNIQUE NOT NULL 
);
--tap product without image
CREATE TABLE product(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 10
);
-- tap order
CREATE TABLE orders_item(
	id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id)
);
-- add image to tap product
ALTER TABLE product ADD COLUMN image VARCHAR(255);