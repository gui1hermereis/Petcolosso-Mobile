-- CreateTable
CREATE TABLE `historico_ocorrencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ocorrencia` INTEGER NULL,
    `id_camera` INTEGER NULL,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,
    `id_natureza` INTEGER NULL,
    `origem` VARCHAR(191) NULL,
    `empenhoVtr` BOOLEAN NOT NULL DEFAULT false,
    `conduzirDp` BOOLEAN NOT NULL DEFAULT false,
    `detido` BOOLEAN NOT NULL DEFAULT false,
    `desaparecido` BOOLEAN NOT NULL DEFAULT false,
    `flagrante` BOOLEAN NOT NULL DEFAULT false,
    `veiculo` BOOLEAN NOT NULL DEFAULT false,
    `captura` BOOLEAN NOT NULL DEFAULT false,
    `imgSalva` BOOLEAN NOT NULL DEFAULT false,
    `qtd_detido` INTEGER NULL,
    `procurado` INTEGER NULL,
    `qtd_veiculo` INTEGER NULL,
    `boletimOcorrencia` VARCHAR(191) NULL,
    `protocolo` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `instituicao` VARCHAR(191) NULL,
    `dataOcorrencia` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `plantao` VARCHAR(191) NULL,
    `user_name` VARCHAR(191) NULL,
    `dataAbertura` DATETIME(3) NULL,
    `dataAlteracao` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historico_ocorrencias` ADD CONSTRAINT `historico_ocorrencias_id_natureza_fkey` FOREIGN KEY (`id_natureza`) REFERENCES `tipo_natureza`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_ocorrencias` ADD CONSTRAINT `historico_ocorrencias_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
