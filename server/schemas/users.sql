-- DROP DATABASE IF EXISTS dsri-db;
-- CREATE DATABASE dsri-db;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
   email VARCHAR(255),
   username VARCHAR(255) NOT NULL,
   employee_id VARCHAR(255) NOT NULL,
   affiliation VARCHAR(255) NOT NULL,
   project_type VARCHAR(255),
   project_description VARCHAR(255),
   git_repo VARCHAR(255),
   project_id VARCHAR(255),
   hear_about_us VARCHAR(255),
   gdpr VARCHAR(255) NOT NULL,
   comment VARCHAR(255),
   access_enabled BOOLEAN,
   created_at datetime not null default current_timestamp,
   PRIMARY KEY (email)
);

-- DROP TABLE IF EXISTS departments;
-- CREATE TABLE departments(
--    id VARCHAR(255),
--    label VARCHAR(255),
--    PRIMARY KEY (id)
-- );

DROP TABLE IF EXISTS gpu_schedule;
CREATE TABLE gpubooking(
   user_email VARCHAR(255),
   gpu_id VARCHAR(255),
   starting_date VARCHAR(255),
   ending_date VARCHAR(255),
   project_id VARCHAR(255),
   PRIMARY KEY (user_email, gpu_id, starting_date, ending_date)
);