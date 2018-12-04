DROP DATABASE IF EXISTS test_example_db;
CREATE DATABASE test_example_db;


DROP DATABASE IF EXISTS tools_exampledb;
CREATE DATABASE tools_exampledb;


DROP DATABASE IF EXISTS tools_example_2db;
CREATE DATABASE tools_example_2db;

DROP DATABASE IF EXISTS toolsDB;
CREATE DATABASE toolsDB;


CREATE TABLE `tools` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `tool` VARCHAR(255),     
    `category` VARCHAR(255),   
    `description` VARCHAR(2550), 
    `price` DECIMAL(10,2),   
    `quantity` INT(11),     
    `owner` VARCHAR(255),   
    `password` VARCHAR(100),
    PRIMARY KEY (id)           
);

--may not need a second table, may need purchaser_name though
CREATE TABLE `purchaser` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `tool` VARCHAR(255),
    `purchaser_name` VARCHAR(255),
    `price` DECIMAL(10,2),      
    `email` VARCHAR(255)
    PRIMARY KEY (id)
);



--list of tools to rent from
--Purchaser purchases a tool
--he does this by entering name
--name is added to purchaser table

--a look at receipt page
--receipt page will display purchaser name, tool purchased, $ amount
