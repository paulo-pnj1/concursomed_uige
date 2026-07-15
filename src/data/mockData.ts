/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VagaMunicipio, Candidato, InfoGeralConcurso } from '../types';

export const INFO_GERAL_CONCURSO: InfoGeralConcurso = {
  tituloAviso: 'Aviso de Abertura de Concurso Público de Admissão ao Quadro de Pessoal Docente — Ano Lectivo 2026/2027',
  entidadeOrganizadora: 'Governo Provincial do Uíge — Gabinete Provincial da Educação (GPE-Uíge)',
  diplomaLegal: 'Lei n.º 26/22, de 22 de Agosto, e Decreto Presidencial n.º 112/24, de 17 de Maio',
  dataAberturaInscricoes: '2026-07-01',
  dataFechoInscricoes: '2026-07-31',
  dataPrevistaExame: '2026-08-24',
  dataPrevistaResultados: '2026-09-05',
  idadeMinima: 18,
  idadeMaxima: 35,
  taxaInscricao: 'Isento de qualquer taxa de inscrição',
  requisitosGerais: [
    'Possuir nacionalidade angolana',
    'Ter idade compreendida entre os 18 e os 35 anos à data de encerramento das inscrições',
    'Ser detentor de habilitação pedagógica adequada (Médio Pedagógico, Bacharelato ou Licenciatura)',
    'Não estar abrangido por incompatibilidades ou inibições legais para o exercício de funções públicas',
    'Idoneidade cívica e disciplinar comprovada'
  ],
  documentosExigidos: [
    'Requerimento dirigido à Ministra da Educação',
    'Fotocópia do Bilhete de Identidade (B.I.) actualizado',
    'Fotocópia do Certificado de Habilitações Literárias',
    'Certificado de Registo Criminal actualizado',
    'Duas fotografias tipo passe recentes'
  ],
  contactos: {
    email: 'suporte.edu@uige.gov.ao',
    telefone: '(+244) 935 442 110',
    horario: 'Segunda a Sexta-feira, das 8h00 às 15h30'
  }
};

export const MUNICIPIOS_UIGE: string[] = [
  'Uíge (Sede)', 'Negage', 'Sanza Pombo', 'Maquela do Zombo', 'Quimbele', 'Damba',
  'Songo', 'Bungo', 'Mucaba', 'Puri', 'Cangola', 'Milunga', 'Quitexe', 'Ambuíla', 'Bembe', 'Buengas'
];

export const ESPECIALIDADES_CURSOS: string[] = [
  'Ensino Primário (Geral)', 'Língua Portuguesa', 'Matemática', 'Física', 'Química',
  'Biologia', 'História', 'Geografia', 'Educação Visual e Plástica', 'Língua Inglesa',
  'Língua Francesa', 'Educação Física', 'Pedagogia', 'Psicologia'
];

export const VAGAS_MUNICIPIOS: VagaMunicipio[] = [
  { municipio: 'Uíge (Sede)', totalVagas: 100 },
  { municipio: 'Negage', totalVagas: 55 },
  { municipio: 'Sanza Pombo', totalVagas: 42 },
  { municipio: 'Maquela do Zombo', totalVagas: 36 },
  { municipio: 'Quimbele', totalVagas: 40 },
  { municipio: 'Damba', totalVagas: 30 },
  { municipio: 'Songo', totalVagas: 28 },
  { municipio: 'Bungo', totalVagas: 22 },
  { municipio: 'Mucaba', totalVagas: 20 },
  { municipio: 'Puri', totalVagas: 24 },
  { municipio: 'Cangola', totalVagas: 20 },
  { municipio: 'Milunga', totalVagas: 23 },
  { municipio: 'Quitexe', totalVagas: 28 },
  { municipio: 'Ambuíla', totalVagas: 18 },
  { municipio: 'Bembe', totalVagas: 22 },
  { municipio: 'Buengas', totalVagas: 22 }
];

export const TOTAL_VAGAS = VAGAS_MUNICIPIOS.reduce((sum, v) => sum + v.totalVagas, 0);

export const CANDIDATOS_MOCK: Candidato[] = [
  {
    id: 'UI-EDU-2026-1025',
    nomeCompleto: 'Maria João da Silva',
    biNumero: '006542199UE045',
    telefone: '934125678',
    email: 'maria.silva.mad@hotmail.com',
    municipioCandidatura: 'Negage',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 14,
    dataSubmissao: '2026-07-02',
    status: 'Validado',
    notaExame: 16.0
  },
  {
    id: 'UI-EDU-2026-1026',
    nomeCompleto: 'Domingos João Mutongo',
    biNumero: '003214567UI032',
    telefone: '945981245',
    email: 'domingoshunter@gmail.com',
    municipioCandidatura: 'Sanza Pombo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'História',
    mediaFinal: 12,
    dataSubmissao: '2026-07-03',
    status: 'Pendente'
  },
  {
    id: 'UI-EDU-2026-1028',
    nomeCompleto: 'Afonso Pedro Cabanga',
    biNumero: '002345612UI048',
    telefone: '912445566',
    email: 'afonso.cabanga@gmail.com',
    municipioCandidatura: 'Quimbele',
    nivelEnsino: 'Bacharelato',
    cursoEspecialidade: 'Física',
    mediaFinal: 11,
    dataSubmissao: '2026-07-05',
    status: 'Rejeitado',
    motivoRejeicao: 'Falta de envio do Certificado de Habilitações Literárias obrigatório.'
  }
];
