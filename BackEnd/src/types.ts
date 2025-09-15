export type Users = {
  id: number;
  username: string | null;
  password: string | null;
  email: string;
  isAdm: boolean;
};

export type Produtos = {
  id: number;
  descricao: string | null;
  valor: number | null;
};

export type Carrinho = {
  id: number;
  idProd: number;
  idUser: number;
  quantidade: number;
};