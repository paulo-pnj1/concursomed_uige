/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQItem, VagaEspecialidade, VagaMunicipio, Candidato, InfoGeralConcurso } from '../types';

export const INFO_GERAL_CONCURSO: InfoGeralConcurso = {
  tituloAviso: 'Aviso de Abertura de Concurso Público de Admissão ao Quadro de Pessoal Docente — Ano Lectivo 2026/2027',
  entidadeOrganizadora: 'Governo Provincial do Uíge — Gabinete Provincial da Educação (GPE-Uíge)',
  diplomaLegal: 'Ao abrigo do Decreto Presidencial n.º 102/20, de 1 de Abril (Estatuto da Carreira Docente) e demais legislação da Função Pública em vigor',
  dataAberturaInscricoes: '2026-07-01',
  dataFechoInscricoes: '2026-07-31',
  dataPrevistaExame: '2026-08-24',
  dataPrevistaResultados: '2026-09-05',
  idadeMinima: 18,
  idadeMaxima: 35,
  taxaInscricao: 'Isento de qualquer taxa de inscrição',
  localSubmissao: 'Submissão online através deste Portal, ou presencialmente na sede do Gabinete Provincial da Educação do Uíge',
  requisitosGerais: [
    'Possuir nacionalidade angolana',
    'Ter idade compreendida entre os 18 e os 35 anos à data de encerramento das inscrições',
    'Ser detentor de habilitação pedagógica adequada à categoria a que concorre (Médio Pedagógico, Bacharelato ou Licenciatura)',
    'Não estar abrangido por incompatibilidades ou inibições legais para o exercício de funções públicas',
    'Possuir capacidade física e psíquica compatível com o exercício da função docente',
    'Idoneidade cívica e disciplinar comprovada'
  ],
  documentosExigidos: [
    'Requerimento dirigido à Ministra da Educação',
    'Fotocópia do Bilhete de Identidade (B.I.) actualizado',
    'Fotocópia do Certificado de Habilitações Literárias',
    'Declaração do INAAREES (obrigatória apenas para habilitações obtidas no estrangeiro)',
    'Certificado de Registo Criminal actualizado',
    'Atestado Médico de robustez física e perfil psíquico',
    'Duas fotografias tipo passe recentes'
  ],
  fasesConcurso: [
    { fase: '1ª Fase', nome: 'Análise Documental e de Requisitos de Admissão', descricao: 'Verificação da conformidade e completude dos documentos submetidos por cada candidato.' },
    { fase: '2ª Fase', nome: 'Prova Escrita de Conhecimentos', descricao: 'Exame escrito de especialidade e cultura geral, de carácter eliminatório, para candidatos com candidatura validada.' },
    { fase: '3ª Fase', nome: 'Ordenação e Homologação', descricao: 'Ordenação final por nota, publicação da lista de vencedores e homologação superior pelo Governo Provincial.' }
  ],
  contactos: {
    email: 'suporte.edu@uige.gov.ao',
    telefone: '(+244) 935 442 110',
    horario: 'Segunda a Sexta-feira, das 8h00 às 15h30'
  }
};

export const MUNICIPADOS_UIGE: string[] = [
  'Uíge (Sede)',
  'Negage',
  'Sanza Pombo',
  'Maquela do Zombo',
  'Quimbele',
  'Damba',
  'Songo',
  'Bungo',
  'Mucaba',
  'Puri',
  'Cangola',
  'Milunga',
  'Quitexe',
  'Ambuíla',
  'Bembe',
  'Buengas'
];

export const ESCOLAS_POR_MUNICIPIO: Record<string, string[]> = {
  'Uíge (Sede)': [
    'Magistério Primário e Secundário do Uíge',
    'Liceu Nacional do Uíge (Nº 178)',
    'Instituto Médio de Saúde do Uíge',
    'Escola de Formação de Professores Garcia Neto',
    'Complexo Escolar do Mbemba Ngango',
    'Escola Primária e Secundária Catorze de Abril'
  ],
  'Negage': [
    'Instituto Médio Politécnico do Negage',
    'Escola Secundária do II Ciclo Dr. António Agostinho Neto',
    'Complexo Escolar do Negage',
    'Escola Primária nº 12 - Negage'
  ],
  'Sanza Pombo': [
    'Escola do Magistério de Sanza Pombo',
    'Complexo Escolar Comandante Bula',
    'Escola Secundária do II Ciclo de Sanza Pombo'
  ],
  'Maquela do Zombo': [
    'Liceu de Maquela do Zombo',
    'Complexo Escolar de Maquela (Sede)',
    'Escola Primária do Beu',
    'Escola Secundária de Cuilo Futa'
  ],
  'Quimbele': [
    'Complexo Escolar de Quimbele',
    'Escola Primária nº 70 - Icoca',
    'Escola Secundária do II Ciclo de Quimbele'
  ],
  'Damba': [
    'Complexo Escolar da Damba (Sede)',
    'Escola Primária do Nsosso',
    'Escola do I Ciclo Rainha Ginga'
  ],
  'Songo': [
    'Escola Secundária do Songo (Sede)',
    'Complexo Escolar Comandante Kassanji',
    'Escola Primária do Songo'
  ],
  'Bungo': [
    'Complexo Escolar do Bungo',
    'Escola Primária nº 124 - Bungo Sede'
  ],
  'Mucaba': [
    'Complexo Escolar do Mucaba',
    'Escola Primária nº 85 - Mucaba'
  ],
  'Puri': [
    'Escola Secundária do II Ciclo do Puri',
    'Complexo Escolar Samora Machel'
  ],
  'Cangola': [
    'Complexo Escolar de Cangola',
    'Escola Primária de Bengo-Sanza'
  ],
  'Milunga': [
    'Complexo Escolar Comandante Jika - Milunga',
    'Escola Primária de Macolo'
  ],
  'Quitexe': [
    'Escola Secundária do Quitexe',
    'Complexo Escolar Dr. António Agostinho Neto'
  ],
  'Ambuíla': [
    'Complexo Escolar de Ambuíla Sede',
    'Escola Primária do Quipedro'
  ],
  'Bembe': [
    'Escola do Magistério do Bembe',
    'Complexo Escolar Comandante Valódia'
  ],
  'Buengas': [
    'Complexo Escolar das Buengas Sede',
    'Escola Primária do Nova Esperança'
  ]
};

export const CATEGORIAS_DOCENTES = [
  { id: 'prim_aux', nome: 'Professor do Ensino Primário Auxiliar do 6º Grau', habilitacao: 'Médio Pedagógico' },
  { id: 'prim_mid', nome: 'Professor do Ensino Primário do 6º Grau', habilitacao: 'Licenciatura' },
  { id: 'sec_1_aux', nome: 'Professor do I Ciclo do Ensino Secundário Auxiliar do 6º Grau', habilitacao: 'Médio Pedagógico' },
  { id: 'sec_1_mid', nome: 'Professor do I Ciclo do Ensino Secundário do 6º Grau', habilitacao: 'Licenciatura' },
  { id: 'sec_2_aux', nome: 'Professor do II Ciclo do Ensino Secundário Auxiliar do 6º Grau', habilitacao: 'Médio Pedagógico' },
  { id: 'sec_2_mid', nome: 'Professor do II Ciclo do Ensino Secundário do 6º Grau', habilitacao: 'Licenciatura' }
];

export const ESPECIALIDADES_CURSOS = [
  'Ensino Primário (Geral)',
  'Língua Portuguesa',
  'Matemática',
  'Física',
  'Química',
  'Biologia',
  'História',
  'Geografia',
  'Educação Visual e Plástica',
  'Língua Inglesa',
  'Língua Francesa',
  'Educação Física',
  'Pedagogia',
  'Psicologia'
];

export const VAGAS_MUNICIPADOS: VagaMunicipio[] = [
  { municipio: 'Uíge (Sede)', vagasPrimario: 45, vagasSecundarioICiclo: 30, vagasSecundarioIICiclo: 25, totalVagas: 100, escolasDestacadas: ['Magistério do Uíge', 'Liceu Nº 178'] },
  { municipio: 'Negage', vagasPrimario: 25, vagasSecundarioICiclo: 15, vagasSecundarioIICiclo: 15, totalVagas: 55, escolasDestacadas: ['IM Politécnico', 'Escola Dr. Agostinho Neto'] },
  { municipio: 'Sanza Pombo', vagasPrimario: 20, vagasSecundarioICiclo: 12, vagasSecundarioIICiclo: 10, totalVagas: 42, escolasDestacadas: ['Magistério Sanza Pombo'] },
  { municipio: 'Maquela do Zombo', vagasPrimario: 18, vagasSecundarioICiclo: 10, vagasSecundarioIICiclo: 8, totalVagas: 36, escolasDestacadas: ['Complexo Maquela Sede'] },
  { municipio: 'Quimbele', vagasPrimario: 22, vagasSecundarioICiclo: 10, vagasSecundarioIICiclo: 8, totalVagas: 40, escolasDestacadas: ['Liceu de Quimbele'] },
  { municipio: 'Damba', vagasPrimario: 15, vagasSecundarioICiclo: 8, vagasSecundarioIICiclo: 7, totalVagas: 30, escolasDestacadas: ['Complexo da Damba'] },
  { municipio: 'Songo', vagasPrimario: 14, vagasSecundarioICiclo: 8, vagasSecundarioIICiclo: 6, totalVagas: 28, escolasDestacadas: ['Escola Secundária do Songo'] },
  { municipio: 'Bungo', vagasPrimario: 12, vagasSecundarioICiclo: 6, vagasSecundarioIICiclo: 4, totalVagas: 22, escolasDestacadas: ['Complexo do Bungo'] },
  { municipio: 'Mucaba', vagasPrimario: 10, vagasSecundarioICiclo: 6, vagasSecundarioIICiclo: 4, totalVagas: 20, escolasDestacadas: ['Complexo de Mucaba'] },
  { municipio: 'Puri', vagasPrimario: 12, vagasSecundarioICiclo: 7, vagasSecundarioIICiclo: 5, totalVagas: 24, escolasDestacadas: ['Liceu do Puri'] },
  { municipio: 'Cangola', vagasPrimario: 11, vagasSecundarioICiclo: 5, vagasSecundarioIICiclo: 4, totalVagas: 20, escolasDestacadas: ['Complexo de Cangola'] },
  { municipio: 'Milunga', vagasPrimario: 13, vagasSecundarioICiclo: 6, vagasSecundarioIICiclo: 4, totalVagas: 23, escolasDestacadas: ['Complexo Jika'] },
  { municipio: 'Quitexe', vagasPrimario: 14, vagasSecundarioICiclo: 8, vagasSecundarioIICiclo: 6, totalVagas: 28, escolasDestacadas: ['Escola Secundária de Quitexe'] },
  { municipio: 'Ambuíla', vagasPrimario: 10, vagasSecundarioICiclo: 5, vagasSecundarioIICiclo: 3, totalVagas: 18, escolasDestacadas: ['Complexo Ambuíla Sede'] },
  { municipio: 'Bembe', vagasPrimario: 12, vagasSecundarioICiclo: 6, vagasSecundarioIICiclo: 4, totalVagas: 22, escolasDestacadas: ['Magistério do Bembe'] },
  { municipio: 'Buengas', vagasPrimario: 15, vagasSecundarioICiclo: 5, vagasSecundarioIICiclo: 2, totalVagas: 22, escolasDestacadas: ['Complexo Buengas Sede'] }
];

export const VAGAS_ESPECIALIDADES: VagaEspecialidade[] = [
  { especialidade: 'Ensino Primário (Geral)', vagas: 278, nivel: 'Primário' },
  { especialidade: 'Língua Portuguesa', vagas: 85, nivel: 'I Ciclo' },
  { especialidade: 'Matemática', vagas: 92, nivel: 'II Ciclo' },
  { especialidade: 'Física', vagas: 42, nivel: 'II Ciclo' },
  { especialidade: 'Química', vagas: 38, nivel: 'II Ciclo' },
  { especialidade: 'Biologia', vagas: 35, nivel: 'I Ciclo' },
  { especialidade: 'História', vagas: 48, nivel: 'I Ciclo' },
  { especialidade: 'Geografia', vagas: 45, nivel: 'I Ciclo' },
  { especialidade: 'Língua Inglesa', vagas: 32, nivel: 'II Ciclo' },
  { especialidade: 'Língua Francesa', vagas: 20, nivel: 'II Ciclo' },
  { especialidade: 'Educação Física', vagas: 18, nivel: 'I Ciclo' },
  { especialidade: 'Pedagogia', vagas: 15, nivel: 'II Ciclo' }
];

export const FAQS: FAQItem[] = [
  {
    pergunta: 'Quem se pode candidatar a este concurso público?',
    resposta: 'Cidadãos angolanos habilitados com formação pedagógica (Médio Pedagógico, Licenciatura em Ciências da Educação ou bacharelato correspondente). Candidatos de áreas não pedagógicas podem concorrer se possuírem agregação pedagógica comprovada por órgão competente.',
    categoria: 'Inscrição'
  },
  {
    pergunta: 'Que documentos são exigidos para formalizar a candidatura?',
    resposta: 'São exigidos os seguintes documentos: Requerimento dirigido à Ministra da Educação, Fotocópia do B.I. actualizado, Fotocópia do Certificado de Habilitações Literárias, Declaração do INAAREES (apenas para habilitações obtidas no exterior), Certificado de Registo Criminal actualizado, Atestado Médico de robustez física e perfil psíquico, e 2 fotografias tipo passe. Todos os ficheiros devem ser legíveis e em formato PDF com tamanho máximo de 2 MB.',
    categoria: 'Documentos'
  },
  {
    pergunta: 'Qual é o limite de idade para admissão no sector da educação?',
    resposta: 'O limite de idade geral para ingresso na Função Pública em Angola é de 35 anos. No entanto, existem regimes especiais e excepções regulamentadas no edital oficial do concurso. Recomendamos verificar os termos exactos do edital para o corrente ano.',
    categoria: 'Inscrição'
  },
  {
    pergunta: 'Como funciona o processo de selecção e exame?',
    resposta: 'O concurso compreende duas fases eliminatórias: 1) Prova de Análise Documental e de Requisitos de Admissão, e 2) Prova Escrita de Conhecimentos (exame escrito de especialidade e cultura geral). Apenas candidatos com candidaturas validadas poderão realizar o exame escrito.',
    categoria: 'Exame'
  },
  {
    pergunta: 'Posso candidatar-me a mais de um município ou categoria?',
    resposta: 'Não. Cada candidato só pode submeter uma única inscrição para uma única vaga, categoria e município. Inscrições duplas ou duplicadas serão sumariamente anuladas e excluídas pelo sistema do Gabinete Provincial da Educação.',
    categoria: 'Inscrição'
  },
  {
    pergunta: 'Como consultar o resultado da minha candidatura?',
    resposta: 'Basta aceder à secção "Consultar Candidatura" neste portal, inserir o número do seu Bilhete de Identidade (BI) ou o Código de Candidatura recebido no recibo de inscrição. O sistema apresentará em tempo real o estado de admissão.',
    categoria: 'Resultados'
  }
];

export const CANDIDATOS_MOCK: Candidato[] = [
  {
    id: 'UI-EDU-2026-1024',
    nomeCompleto: 'António Manuel Francisco',
    nomePai: 'Manuel Francisco',
    nomeMae: 'Isabel Ginga Francisco',
    genero: 'M',
    dataNascimento: '1998-04-12',
    estadoCivil: 'Solteiro',
    biNumero: '005423122UI041',
    nif: '5423122041',
    telefone: '923456781',
    email: 'antonio.manuel@gmail.com',
    municipioCandidatura: 'Uíge (Sede)',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Matemática',
    mediaFinal: 15,
    categoria: 'Professor do II Ciclo do Ensino Secundário do 6º Grau',
    escolaPretendida: 'Liceu Nacional do Uíge (Nº 178)',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-01',
    status: 'Validado',
    notaExame: 14.5
  },
  {
    id: 'UI-EDU-2026-1025',
    nomeCompleto: 'Maria Madalena da Silva',
    nomePai: 'José da Silva',
    nomeMae: 'Esperança João da Silva',
    genero: 'F',
    dataNascimento: '2001-08-22',
    estadoCivil: 'Solteira',
    biNumero: '006542199UE045',
    nif: '6542199045',
    telefone: '934125678',
    email: 'maria.silva.mad@hotmail.com',
    municipioCandidatura: 'Negage',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 14,
    categoria: 'Professor do Ensino Primário Auxiliar do 6º Grau',
    escolaPretendida: 'Escola Primária nº 12 - Negage',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-02',
    status: 'Validado',
    notaExame: 16.0
  },
  {
    id: 'UI-EDU-2026-1026',
    nomeCompleto: 'Domingos João Mutongo',
    nomePai: 'Sebastião Mutongo',
    nomeMae: 'Clara Gaspar Mutongo',
    genero: 'M',
    dataNascimento: '1995-11-05',
    estadoCivil: 'Casado',
    biNumero: '003214567UI032',
    nif: '3214567032',
    telefone: '945981245',
    email: 'domingoshunter@gmail.com',
    municipioCandidatura: 'Sanza Pombo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'História',
    mediaFinal: 12,
    categoria: 'Professor do I Ciclo do Ensino Secundário do 6º Grau',
    escolaPretendida: 'Escola do Magistério de Sanza Pombo',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-03',
    status: 'Pendente'
  },
  {
    id: 'UI-EDU-2026-1027',
    nomeCompleto: 'Teresa Amélia Ngola',
    nomePai: 'Afonso Ngola',
    nomeMae: 'Augusta Pedro Ngola',
    genero: 'F',
    dataNascimento: '1999-01-30',
    estadoCivil: 'Solteira',
    biNumero: '001245982UE049',
    telefone: '922459012',
    email: 'teresa.ngola@outlook.com',
    municipioCandidatura: 'Maquela do Zombo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Língua Portuguesa',
    mediaFinal: 16,
    categoria: 'Professor do II Ciclo do Ensino Secundário do 6º Grau',
    escolaPretendida: 'Liceu de Maquela do Zombo',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-04',
    status: 'Validado',
    notaExame: 11.2
  },
  {
    id: 'UI-EDU-2026-1028',
    nomeCompleto: 'Afonso Pedro Cabanga',
    nomePai: 'Pedro Cabanga',
    nomeMae: 'Rita Luísa Cabanga',
    genero: 'M',
    dataNascimento: '1992-06-15',
    estadoCivil: 'Casado',
    biNumero: '002345612UI048',
    telefone: '912445566',
    email: 'afonso.cabanga@gmail.com',
    municipioCandidatura: 'Quimbele',
    nivelEnsino: 'Bacharelato',
    cursoEspecialidade: 'Física',
    mediaFinal: 11,
    categoria: 'Professor do I Ciclo do Ensino Secundário Auxiliar do 6º Grau',
    escolaPretendida: 'Complexo Escolar de Quimbele',
    documentos: { requerimento: true, bi: true, certificado: false, inaarees: false },
    dataSubmissao: '2026-07-05',
    status: 'Rejeitado',
    motivoRejeicao: 'Falta de envio do Certificado de Habilitações Literárias obrigatório.'
  },
  {
    id: 'UI-EDU-2026-1029',
    nomeCompleto: 'Francisca Helena Miguel',
    nomePai: 'Miguel João Miguel',
    nomeMae: 'Helena Afonso Miguel',
    genero: 'F',
    dataNascimento: '2000-09-11',
    estadoCivil: 'Solteira',
    biNumero: '007654312UI043',
    telefone: '933564789',
    email: 'francisca.miguel@gmail.com',
    municipioCandidatura: 'Damba',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Biologia',
    mediaFinal: 17,
    categoria: 'Professor do II Ciclo do Ensino Secundário do 6º Grau',
    escolaPretendida: 'Complexo Escolar da Damba (Sede)',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-05',
    status: 'Validado',
    notaExame: 17.8
  },
  {
    id: 'UI-EDU-2026-1030',
    nomeCompleto: 'Sebastião Lucas Neto',
    nomePai: 'Lucas Neto',
    nomeMae: 'Catarina Mateus Neto',
    genero: 'M',
    dataNascimento: '1997-03-25',
    estadoCivil: 'Solteiro',
    biNumero: '009854321UE042',
    telefone: '944893421',
    email: 'seba.neto97@gmail.com',
    municipioCandidatura: 'Songo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Geografia',
    mediaFinal: 13,
    categoria: 'Professor do I Ciclo do Ensino Secundário do 6º Grau',
    escolaPretendida: 'Escola Secundária do Songo (Sede)',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-06',
    status: 'Pendente'
  },
  {
    id: 'UI-EDU-2026-1031',
    nomeCompleto: 'Benvinda Antónia Coxe',
    nomePai: 'António Coxe',
    nomeMae: 'Maria Coxe',
    genero: 'F',
    dataNascimento: '2002-12-12',
    estadoCivil: 'Solteira',
    biNumero: '008543122UI047',
    telefone: '921567432',
    email: 'benvinda.coxe@outlook.com',
    municipioCandidatura: 'Bungo',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 15,
    categoria: 'Professor do Ensino Primário Auxiliar do 6º Grau',
    escolaPretendida: 'Escola Primária nº 124 - Bungo Sede',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-06',
    status: 'Validado',
    notaExame: 15.1
  },
  {
    id: 'UI-EDU-2026-1032',
    nomeCompleto: 'Lando Gaspar Macondo',
    nomePai: 'Gaspar Macondo',
    nomeMae: 'Helena Lando Macondo',
    genero: 'M',
    dataNascimento: '1994-05-18',
    estadoCivil: 'Casado',
    biNumero: '001928374UI040',
    telefone: '925432109',
    email: 'lando.gaspar@gmail.com',
    municipioCandidatura: 'Uíge (Sede)',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Língua Francesa',
    mediaFinal: 14,
    categoria: 'Professor do II Ciclo do Ensino Secundário do 6º Grau',
    escolaPretendida: 'Liceu Nacional do Uíge (Nº 178)',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-07',
    status: 'Validado',
    notaExame: 12.0
  },
  {
    id: 'UI-EDU-2026-1033',
    nomeCompleto: 'Isabel Carina João',
    nomePai: 'Mateus João',
    nomeMae: 'Sílvia António João',
    genero: 'F',
    dataNascimento: '2001-02-05',
    estadoCivil: 'Solteira',
    biNumero: '005522331UI044',
    telefone: '931224455',
    email: 'isabel.carina@hotmail.com',
    municipioCandidatura: 'Mucaba',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 10,
    categoria: 'Professor do Ensino Primário Auxiliar do 6º Grau',
    escolaPretendida: 'Escola Primária nº 85 - Mucaba',
    documentos: { requerimento: false, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-07',
    status: 'Rejeitado',
    motivoRejeicao: 'Média final de curso inferior ao perfil de admissão e falta de upload do Requerimento à Ministra.'
  }
];
