-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `matricula` INTEGER NULL DEFAULT 0,
    `password` VARCHAR(191) NULL DEFAULT '',
    `funcao` VARCHAR(191) NULL DEFAULT '',
    `alterarSenha` BOOLEAN NULL,
    `interno` BOOLEAN NULL,
    `active` BOOLEAN NULL,
    `isDev` BOOLEAN NULL DEFAULT false,
    `isAdm` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `secretaria` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cameras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `cadastro_hik_vision` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `designacao` VARCHAR(191) NULL,
    `numero_camera` VARCHAR(191) NULL,
    `novo_nome` VARCHAR(191) NULL,
    `contrato` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `tipo_camera` VARCHAR(191) NULL,
    `regiao` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `status` BOOLEAN NULL DEFAULT false,
    `dados_analiticos` VARCHAR(191) NULL,
    `secretaria` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_camera` INTEGER NULL,
    `descricao` TEXT NULL,
    `user_name` VARCHAR(191) NULL,
    `data` DATETIME(3) NULL,
    `endereco_antigo` VARCHAR(191) NULL,
    `bairro_antigo` VARCHAR(191) NULL,
    `numero_antigo` VARCHAR(191) NULL,
    `numero_camera_antigo` VARCHAR(191) NULL,
    `numero_contrato_antigo` VARCHAR(191) NULL,
    `latitude_antigo` VARCHAR(191) NULL,
    `longitude_antigo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chamados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_camera` INTEGER NULL,
    `motivo` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `data_abertura` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NULL,
    `solicitante` VARCHAR(191) NULL,
    `protocolo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arquivo_chamado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `id_chamados` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cameras_off` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_camera` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `data_abertura` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `realocacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_camera` INTEGER NULL,
    `data_pedido` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `de_endereco` VARCHAR(191) NULL,
    `para_endereco` VARCHAR(191) NULL,
    `oficio` VARCHAR(191) NULL,
    `data_oficio` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radares` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `areaId` VARCHAR(191) NULL,
    `sitio` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `tipo_camera` VARCHAR(191) NULL,
    `ultimaPassagem` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faixas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `sentido` VARCHAR(191) NULL,
    `lombadaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ocorrencias_cameras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_camera` INTEGER NULL,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,
    `id_natureza` INTEGER NULL,
    `user_name` VARCHAR(191) NULL,
    `origem` VARCHAR(191) NULL,
    `empenhoVtr` BOOLEAN NOT NULL DEFAULT false,
    `conduzirDp` BOOLEAN NOT NULL DEFAULT false,
    `detido` BOOLEAN NOT NULL DEFAULT false,
    `qtd_detido` INTEGER NULL,
    `procurado` BOOLEAN NOT NULL DEFAULT false,
    `desaparecido` BOOLEAN NOT NULL DEFAULT false,
    `flagrante` BOOLEAN NOT NULL DEFAULT false,
    `veiculo` BOOLEAN NOT NULL DEFAULT false,
    `qtd_veiculo` INTEGER NULL,
    `boletimOcorrencia` VARCHAR(191) NULL,
    `protocolo` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ocorrencia_pivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ocorrenciasCamerasId` INTEGER NULL,
    `camerasId` INTEGER NULL,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_natureza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `ativo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historico` ADD CONSTRAINT `historico_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivo_chamado` ADD CONSTRAINT `arquivo_chamado_id_chamados_fkey` FOREIGN KEY (`id_chamados`) REFERENCES `chamados`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cameras_off` ADD CONSTRAINT `cameras_off_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `realocacoes` ADD CONSTRAINT `realocacoes_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faixas` ADD CONSTRAINT `faixas_lombadaId_fkey` FOREIGN KEY (`lombadaId`) REFERENCES `radares`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencias_cameras` ADD CONSTRAINT `ocorrencias_cameras_id_natureza_fkey` FOREIGN KEY (`id_natureza`) REFERENCES `tipo_natureza`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencias_cameras` ADD CONSTRAINT `ocorrencias_cameras_id_camera_fkey` FOREIGN KEY (`id_camera`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia_pivo` ADD CONSTRAINT `ocorrencia_pivo_ocorrenciasCamerasId_fkey` FOREIGN KEY (`ocorrenciasCamerasId`) REFERENCES `ocorrencias_cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia_pivo` ADD CONSTRAINT `ocorrencia_pivo_camerasId_fkey` FOREIGN KEY (`camerasId`) REFERENCES `cameras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
