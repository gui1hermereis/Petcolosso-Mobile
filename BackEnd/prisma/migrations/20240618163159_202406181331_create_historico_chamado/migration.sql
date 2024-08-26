-- CreateTable
CREATE TABLE `historico_chamado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_chamado` INTEGER NULL,
    `id_camera` INTEGER NULL,
    `motivo` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `protocolo` VARCHAR(191) NULL,
    `dataAbertura` DATETIME(3) NULL,
    `dataAlteracao` DATETIME(3) NULL,
    `user_name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historico_chamado` ADD CONSTRAINT `historico_chamado_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
