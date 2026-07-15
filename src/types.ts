/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DocumentosStatus {
  requerimento: boolean;
  bi: boolean;
  certificado: boolean;
  inaarees: boolean;
}

export interface Reclamacao {
  descricao: string;
  data: string;
  resposta?: string;
  status: 'Pendente' | 'Respondida';
}

export interface Candidato {
  id: string; // Ex: UI-EDU-2026-3841
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  genero: 'M' | 'F';
  dataNascimento: string;
  estadoCivil: string;
  biNumero: string; // Ex: 004123456UE042
  nif?: string;
  telefone: string;
  email: string;
  municipioCandidatura: string;
  nivelEnsino: 'Médio Pedagógico' | 'Bacharelato' | 'Licenciatura' | 'Mestrado/Doutoramento';
  cursoEspecialidade: string;
  mediaFinal: number; // 10 a 20
  categoria: string;
  escolaPretendida: string;
  documentos: DocumentosStatus;
  dataSubmissao: string;
  status: 'Pendente' | 'Validado' | 'Rejeitado';
  motivoRejeicao?: string;
  notaExame?: number; // 0 a 20, preenchido se Validado
  reclamacao?: Reclamacao;
}

export interface VagaMunicipio {
  municipio: string;
  vagasPrimario: number;
  vagasSecundarioICiclo: number;
  vagasSecundarioIICiclo: number;
  totalVagas: number;
  escolasDestacadas: string[];
}

export interface VagaEspecialidade {
  especialidade: string;
  vagas: number;
  nivel: 'Primário' | 'I Ciclo' | 'II Ciclo';
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
  categoria: 'Inscrição' | 'Documentos' | 'Exame' | 'Resultados';
}

export interface FaseConcurso {
  fase: string;
  nome: string;
  descricao: string;
}

export interface InfoGeralConcurso {
  tituloAviso: string;
  entidadeOrganizadora: string;
  diplomaLegal: string;
  dataAberturaInscricoes: string; // ISO date
  dataFechoInscricoes: string; // ISO date
  dataPrevistaExame: string; // ISO date
  dataPrevistaResultados: string; // ISO date
  idadeMinima: number;
  idadeMaxima: number;
  taxaInscricao: string;
  localSubmissao: string;
  requisitosGerais: string[];
  documentosExigidos: string[];
  fasesConcurso: FaseConcurso[];
  contactos: {
    email: string;
    telefone: string;
    horario: string;
  };
}
