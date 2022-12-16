/*
  Warnings:

  - You are about to drop the column `NbView` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `NbView`;

-- CreateTable
CREATE TABLE `nbview` (
    `id_Account` INTEGER NOT NULL,
    `id_Item` INTEGER NOT NULL,

    INDEX `id_Item`(`id_Item`),
    PRIMARY KEY (`id_Account`, `id_Item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nbview` ADD CONSTRAINT `nbview_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nbview` ADD CONSTRAINT `nbview_ibfk_2` FOREIGN KEY (`id_Item`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
