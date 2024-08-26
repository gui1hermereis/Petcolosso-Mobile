-- CreateTable
CREATE TABLE `circuito_interno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regiao` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `local` VARCHAR(191) NULL,
    `link` VARCHAR(191) NULL,
    `data` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
