/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Candidato, VagaMunicipio } from '../types';
import { VAGAS_MUNICIPADOS, MUNICIPADOS_UIGE } from '../data/mockData';
import InfoGeralConcursoPanel from './InfoGeralConcursoPanel';
import { 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  FileText, 
  ShieldAlert, 
  HelpCircle,
  Download,
  Calculator,
  Award,
  FileDown
} from 'lucide-react';

interface DashboardProps {
  candidates: Candidato[];
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ candidates, setActiveTab }: DashboardProps) {
  // Simulator states based on real Angolan Ministry guidelines (Decreto Presidencial 102/20)
  const [simMedia, setSimMedia] = useState<number>(14);
  const [simAgregado, setSimAgregado] = useState<boolean>(true);
  const [simExperiencia, setSimExperiencia] = useState<number>(1); // years of experience
  const [simResidente, setSimResidente] = useState<boolean>(true);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Score formula: Course Average + 2 (if aggregated/pedagogic) + experience (up to 3) + 1 (if local resident)
  const calculatedScore = Number((simMedia + (simAgregado ? 2 : 0) + Math.min(simExperiencia, 3) + (simResidente ? 1 : 0)).toFixed(1));

  const handleDownload = (fileName: string) => {
    setDownloadingFile(fileName);
    setTimeout(() => {
      setDownloadingFile(null);
      setDownloadSuccess(fileName);
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 3000);
    }, 1200);
  };

  // Compute dynamic stats based on current candidate list
  const totalVacancies = VAGAS_MUNICIPADOS.reduce((acc, curr) => acc + curr.totalVagas, 0);
  const totalSubmissions = candidates.length;
  const validatedCount = candidates.filter(c => c.status === 'Validado').length;
  const pendingCount = candidates.filter(c => c.status === 'Pendente').length;
  const rejectedCount = candidates.filter(c => c.status === 'Rejeitado').length;
  const validationRate = totalSubmissions > 0 ? Math.round((validatedCount / totalSubmissions) * 100) : 0;

  // Group current applications by municipality for statistics
  const candidatesByMunicipio = candidates.reduce((acc, curr) => {
    acc[curr.municipioCandidatura] = (acc[curr.municipioCandidatura] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Find municipality with most candidates
  let busiestMunicipio = 'Uíge (Sede)';
  let maxCount = 0;
  Object.entries(candidatesByMunicipio).forEach(([mun, count]) => {
    if (count > maxCount) {
      maxCount = count;
      busiestMunicipio = mun;
    }
  });

  return (
    <div className="space-y-12">
      
      {/* Hero Welcome Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800 p-8 sm:p-12 shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-block px-3 py-1 bg-blue-500 text-[10px] font-bold uppercase tracking-widest rounded mb-2">
            Concurso Público de Ingresso 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Portal de Inscrições do Sector da Educação <span className="text-amber-400">Província do Uíge</span>
          </h1>
          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl">
            Bem-vindo ao canal oficial de recepção e processamento de candidaturas para professores e auxiliares de ensino do Gabinete Provincial da Educação do Uíge. Realize e acompanhe todo o processo de forma transparente e segura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => setActiveTab('candidatar')}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-bold transition-all duration-200 shadow-md text-sm"
            >
              <span>Submeter Nova Candidatura</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('consultar')}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all text-sm"
            >
              <span>Consultar Estado / Recibo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Official General Contest Info Panel */}
      <InfoGeralConcursoPanel />

      {/* Statistics Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Vagas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Vagas Disponíveis</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{totalVacancies}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
            <span>Distribuídas pelos 16 municípios</span>
          </div>
        </div>

        {/* Total Candidaturas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Inscrições Submetidas</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{totalSubmissions}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Taxa de validação:</span>
            <span className="font-bold text-blue-700">{validationRate}%</span>
          </div>
        </div>

        {/* Candidaturas Validadas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Admitidos ao Exame</p>
              <h3 className="text-3xl font-bold text-green-700 mt-2">{validatedCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-50 text-green-700">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span>Aguardam data de prova</span>
          </div>
        </div>

        {/* Pendentes / Rejeitados */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-300 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Pendentes / Rejeitados</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                <span className="text-amber-600">{pendingCount}</span>
                <span className="text-slate-300 text-xl font-normal mx-1.5">/</span>
                <span className="text-red-600">{rejectedCount}</span>
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 text-slate-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Foco de Demanda:</span>
            <span className="font-semibold text-slate-700">{busiestMunicipio}</span>
          </div>
        </div>

      </section>

      {/* Split section: Notice Board vs Requirements */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* official Announcement / Edital Notice Board */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <FileText className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl font-bold text-slate-950">Edital Informativo de Ingresso</h2>
          </div>

          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Submissão Online</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As candidaturas devem ser formalizadas obrigatoriamente através deste portal electrónico. Certifique-se de preencher todos os dados em perfeita conformidade com o seu Bilhete de Identidade.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Conformidade e Legibilidade</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Todos os ficheiros anexados (Certificados de Habilitações, BI) devem estar em formato legível. Ficheiros borrados, cortados ou com assinatura ilegível motivarão a exclusão imediata.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Exame de Conhecimentos</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A prova escrita de admissão será agendada logo após o termo do período de validação. Apenas candidatos na lista de "Admitidos" (Estado Validado) poderão aceder às salas de exame municipais na província do Uíge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements & Documents */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-slate-950">Requisitos de Candidatura</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Requisitos Gerais:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start">
                  <span className="text-blue-700 mr-2">•</span>
                  Nacionalidade Angolana e idade mínima de 18 anos
                </li>
                <li className="flex items-start">
                  <span className="text-blue-700 mr-2">•</span>
                  Habilitações literárias correspondentes à categoria docente requerida
                </li>
                <li className="flex items-start">
                  <span className="text-blue-700 mr-2">•</span>
                  Inexistência de antecedentes criminais incompatíveis com o ensino
                </li>
                <li className="flex items-start">
                  <span className="text-blue-700 mr-2">•</span>
                  Sanidade física e mental adequada para o exercício da profissão
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Documentação Requerida (Simulação):</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Bilhete de Identidade</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Certificado Homologado</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Atestado de Robustez</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Registo Criminal</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
              <strong>Aviso Importante:</strong> Tentativas de submissão de certificados falsificados serão encaminhadas ao Serviço de Investigação Criminal (SIC-Uíge) para procedimentos penais competentes.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bento Block: Points Estimator & Resources */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Selection Score Estimator */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <Calculator className="w-5 h-5 text-blue-700" />
            <div>
              <h2 className="text-lg font-bold text-slate-950">Simulador de Pontuação (MED / GPEN)</h2>
              <p className="text-[10px] text-slate-500 font-medium">Decreto Presidencial nº 102/20 - Critérios Oficiais de Avaliação Curricular</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Range slider for course grade */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Média Final de Curso (10 a 20 valores):</span>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{simMedia} Valores</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={20} 
                step={1} 
                value={simMedia} 
                onChange={(e) => setSimMedia(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700" 
              />
            </div>

            {/* Agregacao pedagogica toggle buttons */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Formação Pedagógica / Agregação? (+2 pontos):</span>
                <span className="text-[10px] text-slate-400 font-semibold">(Pedagogia, ISCED, etc.)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setSimAgregado(true)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    simAgregado 
                      ? 'bg-blue-50 border-blue-200 text-blue-700 font-extrabold' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Sim (+2 Valores)
                </button>
                <button 
                  onClick={() => setSimAgregado(false)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    !simAgregado 
                      ? 'bg-blue-50 border-blue-200 text-blue-700 font-extrabold' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Não (+0 Valores)
                </button>
              </div>
            </div>

            {/* Experience and local resident switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Tempo de Serviço (Anos):</label>
                <select 
                  value={simExperiencia}
                  onChange={(e) => setSimExperiencia(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 focus:border-blue-500 transition-colors"
                >
                  <option value={0}>Sem Experiência (+0 pt)</option>
                  <option value={1}>1 Ano (+1 pt)</option>
                  <option value={2}>2 Anos (+2 pts)</option>
                  <option value={3}>3 ou mais Anos (+3 pts)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Residente no Município? (+1 pt):</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => setSimResidente(true)}
                    className={`py-2 rounded-lg text-xs font-bold border text-center transition-colors cursor-pointer ${
                      simResidente 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Sim (+1)
                  </button>
                  <button 
                    onClick={() => setSimResidente(false)}
                    className={`py-2 rounded-lg text-xs font-bold border text-center transition-colors cursor-pointer ${
                      !simResidente 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Não (+0)
                  </button>
                </div>
              </div>
            </div>

            {/* Score presentation block */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-blue-800 block tracking-wider">Pontuação de Admissão Estimada</span>
                <span className="text-[10px] text-slate-600 leading-normal block">Média de Candidatura de acordo com a tabela do MED</span>
              </div>
              <div className="text-right flex items-center space-x-3 bg-white border border-blue-200/60 p-2 px-3 rounded-xl shadow-sm">
                <div>
                  <span className="text-xl font-black text-blue-900 block">{calculatedScore}</span>
                  <span className="text-[8px] text-slate-400 block uppercase font-bold">Valores</span>
                </div>
                <div className="h-8 w-px bg-blue-100"></div>
                <span className="text-xs font-extrabold text-indigo-700 uppercase">
                  {calculatedScore >= 18 ? 'Excelente' : calculatedScore >= 15 ? 'Muito Bom' : calculatedScore >= 12 ? 'Bom' : 'Regular'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Resources & Official Legal downloads */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <FileDown className="w-5 h-5 text-blue-700" />
            <div>
              <h2 className="text-lg font-bold text-slate-950">Biblioteca do Candidato & Editais</h2>
              <p className="text-[10px] text-slate-500 font-medium">Documentos legais, decretos e manuais do utilizador do GPEN</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {[
              { id: 'edital', name: 'Edital Geral de Abertura do Concurso.pdf', size: '640 KB', icon: FileText },
              { id: 'decreto', name: 'Decreto Presidencial nº 102_20_Regulamento.pdf', size: '1.2 MB', icon: ShieldAlert },
              { id: 'guia', name: 'Guia_Passo_a_Passo_Candidatura_GPEN.pdf', size: '480 KB', icon: HelpCircle },
              { id: 'vagas', name: 'Quadro_Vagas_Uige_Escolas_Homologadas.xlsx', size: '2.1 MB', icon: MapPin }
            ].map((doc) => {
              const isThisDownloading = downloadingFile === doc.id;
              const isThisSuccess = downloadSuccess === doc.id;
              
              return (
                <div key={doc.id} className="flex justify-between items-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center space-x-3 max-w-[70%]">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded-lg animate-fade-in">
                      <doc.icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-slate-800 text-xs block truncate" title={doc.name}>{doc.name}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{doc.size} | PDF Regulamento Oficial</span>
                    </div>
                  </div>

                  <div>
                    {isThisDownloading ? (
                      <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-[10px] font-bold">
                        <span className="animate-spin h-3 w-3 border-2 border-blue-800 border-t-transparent rounded-full"></span>
                        <span>A descarregar...</span>
                      </div>
                    ) : isThisSuccess ? (
                      <span className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold">
                        ✓ Descarregado
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleDownload(doc.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-700 text-slate-600 text-[10px] font-bold cursor-pointer transition-all"
                      >
                        <Download className="w-3 h-3" />
                        <span>Descarregar</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-900 leading-normal">
              <strong>Nota do GPEN:</strong> Todas as candidaturas são gratuitas. Não efetue qualquer pagamento a intermediários. Reporte irregularidades através do suporte oficial do Gabinete Provincial da Educação.
            </div>
          </div>
        </div>

      </section>

      {/* Custom Graphic Area: Bento-Grid style of Custom SVG Charts */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Visualização de Vagas do Concurso por Município (Uíge)</h2>
          <p className="text-xs text-slate-500 mt-1">Comparativo de total de postos disponíveis para os principais municípios</p>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
          <div className="space-y-4">
            {VAGAS_MUNICIPADOS.slice(0, 7).map((mun, i) => {
              // Calculate percentage of vacancies based on largest (Uíge capital with 100)
              const percentage = (mun.totalVagas / 100) * 100;
              return (
                <div key={mun.municipio} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{mun.municipio}</span>
                    <div className="space-x-3 text-slate-600">
                      <span className="font-bold text-slate-900">{mun.totalVagas} Vagas</span>
                      <span className="text-slate-300">|</span>
                      <span>Primário: {mun.vagasPrimario} / Secundário: {mun.vagasSecundarioICiclo + mun.vagasSecundarioIICiclo}</span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                    {/* Primary school vacancies segment */}
                    <div 
                      className="bg-blue-600 h-full transition-all duration-1000" 
                      style={{ width: `${(mun.vagasPrimario / 100) * 100}%` }}
                      title="Ensino Primário"
                    ></div>
                    {/* Secondary I Cycle vacancies segment */}
                    <div 
                      className="bg-red-500 h-full transition-all duration-1000" 
                      style={{ width: `${(mun.vagasSecundarioICiclo / 100) * 100}%` }}
                      title="Ensino Secundário I Ciclo"
                    ></div>
                    {/* Secondary II Cycle vacancies segment */}
                    <div 
                      className="bg-amber-500 h-full transition-all duration-1000" 
                      style={{ width: `${(mun.vagasSecundarioIICiclo / 100) * 100}%` }}
                      title="Ensino Secundário II Ciclo"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-slate-500 pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-blue-600 rounded"></span>
              <span>Vagas Ensino Primário</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-red-500 rounded"></span>
              <span>Vagas I Ciclo Secundário</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-amber-500 rounded"></span>
              <span>Vagas II Ciclo Secundário</span>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Quick Links Footer inside Dashboard */}
      <section className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            Precisa de esclarecimento presencial?
          </h3>
          <p className="text-xs text-slate-600">
            Pode dirigir-se ao Gabinete Provincial da Educação do Uíge, sito na Av. do Comércio, Edifício Administrativo Provincial.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('faq')}
          className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-xs font-bold text-white transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Aceder às FAQs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
