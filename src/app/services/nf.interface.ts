export interface Endereco {
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  municipio: string;
  uf: string;
}

export interface Contato {
  id: number;
  nome: string;
  numeroDocumento: string;
  ie?: string;
  rg?: string;
  telefone: string;
  email: string;
  endereco: Endereco;
}

export interface Transportador {
  nome: string;
  numeroDocumento: string;
}

export interface Volume {
  id: number;
}

export interface Etiqueta {
  nome: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
}

export interface Transporte {
  fretePorConta: number;
  transportador: Transportador;
  volumes: Volume[];
  etiqueta: Etiqueta;
}

export interface Data {
  id: number;
  tipo: number;
  situacao: number;
  numero: string;
  dataEmissao: string;
  dataOperacao: string;
  contato: Contato;
  naturezaOperacao: { id: number };
  loja: { id: number };
  serie: number;
  chaveAcesso: string;
  xml: string;
  linkDanfe: string;
  linkPDF: string;
  transporte: Transporte;
}

export interface NotaFiscal {
  data: Data;
}

