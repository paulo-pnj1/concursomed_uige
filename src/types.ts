/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Regime = 'Especial' | 'Geral';

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
  regime: Regime; // Especial = Professores | Geral = Técnico Médio
  municipioCandidatura: string;
  nivelEnsino: 'Médio Pedagógico' | 'Bacharelato' | 'Licenciatura' | 'Mestrado/Doutoramento' | 'Médio Técnico';
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

// Vagas do Regime Especial (Professores do Ensino Primário e Secundário) por município,
// conforme mapa anexo ao Despacho Nº 247/2026 do Governo Provincial do Uíge.
export interface VagaMunicipio {
  municipio: string;
  vagas13Grau: number; // Professor do Ensino Primário e Secundário do 13º Grau (Licenciatura)
  vagas6Grau: number; // Professor do Ensino Primário e Secundário do 6º Grau (Médio Pedagógico)
  totalVagas: number;
}

// Vagas do Regime Geral (Técnico Médio de 3ª Classe) por município
export interface VagaTecnicoMedio {
  municipio: string;
  vagas: number;
}

export interface VagaCategoria {
  categoria: string;
  regime: Regime;
  vagas: number;
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
  periodo?: string;
}

export interface EtapaCalendario {
  ordem: number;
  actividade: string;
  periodo: string;
  tempoUtil: string;
}

export interface MembroJuri {
  nome: string;
  cargo: string;
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
