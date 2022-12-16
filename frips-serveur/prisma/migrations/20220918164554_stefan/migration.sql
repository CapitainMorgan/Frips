-- CreateIndex
CREATE FULLTEXT INDEX `brand_Name_idx` ON `brand`(`Name`);

-- CreateIndex
CREATE FULLTEXT INDEX `category_Name_idx` ON `category`(`Name`);

-- CreateIndex
CREATE FULLTEXT INDEX `item_Name_idx` ON `item`(`Name`);
