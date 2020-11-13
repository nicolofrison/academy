SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Details;
DROP TABLE IF EXISTS Episodes;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Series;
DROP TABLE IF EXISTS Favorites;
DROP TABLE IF EXISTS Likes;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Views;
DROP TABLE IF EXISTS Users;

DROP VIEW IF EXISTS V_Episodes;
DROP VIEW IF EXISTS V_Movies;
DROP VIEW IF EXISTS V_Series;

CREATE TABLE Details (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  genre VARCHAR(50) NOT NULL,
  duration TIME NOT NULL,
  actors TEXT NOT NULL,
  release_date DATE,
  creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Episodes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  details_id INT NOT NULL,
  quality VARCHAR(5) NOT NULL,
  season INT NOT NULL,
  episode INT NOT NULL,
  series_id INT NOT NULL
);

CREATE TABLE Movies (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  details_id INT NOT NULL,
  quality VARCHAR(5) NOT NULL
);

CREATE TABLE Series (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  details_id INT NOT NULL
);

CREATE TABLE Favorites (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  movies_id INT,
  series_id INT
);

CREATE TABLE Likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  episodes_id INT,
  movies_id INT,
  series_id INT
);

CREATE TABLE Reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  movies_id INT,
  series_id INT,
  rating INT(1) NOT NULL,
  description TEXT
);

CREATE TABLE Views (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  episodes_id INT,
  movies_id INT
);

CREATE TABLE Users (
  email VARCHAR(50) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  password VARCHAR(50) NOT NULL,
  newsletter TINYINT(1) NOT NULL DEFAULT false
);

ALTER TABLE `Episodes` ADD CONSTRAINT `FK_episodes_details_id` FOREIGN KEY (`details_id`) REFERENCES `Details`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Movies` ADD CONSTRAINT `FK_movies_details_id` FOREIGN KEY (`details_id`) REFERENCES `Details`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Series` ADD CONSTRAINT `FK_series_details_id` FOREIGN KEY (`details_id`) REFERENCES `Details`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Episodes` ADD CONSTRAINT `FK_episodes_series_id` FOREIGN KEY (`series_id`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Favorites` ADD CONSTRAINT `FK_favorites_users_email` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Favorites` ADD CONSTRAINT `FK_favorites_movies_id` FOREIGN KEY (`movies_id`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Favorites` ADD CONSTRAINT `FK_favorites_series_id` FOREIGN KEY (`series_id`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Likes` ADD CONSTRAINT `FK_likes_users_email` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Likes` ADD CONSTRAINT `FK_likes_episodes_id` FOREIGN KEY (`episodes_id`) REFERENCES `Episodes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Likes` ADD CONSTRAINT `FK_likes_movies_id` FOREIGN KEY (`movies_id`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Likes` ADD CONSTRAINT `FK_likes_series_id` FOREIGN KEY (`series_id`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Reviews` ADD CONSTRAINT `FK_reviews_users_email` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Reviews` ADD CONSTRAINT `FK_reviews_movies_id` FOREIGN KEY (`movies_id`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Reviews` ADD CONSTRAINT `FK_reviews_series_id` FOREIGN KEY (`series_id`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Views` ADD CONSTRAINT `FK_views_users_email` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Views` ADD CONSTRAINT `FK_views_episodes_id` FOREIGN KEY (`episodes_id`) REFERENCES `Episodes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Views` ADD CONSTRAINT `FK_views_movies_id` FOREIGN KEY (`movies_id`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE VIEW `V_Episodes`  AS SELECT `D`.*, `E`.`season`, `E`.`episode`, `E`.`quality`, COUNT(`L`.`id`) AS `likes`, COUNT(`V`.`id`) AS `views` FROM `Details` `D` INNER JOIN `Episodes` `E` ON `D`.`id` = `E`.`details_id` INNER JOIN `Likes` `L` ON `E`.`id` = `L`.`episodes_id` INNER JOIN `Views` `V` ON `E`.`id` = `V`.`episodes_id`;
CREATE VIEW `V_Movies`  AS SELECT `D`.*, `M`.`quality`, COUNT(`L`.`id`) AS `likes`, AVG(`R`.`rating`) AS `rating`, COUNT(`V`.`id`) AS `views` FROM `Details` `D` INNER JOIN `Movies` `M` ON `D`.`id` = `M`.`details_id` INNER JOIN `Likes` `L` ON `M`.`id` = `L`.`episodes_id` INNER JOIN `Reviews` `R` ON `M`.`id` = `R`.`movies_id` INNER JOIN `Views` `V` ON `M`.`id` = `V`.`movies_id`;
CREATE VIEW `V_Series`  AS SELECT `D`.*, MAX(DISTINCT `E`.`season`) AS `seasons_number`, COUNT(`L`.`id`) AS `likes`, AVG(`R`.`rating`) AS `rating` FROM `Details` `D` INNER JOIN `Series` `S` ON `D`.`id` = `S`.`details_id` INNER JOIN `Episodes` `E` ON `S`.`id` = `E`.`series_id` INNER JOIN `Likes` `L` ON `S`.`id` = `L`.`series_id` INNER JOIN `Reviews` `R` ON `S`.`id` = `R`.`series_id`;

SET FOREIGN_KEY_CHECKS = 1;