-- CreateTable
CREATE TABLE `arquivo_problema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `id_camera` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivo_problema` ADD CONSTRAINT `arquivo_problema_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
