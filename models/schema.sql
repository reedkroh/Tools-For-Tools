DROP DATABASE IF EXISTS test_example_db;
CREATE DATABASE test_example_db;


DROP DATABASE IF EXISTS tools_exampledb;
CREATE DATABASE tools_exampledb;

--use to figure out if need to create columns in database first or can you update new columns to previous databse
CREATE DATABASE tools_example_2db;
USE DATABASE tools_example_2db;
--MAYBE DROPPING RESETS DATABASE AND ALLOWS FOR ADDING MORE UNIQUE COLUMNS 



--WHAT WE'RE GOING TO BE USING
DROP DATABASE IF EXISTS toolsDB;
CREATE DATABASE toolsDB;




--trying to add to database (not run this in mysql)
--tools table to choose from
CREATE TABLE `tools` (
    `id` INT NOT NULL AUTO_INCREMENT, --sequelize already creates
    `tool` VARCHAR(255),      --instead of title created with STRING
    `category` VARCHAR(255),   --created with STRING
    `description` VARCHAR(2550), --created with TEXT
    `price` DECIMAL(10,2),   --10 before decimal, 2 after
    `quantity` INT(11),     --need to make in sequelize
    `owner` VARCHAR(255),  --may need to link 2 tables to 
    `password` VARCHAR(100),
    PRIMARY KEY (id)            --sequelize creates
);

--may not need a second table, may need purchaser_name though
CREATE TABLE `purchaser` (
    `id` INT NOT NULL AUTO_INCREMENT, --always there
    `tool` VARCHAR(255),
    `purchaser_name` VARCHAR(255),
    `price` DECIMAL(10,2),      --display how much paid
    `email` VARCHAR(255)
    PRIMARY KEY (id)
);



--list of tools to rent from
--Purchaser purchases a tool
--he does this by entering name
--name is added to purchaser table

--a look at receipt page?
--receipt page will display purchaser name, tool purchased, $ amount
