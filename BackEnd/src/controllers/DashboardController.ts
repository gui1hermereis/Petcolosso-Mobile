import { Request, Response } from "express";
import { DashboardService } from "../service/DashboardService";

class DashboardController {

  async getAllOcorrencias(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllOcorrencias();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllPresos(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllPresos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllPresosDoMes(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllPresosDoMes();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllVeiculosDoMes(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllVeiculosDoMes();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllVeiculos(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllVeiculos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllProcurados(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllProcurados();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllFurtos(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllFurtos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllFurtosVeiculo(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllFurtosVeiculo();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllRoubos(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllRoubos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllRoubosVeiculo(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllRoubosVeiculo();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllHomicidioDoloso(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getAllHomicidioDoloso();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getOcorrenciasDia(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getOcorrenciasDia();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getOcorrenciasMes(request: Request, response: Response) {
    try {
      const { ano } = request.params;
      const dashboard = new DashboardService();
      const result = await dashboard.getOcorrenciasAno(parseInt(ano));
      if (result !== undefined && result !== null)
        return response.status(200).json(result);
      else
        return response.status(400).json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllFurtosPorcentagem(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.calcularPorcentagemAllFurtos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }
  async getAllFurtosVeiculosPorcentagem(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.calcularPorcentagemAllFurtosVeiculos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }
  async getAllRoubosPorcentagem(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.calcularPorcentagemAllRoubos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }
  async getAllRoubosVeiculosPorcentagem(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.calcularPorcentagemAllRoubosVeiculos();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getAllHomicidioDolosoPorcentagem(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.calcularPorcentagemAllHomicidioDoloso();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getOcorrenciasNatureza(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getOcorrenciasNatureza();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getOcorrenciasRegional(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getOcorrenciasRegional();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getCardInfo(request: Request, response: Response) {
    try {
      const dashboard = new DashboardService();
      const result = await dashboard.getCardInfo();
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }

  async getDashboardSearchHeatmap(request: Request, response: Response) {
    try {
      const { dataIni, dataFim, tipoOcorrencia } = request.body;
      const dashboard = new DashboardService();
      const result = await dashboard.dashboardSearchHeatmap(dataIni, dataFim, tipoOcorrencia);
      if (result !== undefined && result !== null) return response.status(200).json(result);
      else
        return response
          .status(400)
          .json({ message: "Informações não encontradas." });
    } catch (err) {
      return response.status(400).json({ message: "Erro ao buscar informações." });
    }
  }
}

export { DashboardController }