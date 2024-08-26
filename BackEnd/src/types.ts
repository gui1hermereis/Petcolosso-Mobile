export type User = {
  id: number;
  username: string;
  password?: string;
  isAdm?: boolean;
};

export type Servicos = {
  id: number;
  descricao: string;
  valor?: string;
};