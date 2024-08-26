-- CreateTable
CREATE TABLE `solicitacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expediente` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,
    `solicitante` VARCHAR(191) NULL,
    `qtde` VARCHAR(191) NULL,
    `user_name` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
