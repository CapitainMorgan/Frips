/*
  Warnings:

  - Made the column `Lastname` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Firstname` on table `account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `brand_Name_idx` ON `brand`;

-- DropIndex
DROP INDEX `category_Name_idx` ON `category`;

-- DropIndex
DROP INDEX `item_Name_idx` ON `item`;

-- AlterTable
ALTER TABLE `account` MODIFY `Lastname` VARCHAR(255) NOT NULL,
    MODIFY `Firstname` VARCHAR(255) NOT NULL;
