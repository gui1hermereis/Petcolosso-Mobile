export type User = {
  id: number;
  nome: string;
  instituicao?: string;
  username: string;
  email?: string;
  matricula?: number;
  password?: string;
  role?: string;
  funcao?: string;
  alterarSenha?: boolean;
  interno: boolean;
  active?: boolean;
  isDev?: boolean;
  isAdm?: boolean;
};
// models/Cameras.ts
export type Cameras = {
  id: number;
  nome?: string | null;
  cadastro_hik_vision?: string | null;
  ip?: string | null;
  designacao?: string | null;
  numero_camera?: string | null;
  novo_nome?: string | null;
  contrato?: string | null;
  endereco?: string | null;
  rua?: string | null;
  bairro?: string | null;
  tipo_camera?: string | null;
  regiao?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  status?: any | null;
  dados_analiticos?: string | null;
  secretaria?: string | null;
  conferidoPor?: string | null;
  dataConferenciaGravacao?: string | null;
  dataConferenciaProblema?: string | null;
  observacoes?: string | null;
  problema?: string | null;
  tudoCerto?: any | null;
  diasGravados: string | null;
  diasFaltando: string | null;
  natureza?: string | null;
  Historico?: Historico[];
  Chamados?: Chamados[];
  Cameras_Off?: Cameras_Off[];
  Realocacoes?: Realocacoes[];
  arquivo: string | null;
};

// models/Historico.ts
export type Historico = {
  id: number;
  id_camera?: number | null;
  descricao?: string | null;
  user_name?: string | null;
  data?: Date | null;
  endereco_antigo?: string | null;
  bairro_antigo?: string | null;
  numero_antigo?: string | null;
  numero_camera_antigo?: string | null;
  numero_contrato_antigo?: string | null;
  latitude_antigo?: string | null;
  longitude_antigo?: string | null;
  cameras?: Cameras | null;
};

// models/Chamados.ts
export type Chamados = {
  id: number;
  id_camera?: number | null;
  descricao?: string | null;
  status?: any | null;
  data_abertura?: Date | null;
  data_atualizacao?: Date | null;
  solicitante?: string | null;
  protocolo?: string | null;
  motivo?: any | null;
  atualizacoes: any | null;
  cameras?: Cameras | null;
};

//models/Ocorrencias.ts
export type Ocorrencias = {
  id: number;
  id_camera?: number | null;
  descricao?: string | null;
  allCam?: any;
  status?: any | null;
  data_abertura?: Date | null;
  data_atualizacao?: Date | null;
  solicitante?: string | null;
  protocolo?: string | null;
  motivo?: string | null;
  dataInicio?: string | null;
  dataFim?: string | null;
  origem?: any | null;
  empenhoVtr?: boolean | null;
  conduzirDp?: boolean | null;
  detido?: boolean | null;
  qtd_detido?: any | null;
  procurado?: any | null;
  desaparecido?: boolean | null;
  flagrante?: boolean | null;
  veiculo?: boolean | null;
  qtd_veiculo?: any | null;
  boletimOcorrencia?: string | null;
  cameras?: Cameras | any;
  natureza?: NaturezaOcorrencia
  instituicao?: string | null;
  dataOcorrencia?: string | null;
  statusOcorrencia?: any | null;
  captura?: boolean | null;
  imgSalva?: boolean | null;
  plantao?: string | null;
  ocorrenciaPivo?: OcorrenciaPivo[]
};

export type OcorrenciaPivo = {
  id: number | null;
  ocorrenciasCamerasId: number | null;
  camerasId: number | null;
  dataInicio: string | null;
  dataFim: string | null;
}

export interface ChamadoComNumeroCamera extends Chamados {
  novo_nome: string;
  arquivo: string | null;
}

// models/Cameras_Off.ts
export type Cameras_Off = {
  id: number;
  id_camera?: number | null;
  status?: any | null;
  data_abertura?: Date | null;
  cameras?: Cameras | null;
};

// models/Realocacoes.ts
export type Realocacoes = {
  id: number;
  id_camera?: number | null;
  data_pedido?: Date | null;
  de_endereco?: string | null;
  para_endereco?: string | null;
  oficio?: string | null;
  data_oficio?: string | null;
  status?: any | null;
  cameras?: Cameras | null;
};
export type NaturezaOcorrencia = {
  id: number;
  codigo?: string;
  descricao: string;
  ativo: boolean;
}
export type Radares = {
  id: number | null;
  areaId: string | null;
  sitio: string | null;
  latitude: string | null;
  longitude: string | null;
  ultimaPassagem: string | null;
  tipo_camera: string | null;
  bairro: string | null;
  endereco: string | null;
}

export type Visita = {
  id: number | null;
  descricao: string | null;
  nome: string | null;
  cpf: string | null;
  date: any | null;
  empresa: string | null;
  qtd_pessoas: string | null;
  telefone: string | null;
  cidade: any | null;
  estado: string | null;
  pais: string | null;
  cargo: string | null;
  allVisitas?: any;
  visitasAdicionais?: VisitasAdicionais[];
}

export type VisitasAdicionais = {
  id: number | null;
  nome: string | null;
  cpf: string | null;
  telefone: string | null;
  passaporte: string | null;
  cargo: string | null;
  extrangeiro?: boolean | null;
  visitasId: number | null;
}

export type Solicitacoes = {
  id: number | null;
  expediente: string | null;
  tipo: string | null;
  solicitante: string | null;
  qtde: string | null;
  user_name: string | null;
  status?: boolean | null;
  regiao: string | null;
  bairro: string | null;
  endereco: string | null;
  observacoes: string | null;
  dataSolicitacao: string | null;
}

export type Circuitos = {
  id: number;
  regiao: string | null;
  bairro: string | null;
  endereco: string | null;
  local: string | null;
  link: string | null;
  data: string | null;
  status?: boolean | null;
}

export type dadosPortalSSP = {
  id: number;
  tipo_ocorrencia: string | null;
  data: string | null;
  quantidade: number | null;
}
