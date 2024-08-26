-- CreateTable
CREATE TABLE `visitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NULL,
    `nome` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `empresa` VARCHAR(191) NULL,
    `qtd_pessoas` INTEGER NULL,
    `telefone` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
