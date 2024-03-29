DROP DATABASE IF EXISTS `frips`;
CREATE DATABASE `frips` /*!40100 COLLATE 'utf8_general_ci' */;

USE `frips`;

CREATE TABLE achievement(
   id INT AUTO_INCREMENT,
   Name VARCHAR(50) NOT NULL,
   Color INT NOT NULL,
   Sold DOUBLE NOT NULL,
   Type VARCHAR(50) NOT NULL,
   Description VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE moderator(
   id INT AUTO_INCREMENT,
   Email VARCHAR(255) NOT NULL,
   Password VARCHAR(60) NOT NULL,
   Pseudo VARCHAR(50) NOT NULL,
   LastConnection DATETIME,
   PRIMARY KEY(id),
   UNIQUE(Email),
   UNIQUE(Pseudo)
);

CREATE TABLE address(
   id INT AUTO_INCREMENT,
   State VARCHAR(50),
   NPA SMALLINT NOT NULL,
   City VARCHAR(255) NOT NULL,
   Street VARCHAR(255) NOT NULL,
   NumStreet VARCHAR(10) NOT NULL,
   POBox VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE brand(
   id INT AUTO_INCREMENT,
   Name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(Name)
);

CREATE TABLE category(
   id INT AUTO_INCREMENT,
   Name VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE color(
   id INT AUTO_INCREMENT,
   Name VARCHAR(50) NOT NULL,   
   Code VARCHAR(10) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(Name)
);

CREATE TABLE itemcondition(
   id INT AUTO_INCREMENT,
   Name VARCHAR(50),
   Description VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE fees(
   id INT AUTO_INCREMENT,
   Name VARCHAR(50),
   Description VARCHAR(255),
   Price DOUBLE NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE partnership(
   id INT AUTO_INCREMENT,
   Name VARCHAR(255) NOT NULL,
   PRIMARY KEY(id)
);   

CREATE TABLE account(
   id INT AUTO_INCREMENT,
   Email VARCHAR(255) NOT NULL,
   Password VARCHAR(60) NOT NULL,
   Pseudo VARCHAR(50) NOT NULL,
   Lastname VARCHAR(255),
   PaymentMethod VARCHAR(50),
   IBAN VARCHAR(35),
   Description VARCHAR(255),
   Firstname VARCHAR(255),
   TelNumber VARCHAR(50),
   BirthDate DATETIME,
   AccountStatus INT DEFAULT 0,
   LastConnection DATETIME,
   id_Address INT,
   id_PartnerShip INT,
   PRIMARY KEY(id),
   UNIQUE(Email),
   UNIQUE(Pseudo),
   UNIQUE(TelNumber),
   FOREIGN KEY(id_PartnerShip) REFERENCES partnership(id),
   FOREIGN KEY(id_Address) REFERENCES address(id)
);

CREATE TABLE withdraw(
   id INT AUTO_INCREMENT,
   id_Account INT,
   date DATETIME,
   isPaid BOOL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Account) REFERENCES account(id)
);
   

CREATE TABLE reset_password(
   id_Account INT,
   token VARCHAR(300),
   date_end DATETIME,
   PRIMARY KEY(id_Account),
   FOREIGN KEY(id_Account) REFERENCES account(id)
);

CREATE TABLE chat(
   id INT AUTO_INCREMENT,
   id_Account_1 INT NOT NULL,
   id_Account_2 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Account_1) REFERENCES account(id),
   FOREIGN KEY(id_Account_2) REFERENCES account(id)
);

CREATE TABLE item(
   id INT AUTO_INCREMENT,
   Description VARCHAR(255),
   Name VARCHAR(50),
   Size VARCHAR(50),
   DeliveryDetails VARCHAR(255),
   DatePuplication DATETIME NOT NULL,
   Price DOUBLE NOT NULL,
   CurrentAuction BOOL NOT NULL,
   Disponibility BOOL NOT NULL,
   IsReservedTime DATETIME,
   Verified BOOL NOT NULL,
   id_Seller INT NOT NULL,
   id_ItemCondition INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Seller) REFERENCES account(id),
   FOREIGN KEY(id_ItemCondition) REFERENCES itemcondition(id)
);


CREATE TABLE message(
   id INT AUTO_INCREMENT,
   Text VARCHAR(255),
   Date_Houre DATETIME NOT NULL,
   Unread BOOL NOT NULL,
   id_Sender INT NOT NULL,
   id_Receiver INT NOT NULL,
   id_Chat INT NOT NULL,
   id_Item INT,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Sender) REFERENCES account(id),
   FOREIGN KEY(id_Receiver) REFERENCES account(id),
   FOREIGN KEY(id_Chat) REFERENCES chat(id),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE 
);

CREATE TABLE report(
   id INT AUTO_INCREMENT,
   Date_Houre DATETIME NOT NULL,
   Text VARCHAR(255) NOT NULL,
   id_Item INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE 
);

CREATE TABLE image(
   id INT AUTO_INCREMENT,
   image VARCHAR(255) NOT NULL,
   confidencial BOOL NOT NULL,
   id_Item INT,
   id_Account INT,
   PRIMARY KEY(id),
   UNIQUE(id_Account),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE,
   FOREIGN KEY(id_Account) REFERENCES account(id)
);

CREATE TABLE item_category(
   id_Item INT,
   id_Category INT,
   PRIMARY KEY(id_Item, id_Category),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE,
   FOREIGN KEY(id_Category) REFERENCES category(id)
);

CREATE TABLE achievment_user(
   id_Account INT,
   id_Achievement INT,
   PRIMARY KEY(id_Account, id_Achievement),
   FOREIGN KEY(id_Account) REFERENCES account(id),
   FOREIGN KEY(id_Achievement) REFERENCES achievement(id)
);

CREATE TABLE pricepropose(
   id_Account INT,
   id_Item INT,
   Price DOUBLE NOT NULL,
   Approve BOOL, 
   SendDate DATETIME NOT NULL,  
   dateApprove DATETIME,
   PRIMARY KEY(id_Account, id_Item),
   FOREIGN KEY(id_Account) REFERENCES account(id),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE 
);

CREATE TABLE transaction(
   id INT AUTO_INCREMENT,
   id_Account INT NOT NULL,
   Price DOUBLE,
   TaxPrice DOUBLE,
   DeliveryPrice DOUBLE,
   Protection DOUBLE,
   DateSell DATETIME NOT NULL,
   Status VARCHAR(50),
   IsPaid BOOL,
   DateSend DATETIME,
   DatePaymentRequest DATETIME,
   StripeIdentifier VARCHAR(255),
   id_Item INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Account) REFERENCES account(id),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE 
);

CREATE TABLE review(
   id INT AUTO_INCREMENT,
   Date_Houre DATETIME NOT NULL,
   Note INT NOT NULL,
   Text VARCHAR(255),
   id_Account INT NOT NULL,
   id_Transaction INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_Account) REFERENCES account(id),
   FOREIGN KEY(id_Transaction) REFERENCES transaction(id)
);

CREATE TABLE item_brand(
   id_Item INT,
   id_Brand INT,
   PRIMARY KEY(id_Item, id_Brand),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE,
   FOREIGN KEY(id_Brand) REFERENCES brand(id)
);

CREATE TABLE category_category(
   id_Parent INT,
   id_Child INT,
   PRIMARY KEY(id_Parent, id_Child),
   FOREIGN KEY(id_Parent) REFERENCES category(id),
   FOREIGN KEY(id_Child) REFERENCES category(id)
);

CREATE TABLE item_color(
   id_Item INT,
   id_Color INT,
   PRIMARY KEY(id_Item, id_Color),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE,
   FOREIGN KEY(id_Color) REFERENCES color(id)
);

CREATE TABLE favorit(
   id_Account INT,
   id_Item INT,
   PRIMARY KEY(id_Account, id_Item),
   FOREIGN KEY(id_Account) REFERENCES account(id),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE 
);

CREATE TABLE nbview(
   id_Account INT,
   id_Item INT,
   PRIMARY KEY(id_Account, id_Item),
   FOREIGN KEY(id_Account) REFERENCES account(id),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE 
);

CREATE TABLE item_fees(
   id_Item INT,
   id_Fees INT,
   PRIMARY KEY(id_Item, id_Fees),
   FOREIGN KEY(id_Item) REFERENCES item(id) ON DELETE CASCADE,
   FOREIGN KEY(id_Fees) REFERENCES fees(id)
);

INSERT INTO `fees` (`id`, `Name`, `Description`, `Price`) VALUES
	(1, 'Livraison Poste Standard'  ,  '2 - 3 jours ouvrables'   ,  7),
	(2, 'Livraison Poste Rapide',    '1 jour ouvrable'  ,   9),
	(3, 'Livraison en main-propre'  ,  ''  , 0);

/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
INSERT INTO `brand` (`id`, `Name`) VALUES
	(35, 'Lululemon'),
	(13, 'Abercrombie & Fitch'),
	(5, 'Adidas'),
	(32, 'Anta'),
	(17, 'Autre'),
	(43, 'Berluti'),
	(14, 'Bershka'),
	(40, 'Bostonian'),
	(31, 'Burberry'),
	(3, 'C & A'),
	(15, 'Calvin Klein'),
	(23, 'Cartier'),
	(21, 'Chanel'),
	(30, 'Chow Tai Fook'),
	(29, 'COACH'),
	(44, 'Converse'),
	(7, 'Decathlon'),
	(26, 'Dior'),
	(48, 'Fendi'),
	(20, 'GUCCI'),
	(1, 'H & M'),
	(22, 'Hermès'),
	(11, 'Jack & Jones'),
	(41, 'Johnston & Murphy'),
	(46, 'Jordan'),
	(8, 'Lacoste'),
	(39, 'Levi\'s'),
	(19, 'Louis Vuitton'),
	(50, 'Marc Jacobs'),
	(49, 'Michael Kors'),
	(4, 'Nike'),
	(38, 'Omega'),
	(10, 'Prada'),
	(12, 'Pull & Bear'),
	(6, 'Puma'),
	(36, 'Ralph Lauren'),
	(33, 'Ray-Ban'),
	(42, 'Reebok'),
	(27, 'Rolex'),
	(16, 'Sans marques'),
	(45, 'Testoni'),
	(34, 'The North Face'),
	(28, 'Tiffany & Co.'),
	(18, 'Tommy hilfiger'),
	(9, 'Uniqlo'),
	(37, 'Victoria\'s Secret'),
	(2, 'Zara');

-- Listage des données de la table frips.color : ~18 rows (environ)
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` (`id`, `Name`, `Code`) VALUES
	(1, 'Noir', '#000000'),
	(2, 'Gris', '#919191'),
	(3, 'Beige', '#F4E0C6'),
	(4, 'Rose', '#FF0080'),
	(5, 'Marron', '#663300'),
	(6, 'Violet', '#800080'),
	(7, 'Rouge', '#E8211F'),
	(8, 'Jaune', '#FFF200'),
	(9, 'Bleu', '#007BC4'),
	(10, 'Vert', '#369A3D'),
	(11, 'Orange', '#FFA500'),
	(12, 'Blanc', '#FFFFFF'),
	(13, 'Kaki', '#7E805D'),
	(14, 'Turquoise', '#40E0D0'),
	(15, 'Bordeaux', '#6D071A'),
	(16, 'Bleu clair', '#77B5FE'),
	(17, 'Vert foncé', '#095228'),
	(18, 'Autre', '#FFFFFF');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;

-- Listage des données de la table frips.itemcondition : ~5 rows (environ)
/*!40000 ALTER TABLE `itemcondition` DISABLE KEYS */;
INSERT INTO `itemcondition` (`id`, `Name`, `Description`) VALUES
	(1, 'Neuf avec étiquette', 'Item neuf, jamais porté/utilisé avec étiquettes ou dans son emballage/boîte d\'origines'),
	(2, 'Neuf sans étiquette', 'Item neuf, jamais porté/utilisé, sans étiquettes ni emballage d\'origine'),
	(3, 'Très bon état', 'Item très peu porté/utilisé, qui peut avoir des légères imperfection mais qui reste en bon très bon état. Précise l\'état en ajoutant des photos et rajoutant dans la descripition, les défauts potentiels'),
	(4, 'Bon état', 'Item porté/utilisé quelques fois, montre les signes d\'usures et d\'imperfections.Précise l\'état en ajoutant des photos et rajoutant dans la descripition, les défauts potentiels'),
	(5, 'Correct', 'Item porté/utilisé souvent, montre les signes d\'usures et d\'imperfections. Précise l\'état en ajoutant des photos et rajoutant dans la descripition, les défauts potentiels');


INSERT INTO `category` (`id`, `Name`) VALUES
	(1, 'Femme'),
	(2, 'Vêtements'),
	(3, 'Manteaux & vestes'),
	(4, 'Manteaux'),
	(5, 'Parkas'),
	(6, 'Manteaux longs'),
	(7, 'Manteaux d\'hivers'),
	(8, 'Impermeables'),
	(9, 'Vestes'),
	(10, 'Blouson aviateur'),
	(11, 'Vestes en jean'),
	(12, 'Vestes en cuir'),
	(13, 'Vestes légères'),
	(14, 'Vestes polaires'),
	(15, 'Autres manteaux & vestes'),
	(16, 'Sweats & Pulls'),
	(17, 'Sweats à capuche'),
	(18, 'Sweats'),
	(19, 'Pulls col V'),
	(20, 'Pulls col roulé'),
	(21, 'Sweats longs'),
	(22, 'Pulls d\'hiver'),
	(23, 'Autres sweats'),
	(24, 'Pulls'),
	(25, 'Autres Sweats & pull-overs'),
	(26, 'Blazers & tailleurs'),
	(27, 'Blazers'),
	(28, 'Ensemble tailler/pantalon'),
	(29, 'Autres ensembles & tailleurs'),
	(30, 'Robes'),
	(31, 'Robes courtes'),
	(32, 'Robes longues'),
	(33, 'Robes d\'été'),
	(34, 'Robes d\'hiver'),
	(35, 'Robes chics'),
	(36, 'Robes sans bretelles'),
	(37, 'Robes de soirée'),
	(38, 'Robes de mariée'),
	(39, 'Autres robes'),
	(40, 'Jupes'),
	(41, 'Mini-jupes'),
	(42, 'Jupes mi-longues'),
	(43, 'Jupes longues'),
	(44, 'Jupes taille haute'),
	(45, 'Jupes tulipes'),
	(46, 'Jupes patineuses'),
	(47, 'Autres jupes'),
	(48, 'Haut & T-shirts'),
	(49, 'Chemises'),
	(50, 'Blouses'),
	(51, 'T-shirts'),
	(52, 'Débardeurs'),
	(53, 'Tuniques'),
	(54, 'Tops courts'),
	(55, 'Bodys'),
	(56, 'Pantalons & leggings'),
	(57, 'Pantalons skiny'),
	(58, 'Pantalons en cuir'),
	(59, 'Pantalons droits'),
	(60, 'Leggings'),
	(61, 'Sarouels'),
	(62, 'Shorts'),
	(63, 'Shorts taille haute'),
	(64, 'Shorts taille basse'),
	(65, 'Shorts en jeans'),
	(66, 'Shorts en cuir'),
	(67, 'Shorts cargo'),
	(68, 'Maillots de bain'),
	(69, 'Une pièce'),
	(70, 'Deux pièces'),
	(71, 'Paréos'),
	(72, 'Autres vêtements'),
	(73, 'Chaussures'),
	(74, 'Bottes'),
	(75, 'Bottines'),
	(76, 'Chaussures à talons'),
	(77, 'Chaussures plates'),
	(78, 'Sneakers & Basket'),
	(79, 'Sandales'),
	(80, 'Autres chaussures'),
	(81, 'Sacs'),
	(82, 'Sacs à main'),
	(83, 'Sacs en bandoulière'),
	(84, 'Sacs à dos'),
	(85, 'Pochette'),
	(86, 'Sacs banane'),
	(87, 'Sacs de sport'),
	(88, 'Autres sacs'),
	(89, 'Accesoires'),
	(90, 'Bijoux'),
	(91, 'Bagues'),
	(92, 'Boucles d\'oreilles'),
	(93, 'Bracelets'),
	(94, 'Colliers'),
	(95, 'Autres Bijoux'),
	(96, 'Montre'),
	(97, 'Ceintures'),
	(98, 'Lunettes de soleil'),
	(99, 'Echarpes'),
	(100, 'Gants'),
	(101, 'Chapeaux et casquette'),
	(102, 'Accessoires cheveux'),
	(103, 'Autres chaussures'),
	(104, 'Homme'),
	(105, 'Vêtements'),
	(106, 'Jeans'),
	(107, 'Jeans troués'),
	(108, 'Jeans skinny'),
	(109, 'Jeans slim'),
	(110, 'Jeans coupes droites'),
	(111, 'Manteaux & Vestes'),
	(112, 'Manteaux'),
	(113, 'Imperméables'),
	(114, 'Trench-coats'),
	(115, 'Duffle-coats'),
	(116, 'Cabans'),
	(117, 'Parkas'),
	(118, 'Manteaux en laine'),
	(119, 'Vestes'),
	(120, 'Vestes en jean'),
	(121, 'Vestes en cuir'),
	(122, 'Vestes légères'),
	(123, 'Vestes harrington'),
	(124, 'Vestes en duvet'),
	(125, 'Vestes polaires'),
	(126, 'Autres'),
	(127, 'Hauts & T-shirts'),
	(128, 'Sweats & Pulls'),
	(200, 'Sweats'),
	(201, 'Pulls'),
	(202, 'Autres Sweats & pull-overs'),
	(203, 'Sweats à capuche'),
	(204, 'Sweats longs'),
	(205, 'Autres sweats'),
	(206, 'Pulls d\'hiver'),	
	(207, 'Pulls col V'),
	(208, 'Pulls col roulé'),
	(130, 'Pantalons'),
	(131, 'Jogging'),
	(132, 'Pantalons skinny'),
	(133, 'Pantacourts'),
	(134, 'Pantalons de costume'),
	(135, 'Pantalons à jambes larges'),
	(136, 'Shorts'),
	(137, 'Shorts cargo'),
	(138, 'Shorts chino'),
	(139, 'Shorts en jean'),
	(140, 'Vêtements de sports'),
	(141, 'Survêtements'),
	(142, 'Shorts de sport'),
	(143, 'Hauts & T-shirts'),
	(144, 'Maillots de bain'),
	(145, 'Autres vêtements'),
	(146, 'Chaussures'),
	(147, 'Chaussons et Tongs'),
	(148, 'Bottines'),
	(149, 'Sneakers et converses'),
	(150, 'Chaussures de sport'),
	(151, 'Sandales'),
	(152, 'Bottes et boots'),
	(153, 'Autres chaussures'),
	(154, 'Accessoires'),
	(155, 'Bijoux'),
	(156, 'Bagues'),
	(157, 'Boucles d\'oreilles'),
	(158, 'Bracelets'),
	(159, 'Colliers'),
	(160, 'Autres Bijoux'),
	(161, 'Cravattes'),
	(162, 'Ceintures'),
	(163, 'Chapeaux et casquettes'),
	(164, 'Echarpes'),
	(165, 'Gants'),
	(166, 'Lunettes de soleil'),
	(167, 'Montres'),
	(168, 'Sacs et sacoches'),
	(169, 'Sacs à main'),
	(170, 'Sacs en bandoulière'),
	(171, 'Sacs à dos'),
	(172, 'Sacs banane'),
	(173, 'Autres');


   INSERT INTO `category_category` (`id_Parent`, `id_Child`) VALUES
   (1,2),
   (2,3),
   (3,4),
   (4,5),
   (4,6),
   (4,7),
   (4,8),
   (3,9),
   (9,10),
   (9,11),
   (9,12),
   (9,13),
   (9,14),
   (3,15),
   (2,16),
   (18,17),
   (16,18),
   (18,17),
   (18,21),
   (18,23),
   (16,24),
   (24,22),
   (24,19),
   (24,20),
   (16,25),
   (2,26),
   (26,27),
   (26,28),
   (26,29),
   (2,30),
   (30,31),
   (30,32),
   (30,33),
   (30,34),
   (30,35),
   (30,36),
   (30,37),
   (30,38),
   (30,39),
   (2,40),
   (40,41),
   (40,42),
   (40,43),
   (40,44),
   (40,45),
   (40,46),
   (40,47),
   (2,48),
   (48,49),
   (48,50),
   (48,51),
   (48,52),
   (48,53),
   (48,54),
   (48,55),
   (2,56),
   (56,57),
   (56,58),
   (56,59),
   (56,60),
   (56,61),
   (2,62),
   (62,63),
   (62,64),
   (62,65),
   (62,66),
   (62,67),
   (2,68),
   (68,69),
   (68,70),
   (68,71),
   (2,72),
   (1,73),
   (73,74),
   (73,75),
   (73,76),
   (73,77),
   (73,78),
   (73,79),
   (73,80),
   (1,81),
   (81,82),
   (81,83),
   (81,84),
   (81,85),
   (81,86),
   (81,87),
   (81,88),
   (73,103),
   (104,105),
	(105,106),
	(106,107),
	(106,108),
	(106,109),
	(106,110),
	(105,111),
	(111,112),
	(112,113),
	(112,114),
	(112,115),
	(112,116),
	(112,117),
	(112,118),
	(111,119),
	(119,120),
	(119,121),
	(119,122),
	(119,123),
	(119,124),
	(119,125),
	(111,126),
	(105,127),
	(105,128),
	(128,200),
	(128,201),
	(128,202),
	(200,203),
	(200,204),
	(200,205),
	(201,206),
	(201,207),
	(201,208),
	(105,130),
	(130,131),
	(130,132),
	(130,133),
	(130,134),
	(130,135),
	(105,136),
	(136,137),
	(136,138),
	(136,139),
	(105,140),
	(140,141),
	(140,142),
	(140,143),
	(105,144),
	(105,145),
	(104,146),
	(146,147),
	(146,148),
	(146,149),
	(146,150),
	(146,151),
	(146,152),
	(146,153),	
	(104,168),
	(168,169),
	(168,170),
	(168,171),
	(168,172),
	(168,173);
