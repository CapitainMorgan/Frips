-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(255) NOT NULL,
    `Password` CHAR(60) NOT NULL,
    `Pseudo` VARCHAR(50) NOT NULL,
    `PaymentMethod` VARCHAR(50),
    `IBAN` VARCHAR(35),
    `Description` VARCHAR(255),
    `id_Address` INTEGER,
    `Firstname` VARCHAR(255),
    `Lastname` VARCHAR(255),
    `TelNumber` VARCHAR(50),

    UNIQUE INDEX `Email`(`Email`),
    UNIQUE INDEX `Pseudo`(`Pseudo`),
    UNIQUE INDEX `TelNumber`(`TelNumber`),
    INDEX `id_Address`(`id_Address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    `Color` INTEGER NOT NULL,
    `Type` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NPA` SMALLINT NOT NULL,
    `City` VARCHAR(255) NOT NULL,
    `Street` VARCHAR(255) NOT NULL,
    `NumStreet` VARCHAR(10) NOT NULL,
    `POBox` VARCHAR(50),
    `State` VARCHAR(50),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Name`(`Name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moderator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(60) NOT NULL,
    `Pseudo` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Email`(`Email`),
    UNIQUE INDEX `Pseudo`(`Pseudo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_Houre` DATETIME(0) NOT NULL,
    `Note` INTEGER NOT NULL,
    `Text` VARCHAR(255),
    `id_Account` INTEGER NOT NULL,

    INDEX `id_Account`(`id_Account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    `Code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Name`(`Name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50),
    `Description` VARCHAR(255),
    `Price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemcondition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50),
    `Description` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Account1` INTEGER NOT NULL,
    `id_Account2` INTEGER NOT NULL,

    INDEX `id_Account_1`(`id_Account1`),
    INDEX `id_Account_2`(`id_Account2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_item` (
    `id_Account` INTEGER NOT NULL,
    `id_Item` INTEGER NOT NULL,
    `Price` DOUBLE NOT NULL,

    INDEX `id_Item`(`id_Item`),
    PRIMARY KEY (`id_Account`, `id_Item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievment_user` (
    `id_Account` INTEGER NOT NULL,
    `id_Achievement` INTEGER NOT NULL,

    INDEX `id_Achievement`(`id_Achievement`),
    PRIMARY KEY (`id_Account`, `id_Achievement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_category` (
    `id_Parent` INTEGER NOT NULL,
    `id_Child` INTEGER NOT NULL,

    INDEX `id_Child`(`id_Child`),
    PRIMARY KEY (`id_Parent`, `id_Child`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorit` (
    `id_Account` INTEGER NOT NULL,
    `id_Item` INTEGER NOT NULL,

    INDEX `id_Item`(`id_Item`),
    PRIMARY KEY (`id_Account`, `id_Item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `id_Item` INTEGER NOT NULL,

    INDEX `id_Item`(`id_Item`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Description` VARCHAR(255),
    `Name` VARCHAR(50),
    `Size` VARCHAR(50),
    `NbView` INTEGER,
    `DatePuplication` DATETIME(0) NOT NULL,
    `Price` DOUBLE NOT NULL,
    `CurrentAuction` BOOLEAN NOT NULL,
    `id_Seller` INTEGER NOT NULL,

    INDEX `id_Seller`(`id_Seller`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_brand` (
    `id_Item` INTEGER NOT NULL,
    `id_Brand` INTEGER NOT NULL,

    INDEX `id_Brand`(`id_Brand`),
    PRIMARY KEY (`id_Item`, `id_Brand`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_category` (
    `id_Item` INTEGER NOT NULL,
    `id_Category` INTEGER NOT NULL,

    INDEX `id_Category`(`id_Category`),
    PRIMARY KEY (`id_Item`, `id_Category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_color` (
    `id_Item` INTEGER NOT NULL,
    `id_Color` INTEGER NOT NULL,

    INDEX `id_Color`(`id_Color`),
    PRIMARY KEY (`id_Item`, `id_Color`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_fees` (
    `id_Item` INTEGER NOT NULL,
    `id_Fees` INTEGER NOT NULL,

    INDEX `id_Fees`(`id_Fees`),
    PRIMARY KEY (`id_Item`, `id_Fees`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_itemcondition` (
    `id_Item` INTEGER NOT NULL,
    `id_ItemCondition` INTEGER NOT NULL,

    INDEX `id_ItemCondition`(`id_ItemCondition`),
    PRIMARY KEY (`id_Item`, `id_ItemCondition`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Text` VARCHAR(255),
    `Date_Hour` DATETIME(0) NOT NULL,
    `id_Sender` INTEGER NOT NULL,
    `id_Receiver` INTEGER NOT NULL,
    `id_Chat` INTEGER NOT NULL,

    INDEX `id_Chat`(`id_Chat`),
    INDEX `id_Receiver`(`id_Receiver`),
    INDEX `id_Sender`(`id_Sender`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_Houre` DATETIME(0) NOT NULL,
    `Text` VARCHAR(255) NOT NULL,
    `id_Item` INTEGER NOT NULL,

    INDEX `id_Item`(`id_Item`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sell` (
    `id_Account` INTEGER NOT NULL,
    `Price` DOUBLE,
    `Protection` DOUBLE,
    `DateSell` DATETIME(0) NOT NULL,
    `Statement` VARCHAR(50),
    `DateSend` DATETIME(0),
    `id_Item` INTEGER NOT NULL,

    INDEX `id_Item`(`id_Item`),
    PRIMARY KEY (`id_Account`, `id_Item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`id_Address`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`id_Account1`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`id_Account2`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_item` ADD CONSTRAINT `account_item_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_item` ADD CONSTRAINT `account_item_ibfk_2` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `achievment_user` ADD CONSTRAINT `achievment_user_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `achievment_user` ADD CONSTRAINT `achievment_user_ibfk_2` FOREIGN KEY (`id_Achievement`) REFERENCES `achievement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `category_category` ADD CONSTRAINT `category_category_ibfk_2` FOREIGN KEY (`id_Child`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `category_category` ADD CONSTRAINT `category_category_ibfk_1` FOREIGN KEY (`id_Parent`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorit` ADD CONSTRAINT `favorit_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorit` ADD CONSTRAINT `favorit_ibfk_2` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`id_Seller`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_brand` ADD CONSTRAINT `item_brand_ibfk_2` FOREIGN KEY (`id_Brand`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_brand` ADD CONSTRAINT `item_brand_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_category` ADD CONSTRAINT `item_category_ibfk_2` FOREIGN KEY (`id_Category`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_category` ADD CONSTRAINT `item_category_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_color` ADD CONSTRAINT `item_color_ibfk_2` FOREIGN KEY (`id_Color`) REFERENCES `color`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_color` ADD CONSTRAINT `item_color_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_fees` ADD CONSTRAINT `item_fees_ibfk_2` FOREIGN KEY (`id_Fees`) REFERENCES `fees`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_fees` ADD CONSTRAINT `item_fees_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_itemcondition` ADD CONSTRAINT `item_itemcondition_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_itemcondition` ADD CONSTRAINT `item_itemcondition_ibfk_2` FOREIGN KEY (`id_ItemCondition`) REFERENCES `itemcondition`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_3` FOREIGN KEY (`id_Chat`) REFERENCES `chat`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`id_Receiver`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_Sender`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sell` ADD CONSTRAINT `sell_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sell` ADD CONSTRAINT `sell_ibfk_2` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
