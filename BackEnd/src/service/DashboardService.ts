import prismaClient from "../prisma";

class DashboardService {
  async getAllOcorrencias() {
    try {
      const result = await prismaClient.$queryRaw`
        SELECT COUNT(id) as total FROM ocorrencias_cameras
      `;

      const totalOcorrencias = parseInt(result[0].total);

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllPresos() {
    try {
      const result = await prismaClient.$queryRaw`
       SELECT SUM(qtd_detido) as total FROM ocorrencias_cameras
      `;

      const totalOcorrencias = parseInt(result[0].total);

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllPresosDoMes() {
    try {
      const result = await prismaClient.$queryRaw`
          SELECT SUM(qtd_detido) as total FROM ocorrencias_cameras
          WHERE data >= DATE_FORMAT(NOW(), '%Y-%m-01')
        `;

      const totalDetidos = parseInt(result[0].total);

      return totalDetidos;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllVeiculosDoMes() {
    try {
      const result = await prismaClient.$queryRaw`
          SELECT SUM(qtd_veiculo) as total FROM ocorrencias_cameras
          WHERE data >= DATE_FORMAT(NOW(), '%Y-%m-01')
        `;
      const totalVeiculos = parseInt(result[0].total);

      return totalVeiculos;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllVeiculos() {
    try {
      const result = await prismaClient.$queryRaw`
       SELECT SUM(qtd_veiculo) as total FROM ocorrencias_cameras
      `;

      const totalOcorrencias = parseInt(result[0].total);

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllProcurados() {
    try {
      const result = await prismaClient.$queryRaw`
       SELECT SUM(procurado) as total FROM ocorrencias_cameras
      `;

      const totalOcorrencias = parseInt(result[0].total);

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllFurtos() {
    try {
      const result = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'FURTO - OUTROS'
          AND data BETWEEN '2024-01-01' AND '2024-12-31'
      `;

      const totalOcorrencias = result[0]?.total || 0;

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async calcularPorcentagemAllFurtos() {
    try {
      const result2016 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'FURTO - OUTROS'
          AND data BETWEEN '2016-01-01' AND '2016-06-31'
      `;

      const result2024 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'FURTO - OUTROS'
          AND data BETWEEN '2024-01-01' AND '2024-12-31'
      `;

      const total2016 = result2016[0]?.total || 0;
      const total2024 = result2024[0]?.total || 0;

      const percentageChange = total2016 > 0
        ? ((total2024 - total2016) / total2016) * 100
        : total2024 > 0
          ? 100
          : 0;

      const formattedPercentage = percentageChange.toFixed(1);

      return formattedPercentage;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllFurtosVeiculo() {
    try {
      const result = await prismaClient.$queryRaw`
          SELECT SUM(quantidade) as total
          FROM dados_dashboard
          WHERE tipo_ocorrencia = 'FURTO DE VEÍCULO'
            AND data BETWEEN '2024-01-01' AND '2024-12-31'
        `;

      const totalOcorrencias = result[0]?.total || 0;

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  async calcularPorcentagemAllFurtosVeiculos() {
    try {
      const result2016 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'FURTO DE VEÍCULO'
          AND data BETWEEN '2016-01-01' AND '2016-06-31'
      `;

      const result2024 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'FURTO DE VEÍCULO'
          AND data BETWEEN '2024-01-01' AND '2024-12-31'
      `;

      const total2016 = result2016[0]?.total || 0;
      const total2024 = result2024[0]?.total || 0;

      const percentageChange = total2016 > 0
        ? ((total2024 - total2016) / total2016) * 100
        : total2024 > 0
          ? 100
          : 0;

      const formattedPercentage = percentageChange.toFixed(1);

      return formattedPercentage;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllRoubos() {
    try {
      const result = await prismaClient.$queryRaw`
          SELECT SUM(quantidade) as total
          FROM dados_dashboard
          WHERE tipo_ocorrencia = 'ROUBO - OUTROS'
            AND data BETWEEN '2024-01-01' AND '2024-12-31'
        `;

      const totalOcorrencias = result[0]?.total || 0;

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async calcularPorcentagemAllRoubos() {
    try {
      const result2016 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'ROUBO - OUTROS'
          AND data BETWEEN '2016-01-01' AND '2016-06-31'
      `;

      const result2024 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'ROUBO - OUTROS'
          AND data BETWEEN '2024-01-01' AND '2024-12-31'
      `;

      const total2016 = result2016[0]?.total || 0;
      const total2024 = result2024[0]?.total || 0;

      const percentageChange = total2016 > 0
        ? ((total2024 - total2016) / total2016) * 100
        : total2024 > 0
          ? 100
          : 0;

      const formattedPercentage = percentageChange.toFixed(1);

      return formattedPercentage;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllRoubosVeiculo() {
    try {
      const result = await prismaClient.$queryRaw`
          SELECT SUM(quantidade) as total
          FROM dados_dashboard
          WHERE tipo_ocorrencia = 'ROUBO DE VEÍCULO'
            AND data BETWEEN '2024-01-01' AND '2024-12-31'
        `;

      const totalOcorrencias = result[0]?.total || 0;

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async calcularPorcentagemAllRoubosVeiculos() {
    try {
      const result2016 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'ROUBO DE VEÍCULO'
          AND data BETWEEN '2016-01-01' AND '2016-06-31'
      `;

      const result2024 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'ROUBO DE VEÍCULO'
          AND data BETWEEN '2024-01-01' AND '2024-12-31'
      `;

      const total2016 = result2016[0]?.total || 0;
      const total2024 = result2024[0]?.total || 0;

      const percentageChange = total2016 > 0
        ? ((total2024 - total2016) / total2016) * 100
        : total2024 > 0
          ? 100
          : 0;

      const formattedPercentage = percentageChange.toFixed(1);

      return formattedPercentage;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllHomicidioDoloso() {
    try {
      const result = await prismaClient.$queryRaw`
          SELECT SUM(quantidade) as total
          FROM dados_dashboard
          WHERE tipo_ocorrencia = 'HOMICÍDIO DOLOSO'
            AND data BETWEEN '2024-01-01' AND '2024-12-31'
        `;

      const totalOcorrencias = result[0]?.total || 0;

      return totalOcorrencias;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async calcularPorcentagemAllHomicidioDoloso() {
    try {
      const result2016 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'HOMICÍDIO DOLOSO'
          AND data BETWEEN '2016-01-01' AND '2016-06-31'
      `;

      const result2024 = await prismaClient.$queryRaw`
        SELECT SUM(quantidade) as total
        FROM dados_dashboard
        WHERE tipo_ocorrencia = 'HOMICÍDIO DOLOSO'
          AND data BETWEEN '2024-01-01' AND '2024-12-31'
      `;

      const total2016 = result2016[0]?.total || 0;
      const total2024 = result2024[0]?.total || 0;

      const percentageChange = total2016 > 0
        ? ((total2024 - total2016) / total2016) * 100
        : total2024 > 0
          ? 100
          : 0;

      const formattedPercentage = percentageChange.toFixed(1);

      return formattedPercentage;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getOcorrenciasDia() {
    try {
      let results = [];
      results = await prismaClient.$queryRaw`
            SELECT count(id) as 'date', DATE(data_hora_ocorrencia) as categories 
            FROM ocorrencia
            GROUP BY categories
            ORDER BY categories asc
            LIMIT 30
            `
      let count = [];
      let data_hora_ocorrencia = [];
      results.map(r => count.push(parseInt(r.date)));
      results.map(r => data_hora_ocorrencia.push(r.categories.toISOString().substring(2, 10)));

      return { categories: data_hora_ocorrencia, data: count };
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getOcorrenciasAno(ano: number) {
    try {
      const inicioPeriodo = `${ano}-01-01`;
      const fimPeriodo = `${ano}-12-31`;

      const results: { date: string; categories: string }[] = await prismaClient.$queryRaw`
        SELECT count(id) as 'date', DATE_FORMAT(data, '%Y-%m') as categories 
        FROM ocorrencias_cameras
        WHERE data >= ${inicioPeriodo} AND data <= ${fimPeriodo}
        GROUP BY categories
        ORDER BY categories ASC
        LIMIT 12
      `;

      const count = results.map((r: { date: string }) => parseInt(r.date));
      const data_hora_ocorrencia = results.map((r: { categories: string }) => r.categories);

      return { categories: data_hora_ocorrencia, data: count };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getOcorrenciasNatureza() {
    try {
      const results = await prismaClient.ocorrenciasCameras.groupBy({
        by: ["id_natureza"],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: "desc"
          }
        },
        take: 20
      });

      const count = results.map(r => r._count.id);
      const data_hora_ocorrencia = results.map(r => r.id_natureza);

      return { categories: data_hora_ocorrencia, data: count };
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getOcorrenciasRegional() {
    try {
      let results = [];
      results = await prismaClient.$queryRaw`
            SELECT COUNT(o.id) AS count, r.descricao
            FROM ocorrencia o
            JOIN regional r ON r.id = o.reg_id
            GROUP BY r.descricao
            ORDER BY r.descricao ASC
            LIMIT 20
          `;

      let count = [];
      let data_hora_ocorrencia = [];
      results.map(r => count.push(r.count));
      results.map(r => data_hora_ocorrencia.push(r.descricao));

      return { categories: data_hora_ocorrencia, data: count };
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getOcorrenciasTempoMedio() {
    try {
      let results = await prismaClient.$queryRaw`
            SELECT COUNT(o.id) AS count, r.codigo
            FROM ocorrencia o
            JOIN regional r ON r.id = o.reg_id
            GROUP BY r.codigo
            ORDER BY r.codigo ASC
          `;
      return results;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getCardInfo() {
    try {
      const results = await prismaClient.$queryRaw`
            SELECT AVG(TIMESTAMPDIFF(MINUTE, o.data_hora_ocorrencia, o.data_despacho)) AS despacho
            FROM ocorrencia o
            LIMIT 1
          `;

      const despachoInMinutes = results[0].despacho;

      var tempoMedioOcorrencia = await prismaClient.$queryRaw`
            SELECT AVG(TIMESTAMPDIFF(MINUTE, o.data_hora_ocorrencia, o.data_fim)) AS fim
            FROM ocorrencia o
          `;

      const fimInMinutes = tempoMedioOcorrencia[0].fim;

      return {
        despacho: despachoInMinutes,
        fim: fimInMinutes
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async dashboardSearchHeatmap(dataIni, dataFim, tipoOcorrencia) {
    try {
      let resp = [];
      const dataIniObj = new Date(dataIni);
      const dataFimObj = new Date(dataFim);
      console.log(dataIniObj);
      console.log(dataFimObj);
      if (dataIni !== undefined || dataFim !== undefined) {
        if (tipoOcorrencia == undefined || tipoOcorrencia == "") {
          resp = await prismaClient.$queryRawUnsafe(`
                SELECT o.latitude_ocorrencia AS lat, o.longitude_ocorrencia AS lng 
                FROM ocorrencia o
                WHERE DATE(o.data_hora_ocorrencia) BETWEEN '${dataIni}' AND '${dataFim}'
              `);
        } else {
          resp = await prismaClient.$queryRawUnsafe(`
                SELECT o.latitude_ocorrencia AS lat, o.longitude_ocorrencia AS lng 
                FROM ocorrencia o
                WHERE DATE(o.data_hora_ocorrencia) BETWEEN '${dataIni}' AND '${dataFim}'
                AND o.tipo_ocorrencia = '${tipoOcorrencia}'
              `);
        }
      }
      return resp;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
export { DashboardService };
