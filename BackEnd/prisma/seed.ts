import { cameras, user, radares, natureza_ocorrencias } from './dados'
import { PrismaClient } from '@prisma/client'
import { parseISO } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
    // Cadastrar câmeras se não existirem
    const cameraResult = await prisma.cameras.findFirst({ where: { id: 1 } });
    if (!cameraResult) {
        await prisma.$queryRaw`ALTER TABLE cameras AUTO_INCREMENT = 1;`;
        await prisma.cameras.createMany({
            data: cameras,
            skipDuplicates: true,
        })
    }

    const userResult = await prisma.user.findFirst({ where: { id: 1 } });
    if (!userResult) {
        await prisma.$queryRaw`ALTER TABLE users AUTO_INCREMENT = 1;`;
        await prisma.user.createMany({
            data: user,
            skipDuplicates: true,
        })
    }
    const naturezaResult = await prisma.tipoNatureza.findFirst({ where: { id: 1 } });

    if (!naturezaResult) {
        await prisma.$queryRaw`ALTER TABLE tipo_natureza AUTO_INCREMENT = 1;`;
        const natureza_ocorrencia = await prisma.tipoNatureza.createMany({
            data: natureza_ocorrencias,
            skipDuplicates: true,
        })
    }
    // Cadastrar radares se não existirem
    const radarResult = await prisma.radares.findFirst({ where: { id: 1 } });
    if (!radarResult) {
        try {
            await prisma.$connect();

            // Itera sobre os dados de radares
            for (const radarData of radares) {
                // Converte a string para o tipo DateTime
                const ultimaPassagem = radarData.ultimaPassagem ? parseISO(radarData.ultimaPassagem) : null;

                // Remove a propriedade id dos dados do radar
                const { id, ...rest } = radarData;

                // Cria o radar no banco de dados
                await prisma.radares.create({
                    data: {
                        ...rest,
                        ultimaPassagem,
                        // Convertendo a latitude para string
                        latitude: radarData.latitude.toString(),
                        longitude: radarData.longitude.toString(),
                        // Se o campo 'faixas' não estiver presente ou estiver vazio, não inclui a chave 'faixas' no objeto
                        ...(radarData.faixas && radarData.faixas.length > 0 && { faixas: { createMany: { data: radarData.faixas } } })
                    }
                });

            }

            console.log('Dados de radares cadastrados com sucesso.');
        } catch (error) {
            console.error('Erro ao cadastrar dados de radares:', error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
