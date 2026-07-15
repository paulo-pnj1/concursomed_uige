/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Candidato {
  id: string; // Ex: UI-EDU-2026-3841
  nomeCompleto: string;
  biNumero: string; // Ex: 004123456UE042
  telefone: string;
  email: string;
  municipioCandidatura: string;
  nivelEnsino: 'Médio Pedagógico' | 'Bacharelato' | 'Licenciatura';
  cursoEspecialidade: string;
  mediaFinal: number; // 10 a 20
  dataSubmissao: string;
  status: 'Pendente' | 'Validado' | 'Rejeitado';
  motivoRejeicao?: string;
  notaExame?: number; // 0 a 20, preenchido se Validado
}

export interface VagaMunicipio {
  municipio: string;
  totalVagas: number;
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
  requisitosGerais: string[];
  documentosExigidos: string[];
  contactos: {
    email: string;
    telefone: string;
    horario: string;
  };
}
