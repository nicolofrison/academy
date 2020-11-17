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
  title VARCHAR(50) NOT NULL,
  description LONGTEXT NOT NULL,
  genre VARCHAR(50) NOT NULL,
  duration INT(3) NOT NULL,
  actors TEXT NOT NULL,
  releaseDate DATE,
  creationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Episodes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  detailsId INT NOT NULL,
  quality VARCHAR(5) NOT NULL,
  seriesId INT NOT NULL,
  seasonNumber INT NOT NULL,
  episodeNumber INT NOT NULL
);

CREATE TABLE Movies (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  detailsId INT NOT NULL,
  quality VARCHAR(5) NOT NULL
);

CREATE TABLE Series (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  detailsId INT NOT NULL
);

CREATE TABLE Favorites (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usersId INT NOT NULL,
  moviesId INT,
  seriesId INT,
  UNIQUE(usersId, moviesId, seriesId)
);

CREATE TABLE Likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usersId INT NOT NULL,
  episodesId INT,
  moviesId INT,
  seriesId INT
);

CREATE TABLE Reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usersId INT NOT NULL,
  moviesId INT,
  seriesId INT,
  rating INT(1) NOT NULL,
  description TEXT
);

CREATE TABLE Views (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usersId INT NOT NULL,
  episodesId INT,
  moviesId INT,
  UNIQUE(usersId, episodesId, moviesId)
);

CREATE TABLE Users (
  id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  birthDate DATE NOT NULL,
  password VARCHAR(50) NOT NULL,
  newsletter TINYINT(1) NOT NULL DEFAULT false
);

ALTER TABLE `Episodes` ADD CONSTRAINT `FKEpisodesDetailsId` FOREIGN KEY (`detailsId`) REFERENCES `Details`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Movies` ADD CONSTRAINT `FKMoviesDetailsId` FOREIGN KEY (`detailsId`) REFERENCES `Details`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Series` ADD CONSTRAINT `FKSeriesDetailsId` FOREIGN KEY (`detailsId`) REFERENCES `Details`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Episodes` ADD CONSTRAINT `FKEpisodesSeriesId` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Favorites` ADD CONSTRAINT `FKFavoritesUsersId` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Favorites` ADD CONSTRAINT `FKFavoritesMoviesId` FOREIGN KEY (`moviesId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Favorites` ADD CONSTRAINT `FKFavoritesSeriesId` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Likes` ADD CONSTRAINT `FKLikesUsersId` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Likes` ADD CONSTRAINT `FKLikesEpisodesId` FOREIGN KEY (`episodesId`) REFERENCES `Episodes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Likes` ADD CONSTRAINT `FKLikesMoviesId` FOREIGN KEY (`moviesId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Likes` ADD CONSTRAINT `FKLikesSeriesId` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Reviews` ADD CONSTRAINT `FKReviewsUsersId` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Reviews` ADD CONSTRAINT `FKReviewsMoviesId` FOREIGN KEY (`moviesId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Reviews` ADD CONSTRAINT `FKReviewsSeriesId` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Views` ADD CONSTRAINT `FKViewsUsersId` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Views` ADD CONSTRAINT `FKViewsEpisodesId` FOREIGN KEY (`episodesId`) REFERENCES `Episodes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Views` ADD CONSTRAINT `FKViewsMoviesId` FOREIGN KEY (`moviesId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE VIEW `V_Episodes` AS SELECT `E`.id, `E`.`seasonNumber`, `E`.`episodeNumber`, `E`.`quality`,
        D.title, D.description, D.genre, D.duration, D.actors, D.releaseDate, D.creationDate,
        (SELECT COUNT(*) FROM Likes L WHERE E.id = L.moviesId) AS `likes`,
        (SELECT COUNT(*) FROM Views V WHERE E.id = V.moviesId) AS `views`
    FROM `Details` `D` INNER JOIN `Episodes` `E` ON `D`.`id` = `E`.`detailsId`;

CREATE VIEW `V_Movies` AS SELECT `M`.id, `M`.`quality`,
        D.title, D.description, D.genre, D.duration, D.actors, D.releaseDate, D.creationDate,
        (SELECT COUNT(*) FROM Likes L WHERE M.id = L.moviesId) AS `likes`,
        (SELECT AVG(rating) FROM Reviews R WHERE M.id = R.moviesId) AS `rating`,
        (SELECT COUNT(*) FROM Views V WHERE M.id = V.moviesId) AS `views`
    FROM `Details` `D` INNER JOIN `Movies` `M` ON `D`.`id` = `M`.`detailsId`;

CREATE VIEW `V_Series`  AS SELECT S.id,
        D.title, D.description, D.genre, D.duration, D.actors, D.releaseDate, D.creationDate,
        (SELECT MAX(DISTINCT `E`.`seasonNumber`) FROM Episodes E WHERE S.id = E.seriesId) AS `seasonsNumber`,
        (SELECT COUNT(*) FROM Likes L WHERE S.id = L.seriesId) AS `likes`,
        (SELECT AVG(rating) FROM Reviews R WHERE S.id = R.seriesId) AS `rating`
    FROM `Details` `D`
        INNER JOIN `Series` `S` ON `D`.`id` = `S`.`detailsId`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (1, 'Joker', 'La pellicola, basata sull\'omonimo personaggio dei fumetti DC Comics ma scollegata dal DC Extended Universe, vede Joaquin Phoenix interpretare il protagonista, affiancato nel cast da Robert De Niro, Zazie Beetz, Frances Conroy e Brett Cullen. ', 'drama', 123, 'Joaquin Phoenix, Robert De Niro, Zazie Beetz', '2019-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (2, 'Jumanji: The Next Level', 'Jumanji: The Next Level è un film del 2019 diretto da Jake Kasdan con protagonisti Dwayne Johnson, Jack Black, Kevin Hart e Karen Gillan. La pellicola è il secondo sequel del film del 1995 Jumanji (basato sul racconto di Chris Van Allsburg), dopo Jumanji - Benvenuti nella giungla (2017). ', 'adventure', 122, 'Dwayne Johnson, Jack Black, Kevin Hart, Karen Gillan', '2019-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (3, 'Maze Runner - La rivelazione', 'È una pellicola di fantascienza ambientata in un futuro distopico, adattamento cinematografico del romanzo La rivelazione - Maze Runner (The Death Cure) scritto nel 2011 da James Dashner, e sequel del film Maze Runner - La fuga. ', 'action', 143, 'Dylan O\'Brien, Kaya Scodelario, Thomas Brodie-Sangster', '2018-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (4, 'Le Mans \'66 - La grande sfida', 'Il film segue le vicende degli ingegneri e dei membri della scuderia statunitense Ford, guidata dal progettista Carroll Shelby e dal suo pilota britannico Ken Miles, ingaggiati da Henry Ford II e Lee Iacocca col compito di costruire una vettura, la Ford GT40, in grado di vincere la 24 Ore di Le Mans del 1966 contro l\'avversaria Ferrari. Il film ha ricevuto 4 candidature ai Premi Oscar 2020, tra cui l\'Oscar per il miglior film, vincendo però nelle categorie tecniche, miglior montaggio e miglior montaggio sonoro. ', 'drama', 152, 'Matt Damon, Christian Bale, Jon Bernthal', '2019-01-01');
INSERT INTO `Movies` (id, detailsId, quality) VALUES (1, 1, '1080');
INSERT INTO `Movies` (id, detailsId, quality) VALUES (2, 2, '720');
INSERT INTO `Movies` (id, detailsId, quality) VALUES (3, 3, '1080');
INSERT INTO `Movies` (id, detailsId, quality) VALUES (4, 4, '1080');

INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (5, 'Chicago Fire', 'Chicago Fire è una serie televisiva statunitense in onda sulla NBC creata da Michael Brandt e Derek Haas e prodotta da Dick Wolf, trasmessa dal 10 ottobre 2012. La serie è incentrata sulle missioni svolte dai vigili del fuoco di Chicago e sull\'evoluzione dei rapporti tra i vari protagonisti. ', 'drama', 42, 'Jesse Spencer, Taylor Kinney, Monica Raymund', '2012-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (6, 'The O.C.', 'The O.C. è una serie televisiva teen drama statunitense, creata da Josh Schwartz, originariamente trasmessa dal canale televisivo Fox negli Stati Uniti dal 5 agosto 2003 al 22 febbraio 2007, per un totale di quattro stagioni. "O.C." è l\'abbreviazione di Orange County, la località della California in cui è ambientata la serie. ', 'drama', 42, 'Peter Gallagher, Kelly Rowan, Benjamin McKenzie, Mischa Barton', '2003-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (7, 'Shameless', 'È basata sull\'omonima serie britannica del 2004, ideata da Paul Abbott, ed è stata sviluppata per il pubblico statunitense da John Wells. Tra i produttori e sceneggiatori della serie sono presenti gli attori Alex Borstein e Mike O\'Malley. ', 'comedy', 60, 'William H. Macy, Emmy Rossum, Jeremy Allen White', '2011-01-01');
INSERT INTO `Series` (id, detailsId) VALUES (1, 5);
INSERT INTO `Series` (id, detailsId) VALUES (2, 6);
INSERT INTO `Series` (id, detailsId) VALUES (3, 7);

INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (8, 'La squadra', 'Chicago Fire è una serie televisiva statunitense in onda sulla NBC creata da Michael Brandt e Derek Haas e prodotta da Dick Wolf, trasmessa dal 10 ottobre 2012. La serie è incentrata sulle missioni svolte dai vigili del fuoco di Chicago e sull\'evoluzione dei rapporti tra i vari protagonisti. ', 'drama', 42, 'Jesse Spencer, Taylor Kinney, Monica Raymund', '2012-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (9, 'Grazie, mon amour', 'Severide sta nascondendo una grave ferita riportata durante l\'incendio che ha ucciso Andy Darden. La vedova di quest\'ultimo lo accusa di essere stato la causa della morte di suo marito. I membri del camion si chiedono perché il loro stemma sia una capra. I vigili del fuoco danno il benvenuto a Nicki, una giovane donna che sembra avere un debole per Kelly. Quando un cantiere crolla, un operaio morente chiede a Severide di inviare un messaggio alla moglie. Matt decide di sistemare le cose con Hallie. ', 'drama', 42, 'Jesse Spencer, Taylor Kinney, Monica Raymund', '2012-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (10, 'Un atto dovuto', 'I vigili del fuoco rispondono a una chiamata per un incidente stradale che lascia un bambino paralizzato. Il guidatore ubriaco che ha causato l\'incidente è il figlio del Detective Voight, un poliziotto corrotto che vuole coprire il tutto. Tuttavia, Casey è determinato a esporre la verità, nonostante le minacce del Detective Voight. Intanto, Peter decide di lasciare il suo lavoro al ristorante di famiglia, ma la madre non è felice di questa scelta per paura che possa accadergli qualcosa come successe a suo marito defunto ex vigile del fuoco. ', 'drama', 42, 'Jesse Spencer, Taylor Kinney, Monica Raymund', '2012-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (11, 'The Aftermath', 'L\'episodio riapre da dove si era conclusa la stagione precedente, Marissa spara a Trey che viene portato d\'urgenza in ospedale seguito da Ryan, Seth e Marissa, quest\'ultima viene interrogata dalla polizia sull\'accaduto mentre Ryan, a causa dello stress fisico ed emotivo, perde i sensi. ', 'drama', 42, 'Peter Gallagher, Kelly Rowan, Benjamin McKenzie, Mischa Barton', '2006-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (12, 'The Shape of Things to Come', 'È il primo giorno di scuola, è l\'ultimo anno di liceo, Sandy infatti è contento che Ryan e Seth a breve otterranno il diploma, ma il suo entusiasmo viene subito meno non appena Julie si presenta a casa sua. Sandy è ancora arrabbiato con lei dato che aveva tentato di far arrestare Ryan incolpandolo ingiustamente del tentato omicidio di Trey, ma Julie cerca di fargli capire che adesso devono mettere da parte le loro divergenze dato che Ryan e Marissa rischiano l\'espulsione, infatti alla luce di quello che è accaduto con Trey i genitori degli studenti della Harbor hanno presentato una richiesta per espellerli entrambi, sono riusciti a raccogliere oltre 950 firme.', 'drama', 42, 'Peter Gallagher, Kelly Rowan, Benjamin McKenzie, Mischa Barton', '2006-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (13, 'I Only Miss Her When I\'m Breathing', '', 'comedy', 60, 'William H. Macy, Emmy Rossum, Jeremy Allen White', '2016-01-01');
INSERT INTO Details (id, title, description, genre, duration, actors, releaseDate) VALUES (14, 'La ricaduta', '', 'comedy', 60, 'William H. Macy, Emmy Rossum, Jeremy Allen White', '2016-01-01');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (1, 8, 1, 1, 1, '720');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (2, 9, 1, 1, 2, '720');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (3, 10, 1, 1, 3, '720');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (4, 11, 2, 3, 1, '480');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (5, 12, 2, 3, 2, '480');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (6, 13, 3, 6, 1, '1080');
INSERT INTO `Episodes` (id, detailsId, seriesId, seasonNumber, episodeNumber, quality) VALUES (7, 14, 3, 6, 2, '1080');

INSERT INTO `Users` (id, email, name, surname, birthDate, password, newsletter) VALUES (1, 'user1@email', 'user1', 'user1', '2000-01-01', 'user1', false);
INSERT INTO `Users` (id, email, name, surname, birthDate, password, newsletter) VALUES (2, 'user2@email', 'user2', 'user2', '2000-02-02', 'user2', true);
INSERT INTO `Users` (id, email, name, surname, birthDate, password, newsletter) VALUES (3, 'user3@email', 'user3', 'user3', '2000-03-03', 'user3', false);
INSERT INTO `Users` (id, email, name, surname, birthDate, password, newsletter) VALUES (4, 'user4@email', 'user4', 'user4', '2000-04-04', 'user4', false);

