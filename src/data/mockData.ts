/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Dados actualizados com base nos documentos oficiais do Concurso Público de
 * Ingresso Externo 2026 da Província do Uíge:
 *  - Despacho Nº 247/2026, do Governador Provincial do Uíge (abertura do concurso)
 *  - Despacho Nº 27/2026, do Governador Provincial do Uíge (composição do júri)
 *  - Mapas de Atribuição de Quotas (Professores e Técnico Médio de 3ª Classe)
 *  - Calendarização das Etapas do Concurso
 */

import {
  FAQItem,
  VagaCategoria,
  VagaMunicipio,
  VagaTecnicoMedio,
  Candidato,
  InfoGeralConcurso,
  EtapaCalendario,
  MembroJuri,
} from '../types';

export const INFO_GERAL_CONCURSO: InfoGeralConcurso = {
  tituloAviso:
    'Concurso Público de Ingresso Externo 2026 -  Provimento de 396 Vagas para Professor do Ensino Primário e Secundário e 50 Vagas para Técnico Médio de 3ª Classe',
  entidadeOrganizadora: 'Governo Provincial do Uíge -  Gabinete Provincial da Educação (GPE-Uíge)',
  diplomaLegal:
    'Despacho Nº 247/2026, do Governador Provincial do Uíge, ao abrigo do Decreto Presidencial nº 104/11, de 23 de Maio, conjugado com o Decreto Presidencial nº 112/24, de 17 de Maio, e o nº 1 do Despacho nº 752/2026, de 09 de Julho, do Ministério da Educação',
  dataAberturaInscricoes: '2026-07-15',
  dataFechoInscricoes: '2026-08-04',
  dataPrevistaExame: '2026-09-02',
  dataPrevistaResultados: '2026-10-14',
  idadeMinima: 18,
  idadeMaxima: 35,
  taxaInscricao: 'Sem taxa de inscrição indicada no Despacho -  confirmar eventuais encargos junto da Direcção Municipal da Educação',
  localSubmissao: 'Candidaturas efectuadas presencialmente nas Direcções Municipais da Educação de cada município do Uíge',
  requisitosGerais: [
    'Possuir nacionalidade angolana',
    'Ter idade compreendida entre os 18 e os 35 anos à data de encerramento das inscrições',
    'Ser detentor de habilitação adequada à categoria a que concorre (Médio Pedagógico ou Licenciatura para Professor; Médio Técnico para Técnico Médio de 3ª Classe)',
    'Não estar abrangido por incompatibilidades ou inibições legais para o exercício de funções públicas',
    'Possuir capacidade física e psíquica compatível com o exercício da função',
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
    {
      fase: '1ª Fase',
      nome: 'Inscrição e Análise Documental',
      descricao: 'Inscrição dos candidatos (15/07 a 04/08), publicação das listas provisórias de admitidos e excluídos (05 a 25/08) e atendimento de reclamações (26/08 a 01/09).',
      periodo: '15/07/2026 a 01/09/2026'
    },
    {
      fase: '2ª Fase',
      nome: 'Prova Escrita e Resultados Gerais',
      descricao: 'Realização dos testes escritos (02/09), correcção das provas e afixação dos resultados gerais (03 a 25/09).',
      periodo: '02/09/2026 a 25/09/2026'
    },
    {
      fase: '3ª Fase',
      nome: 'Reclamações, Homologação e Nomeação',
      descricao: 'Atendimento e resposta às reclamações, publicação das listas finais (14/10), homologação pelo MED e emissão dos despachos de nomeação, com inserção final no SIGFE.',
      periodo: '28/09/2026 a 30/11/2026'
    }
  ],
  contactos: {
    email: 'suporte.edu@uige.gov.ao',
    telefone: '(+244) 935 442 110',
    horario: 'Segunda a Sexta-feira, das 8h00 às 15h30'
  }
};

// Calendarização oficial das etapas do concurso (Documento 5)
export const CALENDARIO_CONCURSO: EtapaCalendario[] = [
  { ordem: 1, actividade: 'Inscrição dos Candidatos', periodo: 'De 15/07 a 04/08/2026', tempoUtil: '15 dias' },
  { ordem: 2, actividade: 'Publicação das listas provisórias dos inscritos, admitidos e excluídos', periodo: 'De 05 a 25/08/2026', tempoUtil: '15 dias' },
  { ordem: 3, actividade: 'Atendimento das reclamações e respostas', periodo: 'De 26/08 a 01/09/2026', tempoUtil: '5 dias' },
  { ordem: 4, actividade: 'Realização dos testes escritos', periodo: '02/09/2026', tempoUtil: '1 dia' },
  { ordem: 5, actividade: 'Correcção das provas e afixação dos resultados gerais', periodo: 'De 03 a 25/09/2026', tempoUtil: '15 dias' },
  { ordem: 6, actividade: 'Atendimento das reclamações', periodo: 'De 28/09 a 02/10/2026', tempoUtil: '5 dias' },
  { ordem: 7, actividade: 'Respostas às reclamações', periodo: 'De 05 a 13/10/2026', tempoUtil: '7 dias' },
  { ordem: 8, actividade: 'Publicação das listas dos resultados finais e dos admitidos', periodo: '14/10/2026', tempoUtil: '1 dia' },
  { ordem: 9, actividade: 'Completar os processos individuais dos candidatos admitidos', periodo: 'De 15 a 28/10/2026', tempoUtil: '10 dias' },
  { ordem: 10, actividade: 'Homologação das listas de classificação final pelo MED', periodo: 'De 29/10 a 06/11/2026', tempoUtil: '5 dias' },
  { ordem: 11, actividade: 'Emissão dos Despachos de nomeação pelo MED', periodo: 'De 09/11 a 30/11/2026', tempoUtil: '15 dias' },
  { ordem: 12, actividade: 'Inserção no SIGFE', periodo: '- ', tempoUtil: '10 dias' }
];

// Composição do júri do concurso (Despacho Nº 27/2026)
export const JURI_CONCURSO: MembroJuri[] = [
  { nome: 'Pasi Mafuta Nova', cargo: 'Directora do Gabinete Provincial da Educação -  Presidente' },
  { nome: 'Benilde Matuvunina Quiala Gombo', cargo: 'Chefe de Departamento de Planeamento, Estatística e Recursos Humanos do GPE -  Vice-Presidente' },
  { nome: 'Tavares dos Santos Muhongo', cargo: 'Chefe de Departamento de Educação e Ensino -  Vogal' },
  { nome: 'Amâncio Paulo Neto Dembo', cargo: 'Chefe de Departamento de Gestão Administrativa do Gabinete Provincial de Recursos Humanos -  Vogal' },
  { nome: 'Afonso Makiadi dos Santos', cargo: 'Delegado Episcopal para a Educação no Uíge -  Vogal' }
];

// Os 23 municípios da Província do Uíge abrangidos pelo concurso
export const MUNICIPADOS_UIGE: string[] = [
  'Alto Zaza',
  'Ambuíla',
  'Bembe',
  'Bungo',
  'Cangola',
  'Damba',
  'Dange',
  'Lucunga',
  'Maquela do Zombo',
  'Massau',
  'Milunga',
  'Mucaba',
  'Negage',
  'Nova Esperança',
  'Nsosso',
  'Puri',
  'Quimbele',
  'Quipedro',
  'Sacandica',
  'Sanza Pombo',
  'Songo',
  'Uíge',
  'Vista Alegre'
];

// Categorias de ingresso, por regime do concurso
export const CATEGORIAS_CONCURSO = [
  { id: 'prof_13', nome: 'Professor do Ensino Primário e Secundário do 13º Grau', habilitacao: 'Licenciatura', regime: 'Especial' as const },
  { id: 'prof_6', nome: 'Professor do Ensino Primário e Secundário do 6º Grau', habilitacao: 'Médio Pedagógico', regime: 'Especial' as const },
  { id: 'tec_medio', nome: 'Técnico Médio de 3ª Classe', habilitacao: 'Médio Técnico', regime: 'Geral' as const }
];

// Mantido por compatibilidade com o nome usado anteriormente no formulário
export const CATEGORIAS_DOCENTES = CATEGORIAS_CONCURSO;

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
  'Psicologia',
  'Gestão e Administração',
  'Contabilidade',
  'Informática',
  'Técnico Médio (Área Geral)'
];

// Vagas do Regime Especial -  Professor do Ensino Primário e Secundário, por município
// (Mapa de Atribuição de Quotas anexo ao Despacho Nº 247/2026)
export const VAGAS_MUNICIPADOS: VagaMunicipio[] = [
  { municipio: 'Alto Zaza', vagas13Grau: 9, vagas6Grau: 5, totalVagas: 14 },
  { municipio: 'Ambuíla', vagas13Grau: 8, vagas6Grau: 10, totalVagas: 18 },
  { municipio: 'Bembe', vagas13Grau: 8, vagas6Grau: 5, totalVagas: 13 },
  { municipio: 'Bungo', vagas13Grau: 7, vagas6Grau: 9, totalVagas: 16 },
  { municipio: 'Cangola', vagas13Grau: 7, vagas6Grau: 8, totalVagas: 15 },
  { municipio: 'Damba', vagas13Grau: 8, vagas6Grau: 12, totalVagas: 20 },
  { municipio: 'Dange', vagas13Grau: 9, vagas6Grau: 10, totalVagas: 19 },
  { municipio: 'Lucunga', vagas13Grau: 10, vagas6Grau: 2, totalVagas: 12 },
  { municipio: 'Maquela do Zombo', vagas13Grau: 11, vagas6Grau: 10, totalVagas: 21 },
  { municipio: 'Massau', vagas13Grau: 7, vagas6Grau: 4, totalVagas: 11 },
  { municipio: 'Milunga', vagas13Grau: 10, vagas6Grau: 5, totalVagas: 15 },
  { municipio: 'Mucaba', vagas13Grau: 8, vagas6Grau: 6, totalVagas: 14 },
  { municipio: 'Negage', vagas13Grau: 10, vagas6Grau: 15, totalVagas: 25 },
  { municipio: 'Nova Esperança', vagas13Grau: 11, vagas6Grau: 7, totalVagas: 18 },
  { municipio: 'Nsosso', vagas13Grau: 10, vagas6Grau: 6, totalVagas: 16 },
  { municipio: 'Puri', vagas13Grau: 10, vagas6Grau: 6, totalVagas: 16 },
  { municipio: 'Quimbele', vagas13Grau: 11, vagas6Grau: 10, totalVagas: 21 },
  { municipio: 'Quipedro', vagas13Grau: 9, vagas6Grau: 0, totalVagas: 9 },
  { municipio: 'Sacandica', vagas13Grau: 10, vagas6Grau: 6, totalVagas: 16 },
  { municipio: 'Sanza Pombo', vagas13Grau: 11, vagas6Grau: 7, totalVagas: 18 },
  { municipio: 'Songo', vagas13Grau: 10, vagas6Grau: 5, totalVagas: 15 },
  { municipio: 'Uíge', vagas13Grau: 20, vagas6Grau: 18, totalVagas: 38 },
  { municipio: 'Vista Alegre', vagas13Grau: 10, vagas6Grau: 6, totalVagas: 16 }
];

// Vagas do Regime Geral -  Técnico Médio de 3ª Classe, por município
export const VAGAS_TECNICO_MEDIO: VagaTecnicoMedio[] = [
  { municipio: 'Alto Zaza', vagas: 2 },
  { municipio: 'Ambuíla', vagas: 2 },
  { municipio: 'Bembe', vagas: 1 },
  { municipio: 'Bungo', vagas: 2 },
  { municipio: 'Cangola', vagas: 2 },
  { municipio: 'Damba', vagas: 2 },
  { municipio: 'Dange', vagas: 2 },
  { municipio: 'Lucunga', vagas: 2 },
  { municipio: 'Maquela do Zombo', vagas: 2 },
  { municipio: 'Massau', vagas: 2 },
  { municipio: 'Milunga', vagas: 2 },
  { municipio: 'Mucaba', vagas: 2 },
  { municipio: 'Negage', vagas: 3 },
  { municipio: 'Nova Esperança', vagas: 2 },
  { municipio: 'Nsosso', vagas: 3 },
  { municipio: 'Puri', vagas: 1 },
  { municipio: 'Quimbele', vagas: 2 },
  { municipio: 'Quipedro', vagas: 2 },
  { municipio: 'Sacandica', vagas: 2 },
  { municipio: 'Sanza Pombo', vagas: 2 },
  { municipio: 'Songo', vagas: 3 },
  { municipio: 'Uíge', vagas: 5 },
  { municipio: 'Vista Alegre', vagas: 2 }
];

// Totais por categoria/regime, à escala provincial
export const VAGAS_CATEGORIA: VagaCategoria[] = [
  { categoria: 'Professor do Ensino Primário e Secundário do 13º Grau', regime: 'Especial', vagas: 224 },
  { categoria: 'Professor do Ensino Primário e Secundário do 6º Grau', regime: 'Especial', vagas: 172 },
  { categoria: 'Técnico Médio de 3ª Classe', regime: 'Geral', vagas: 50 }
];

// Mantido por compatibilidade com o nome usado anteriormente na lista de vagas
export const VAGAS_ESPECIALIDADES = VAGAS_CATEGORIA;

export const TOTAL_VAGAS_PROFESSORES = 396;
export const TOTAL_VAGAS_TECNICO_MEDIO = 50;
export const TOTAL_VAGAS_CONCURSO = TOTAL_VAGAS_PROFESSORES + TOTAL_VAGAS_TECNICO_MEDIO;

export const REGIMES_CONCURSO = [
  {
    id: 'Especial' as const,
    nome: 'Regime Especial -  Professor do Ensino Primário e Secundário',
    vagasTotais: TOTAL_VAGAS_PROFESSORES,
    descricao: '224 vagas para o 13º Grau (Licenciatura) e 172 vagas para o 6º Grau (Médio Pedagógico), distribuídas pelos 23 municípios do Uíge.'
  },
  {
    id: 'Geral' as const,
    nome: 'Regime Geral -  Técnico Médio de 3ª Classe',
    vagasTotais: TOTAL_VAGAS_TECNICO_MEDIO,
    descricao: '50 vagas distribuídas pelos 23 municípios do Uíge para técnico médio de 3ª classe.'
  }
];

export const FAQS: FAQItem[] = [
  {
    pergunta: 'Quantas vagas tem este concurso e em que regimes?',
    resposta: 'O concurso abrange dois regimes distintos: o Regime Especial, com 396 vagas para Professor do Ensino Primário e Secundário (224 do 13º Grau e 172 do 6º Grau), e o Regime Geral, com 50 vagas para Técnico Médio de 3ª Classe. No total, são 446 vagas distribuídas pelos 23 municípios da Província do Uíge.',
    categoria: 'Inscrição'
  },
  {
    pergunta: 'Até quando posso submeter a minha candidatura?',
    resposta: 'As inscrições decorrem de 15 de Julho a 04 de Agosto de 2026, num total de 15 dias úteis. Após esta data, o Gabinete Provincial da Educação publicará as listas provisórias dos candidatos admitidos e excluídos.',
    categoria: 'Inscrição'
  },
  {
    pergunta: 'Quem se pode candidatar a este concurso público?',
    resposta: 'Para o Regime Especial (Professor), candidatos habilitados com Médio Pedagógico (categoria do 6º Grau) ou Licenciatura em áreas pedagógicas (categoria do 13º Grau). Para o Regime Geral (Técnico Médio de 3ª Classe), candidatos detentores de habilitação de nível médio técnico.',
    categoria: 'Inscrição'
  },
  {
    pergunta: 'Que documentos são exigidos para formalizar a candidatura?',
    resposta: 'São exigidos os seguintes documentos: Requerimento dirigido à Ministra da Educação, Fotocópia do B.I. actualizado, Fotocópia do Certificado de Habilitações Literárias, Declaração do INAAREES (apenas para habilitações obtidas no exterior), Certificado de Registo Criminal actualizado, Atestado Médico de robustez física e perfil psíquico, e 2 fotografias tipo passe. Todos os ficheiros devem ser legíveis e em formato PDF com tamanho máximo de 2 MB.',
    categoria: 'Documentos'
  },
  {
    pergunta: 'Como funciona o processo de selecção e exame?',
    resposta: 'Após a análise documental e publicação das listas de admitidos, os candidatos validados realizam uma prova escrita única, marcada para 02 de Setembro de 2026. Segue-se a correcção das provas, publicação dos resultados gerais, período de reclamações e, por fim, a publicação da lista de resultados finais.',
    categoria: 'Exame'
  },
  {
    pergunta: 'Posso candidatar-me a mais de um município, categoria ou regime?',
    resposta: 'Não. Cada candidato só pode submeter uma única inscrição para um único regime, categoria e município. Inscrições duplas ou duplicadas serão sumariamente anuladas e excluídas pelo sistema do Gabinete Provincial da Educação.',
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
    regime: 'Especial',
    municipioCandidatura: 'Uíge',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Matemática',
    mediaFinal: 15,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação do Uíge',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-15',
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
    regime: 'Especial',
    municipioCandidatura: 'Negage',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 14,
    categoria: 'Professor do Ensino Primário e Secundário do 6º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação de Negage',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-15',
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
    regime: 'Especial',
    municipioCandidatura: 'Sanza Pombo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'História',
    mediaFinal: 12,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação de Sanza Pombo',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-15',
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
    regime: 'Especial',
    municipioCandidatura: 'Maquela do Zombo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Língua Portuguesa',
    mediaFinal: 16,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação de Maquela do Zombo',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-16',
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
    regime: 'Especial',
    municipioCandidatura: 'Quimbele',
    nivelEnsino: 'Bacharelato',
    cursoEspecialidade: 'Física',
    mediaFinal: 11,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação de Quimbele',
    documentos: { requerimento: true, bi: true, certificado: false, inaarees: false },
    dataSubmissao: '2026-07-16',
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
    regime: 'Especial',
    municipioCandidatura: 'Damba',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Biologia',
    mediaFinal: 17,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação da Damba',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-17',
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
    regime: 'Especial',
    municipioCandidatura: 'Songo',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Geografia',
    mediaFinal: 13,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação do Songo',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-17',
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
    regime: 'Especial',
    municipioCandidatura: 'Bungo',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 15,
    categoria: 'Professor do Ensino Primário e Secundário do 6º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação do Bungo',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-18',
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
    regime: 'Especial',
    municipioCandidatura: 'Uíge',
    nivelEnsino: 'Licenciatura',
    cursoEspecialidade: 'Língua Francesa',
    mediaFinal: 14,
    categoria: 'Professor do Ensino Primário e Secundário do 13º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação do Uíge',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-18',
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
    regime: 'Especial',
    municipioCandidatura: 'Mucaba',
    nivelEnsino: 'Médio Pedagógico',
    cursoEspecialidade: 'Ensino Primário (Geral)',
    mediaFinal: 10,
    categoria: 'Professor do Ensino Primário e Secundário do 6º Grau',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação de Mucaba',
    documentos: { requerimento: false, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-19',
    status: 'Rejeitado',
    motivoRejeicao: 'Média final de curso inferior ao perfil de admissão e falta de upload do Requerimento à Ministra.'
  },
  {
    id: 'UI-EDU-2026-1034',
    nomeCompleto: 'Ricardo Mateus Bumba',
    nomePai: 'Mateus Bumba',
    nomeMae: 'Ana Paula Bumba',
    genero: 'M',
    dataNascimento: '1996-10-09',
    estadoCivil: 'Solteiro',
    biNumero: '004112233UI046',
    nif: '4112233046',
    telefone: '913345678',
    email: 'ricardo.bumba@gmail.com',
    regime: 'Geral',
    municipioCandidatura: 'Uíge',
    nivelEnsino: 'Médio Técnico',
    cursoEspecialidade: 'Contabilidade',
    mediaFinal: 13,
    categoria: 'Técnico Médio de 3ª Classe',
    escolaPretendida: 'A atribuir pela Direcção Municipal da Educação do Uíge',
    documentos: { requerimento: true, bi: true, certificado: true, inaarees: false },
    dataSubmissao: '2026-07-19',
    status: 'Pendente'
  }
];
