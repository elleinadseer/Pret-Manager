/* Drop and create employee_db to avoid duplication */
DROP DATABASE IF EXISTS coffee_db;
CREATE DATABASE coffee_db;

USE coffee_db;

/* Create department, role and employee tables
Information same as task requirements */ 
CREATE TABLE coffee_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    coffee_count INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

