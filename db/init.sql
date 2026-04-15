-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS appdb;

-- Use the database
USE appdb;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Optional: Insert sample data (for testing only)
INSERT INTO users (name, email) VALUES
('admin', 'admin@example.com'),
('testuser', 'test@example.com');