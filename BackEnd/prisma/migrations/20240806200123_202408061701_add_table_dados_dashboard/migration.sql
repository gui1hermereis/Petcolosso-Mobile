-- CreateTable
CREATE TABLE `dados_dashboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_ocorrencia` VARCHAR(191) NULL,
    `data` VARCHAR(191) NULL,
    `quantidade` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
