-- CreateTable
CREATE TABLE `visitas_adicionais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `visitasId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `visitas_adicionais` ADD CONSTRAINT `visitas_adicionais_visitasId_fkey` FOREIGN KEY (`visitasId`) REFERENCES `visitas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
