/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Candidato, Regime } from '../types';
import { MUNICIPADOS_UIGE, CATEGORIAS_CONCURSO, ESPECIALIDADES_CURSOS } from '../data/mockData';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  FileCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Printer, 
  AlertCircle 
} from 'lucide-react';

interface ApplicationFormProps {
  onAddCandidate: (candidate: Candidato) => void;
  setActiveTab: (tab: string) => void;
  regime: Regime;
}

export default function ApplicationForm({ onAddCandidate, setActiveTab, regime }: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [successCandidate, setSuccessCandidate] = useState<Candidato | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form states
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [genero, setGenero] = useState<'M' | 'F'>('M');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('Solteiro(a)');
  const [biNumero, setBiNumero] = useState('');
  const [nif, setNif] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [nivelEnsino, setNivelEnsino] = useState<'Médio Pedagógico' | 'Bacharelato' | 'Licenciatura' | 'Mestrado/Doutoramento' | 'Médio Técnico'>(regime === 'Geral' ? 'Médio Técnico' : 'Médio Pedagógico');
  const [cursoEspecialidade, setCursoEspecialidade] = useState(ESPECIALIDADES_CURSOS[0]);
  const [mediaFinal, setMediaFinal] = useState<number>(14);
  const [categoria, setCategoria] = useState('');
  
  const [municipioCandidatura, setMunicipioCandidatura] = useState(MUNICIPADOS_UIGE[0]);
  const [escolaPretendida, setEscolaPretendida] = useState('');

  // Mock Upload state (holding true/false for demo simulated upload)
  const [uploadedRequerimento, setUploadedRequerimento] = useState(false);
  const [uploadedBI, setUploadedBI] = useState(false);
  const [uploadedCert, setUploadedCert] = useState(false);
  const [uploadedInaarees, setUploadedInaarees] = useState(false);

  // Filter categories when academic level changes (regime é fixo para esta instância do formulário)
  useEffect(() => {
    const compatible = CATEGORIAS_CONCURSO.find(c => {
      if (c.regime !== regime) return false;
      if (regime === 'Geral') return true;
      if (nivelEnsino === 'Médio Pedagógico') return c.habilitacao === 'Médio Pedagógico';
      return c.habilitacao === 'Licenciatura'; // Licenciatura / Bacharelato / Mestrado gets Licenciatura categories
    });
    if (compatible) setCategoria(compatible.nome);
  }, [regime, nivelEnsino]);

  // A escola/posto concreto só é definido pela Direcção Municipal da Educação após a homologação
  useEffect(() => {
    setEscolaPretendida(`A atribuir pela Direcção Municipal da Educação de ${municipioCandidatura}`);
  }, [municipioCandidatura]);

  const handleNextStep = () => {
    // Validate Step 1
    if (step === 1) {
      if (!nomeCompleto || !nomePai || !nomeMae || !dataNascimento || !biNumero || !telefone || !email) {
        setFormError('Por favor, preencha todos os campos obrigatórios marcados com asterisco (*).');
        return;
      }
      // BI validation regex (Angolan standard: 9 digits, 2 letters, 3 digits - Ex: 004123456UI045)
      const biRegex = /^\d{9}[a-zA-Z]{2}\d{3}$/;
      if (!biRegex.test(biNumero.replace(/\s+/g, ''))) {
        setFormError('O formato do Bilhete de Identidade (BI) é inválido. Deve conter exactamente 9 dígitos, 2 letras e 3 dígitos (Ex: 004123456UI045).');
        return;
      }
      // Phone validation (Angola starting with 9 followed by 8 digits)
      const telClean = telefone.replace(/\s+/g, '');
      if (!/^9\d{8}$/.test(telClean)) {
        setFormError('O número de telefone é inválido. Deve conter exactamente 9 dígitos e iniciar com o dígito 9.');
        return;
      }
    }

    // Validate Step 2
    if (step === 2) {
      if (mediaFinal < 10 || mediaFinal > 20) {
        setFormError('A média final de curso deve ser um valor numérico entre 10 e 20 valores.');
        return;
      }
    }

    // Validate Step 3
    if (step === 3) {
      if (!uploadedRequerimento || !uploadedBI || !uploadedCert) {
        setFormError('Os documentos assinalados com (*) são de submissão obrigatória (Requerimento, B.I. e Certificado).');
        return;
      }
    }

    setFormError(null);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setFormError(null);
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final security confirmation
    const newId = `UI-EDU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCandidate: Candidato = {
      id: newId,
      nomeCompleto,
      nomePai,
      nomeMae,
      genero,
      dataNascimento,
      estadoCivil,
      biNumero: biNumero.toUpperCase(),
      nif: nif || undefined,
      telefone,
      email,
      regime,
      municipioCandidatura,
      nivelEnsino,
      cursoEspecialidade,
      mediaFinal,
      categoria,
      escolaPretendida,
      documentos: {
        requerimento: uploadedRequerimento,
        bi: uploadedBI,
        certificado: uploadedCert,
        inaarees: uploadedInaarees
      },
      dataSubmissao: new Date().toISOString().split('T')[0],
      status: 'Pendente'
    };

    onAddCandidate(newCandidate);
    setSuccessCandidate(newCandidate);
    setStep(5); // Success state step
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    // Reset Form
    setNomeCompleto('');
    setNomePai('');
    setNomeMae('');
    setGenero('M');
    setDataNascimento('');
    setBiNumero('');
    setNif('');
    setTelefone('');
    setEmail('');
    setNivelEnsino(regime === 'Geral' ? 'Médio Técnico' : 'Médio Pedagógico');
    setCursoEspecialidade(ESPECIALIDADES_CURSOS[0]);
    setMediaFinal(14);
    setUploadedRequerimento(false);
    setUploadedBI(false);
    setUploadedCert(false);
    setUploadedInaarees(false);
    setStep(1);
    setSuccessCandidate(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

      {step < 5 && (
        <div className="mb-10 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Inscrição no Concurso Público</h2>
            <span className="text-xs font-bold text-blue-700 tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50">
              Passo {step} de 4
            </span>
          </div>

          {/* Custom Step Indicator Bar */}
          <div className="grid grid-cols-4 gap-2">
            <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-blue-700' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-blue-700' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-blue-700' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 rounded-full ${step >= 4 ? 'bg-blue-700' : 'bg-slate-200'}`}></div>
          </div>

          {/* Quick labels */}
          <div className="hidden sm:grid grid-cols-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            <span className={step === 1 ? 'text-blue-700 font-extrabold' : ''}>1. Dados Pessoais</span>
            <span className={step === 2 ? 'text-blue-700 font-extrabold' : ''}>2. Formação</span>
            <span className={step === 3 ? 'text-blue-700 font-extrabold' : ''}>3. Opção & Anexos</span>
            <span className={step === 4 ? 'text-blue-700 font-extrabold' : ''}>4. Revisão</span>
          </div>
        </div>
      )}

      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs text-red-800 font-semibold leading-relaxed">
            {formError}
          </div>
        </div>
      )}

      {/* Step 1: Personal Data */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-800">Dados de Identificação Pessoal</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-700">Nome Completo *</label>
              <input
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                placeholder="Ex: António Francisco Manuel de Sousa"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Nome Completo do Pai *</label>
              <input
                type="text"
                value={nomePai}
                onChange={(e) => setNomePai(e.target.value)}
                placeholder="Nome do Pai"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Nome Completo da Mãe *</label>
              <input
                type="text"
                value={nomeMae}
                onChange={(e) => setNomeMae(e.target.value)}
                placeholder="Nome da Mãe"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Nº do Bilhete de Identidade (BI) *</label>
              <input
                type="text"
                value={biNumero}
                onChange={(e) => setBiNumero(e.target.value.toUpperCase())}
                placeholder="Ex: 004523112UI046"
                maxLength={14}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 font-mono uppercase placeholder-slate-400 transition-colors"
                required
              />
              <p className="text-[10px] text-slate-500">Deve conter 9 dígitos, 2 letras de província e 3 dígitos (total de 14 caracteres).</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Nº de Contribuinte (NIF) (Opcional)</label>
              <input
                type="text"
                value={nif}
                onChange={(e) => setNif(e.target.value)}
                placeholder="NIF Angolano"
                maxLength={10}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 font-mono placeholder-slate-400 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Data de Nascimento *</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Gênero *</label>
                <select
                  value={genero}
                  onChange={(e) => setGenero(e.target.value as 'M' | 'F')}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Estado Civil *</label>
                <select
                  value={estadoCivil}
                  onChange={(e) => setEstadoCivil(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
                >
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Contacto Telefónico *</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Ex: 923456789"
                maxLength={9}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 font-mono placeholder-slate-400 transition-colors"
                required
              />
              <p className="text-[10px] text-slate-500">Insira exactamente 9 dígitos, começando por 9.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Endereço de Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: candidato@exemplo.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-sm"
            >
              <span>Prosseguir</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Academic Profile */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-800">Formação Académica e Habilitações</h3>
          </div>

          <div className={`sm:col-span-2 flex items-center gap-3 p-4 rounded-xl border ${regime === 'Especial' ? 'bg-blue-50/50 border-blue-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide ${regime === 'Especial' ? 'bg-blue-700 text-white' : 'bg-emerald-700 text-white'}`}>
              {regime === 'Especial' ? 'Regime Especial' : 'Regime Geral'}
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {regime === 'Especial' ? 'Candidatura para Professor do Ensino Primário e Secundário' : 'Candidatura para Técnico Médio de 3ª Classe'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Nível Académico Máximo *</label>
              {regime === 'Geral' ? (
                <input
                  type="text"
                  value="Médio Técnico"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                />
              ) : (
                <select
                  value={nivelEnsino}
                  onChange={(e) => setNivelEnsino(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
                >
                  <option value="Médio Pedagógico">Médio Pedagógico</option>
                  <option value="Bacharelato">Bacharelato</option>
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Mestrado/Doutoramento">Mestrado ou Superior</option>
                </select>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Curso ou Especialidade *</label>
              <select
                value={cursoEspecialidade}
                onChange={(e) => setCursoEspecialidade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
              >
                {ESPECIALIDADES_CURSOS.map((curso) => (
                  <option key={curso} value={curso}>{curso}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Média Final do Curso (Valores de 10 a 20) *</label>
              <input
                type="number"
                min={10}
                max={20}
                step={0.01}
                value={mediaFinal}
                onChange={(e) => setMediaFinal(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 font-mono transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Categoria de Ingresso Pretendida *</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
              >
                {CATEGORIAS_CONCURSO.filter(c => {
                  if (c.regime !== regime) return false;
                  if (regime === 'Geral') return true;
                  if (nivelEnsino === 'Médio Pedagógico') return c.habilitacao === 'Médio Pedagógico';
                  return c.habilitacao === 'Licenciatura';
                }).map((cat) => (
                  <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-sm"
            >
              <span>Prosseguir</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Options and File Checklists */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <MapPin className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-800">Escolha de Localidade e Anexos Digitais</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Município a que Concorre (Uíge) *</label>
              <select
                value={municipioCandidatura}
                onChange={(e) => setMunicipioCandidatura(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 transition-colors"
              >
                {MUNICIPADOS_UIGE.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Escola / Posto de Colocação</label>
              <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-600 leading-relaxed">
                {escolaPretendida}
              </div>
              <p className="text-[10px] text-slate-400">A escola concreta de colocação não é escolhida nesta fase — é definida pela Direcção Municipal da Educação após a homologação das listas finais.</p>
            </div>
          </div>

          {/* Documents Simulated Upload */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <label className="text-xs font-bold text-slate-800">Anexo de Documentação Exigida</label>
              <span className="text-[10px] text-slate-400 font-semibold">Formatos aceites: PDF • Máximo: 2 MB por ficheiro</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Doc 1 */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Requerimento à Ministra *</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Dirigido à Ministra da Educação</p>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 inline-block border border-blue-100/50">PDF · máx. 2 MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedRequerimento(!uploadedRequerimento)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    uploadedRequerimento ? 'bg-green-100 text-green-800 border border-green-200 font-extrabold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  {uploadedRequerimento ? 'Anexado' : 'Simular Upload'}
                </button>
              </div>

              {/* Doc 2 */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Fotocópia do B.I. *</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Bilhete de Identidade actualizado</p>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 inline-block border border-blue-100/50">PDF · máx. 2 MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedBI(!uploadedBI)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    uploadedBI ? 'bg-green-100 text-green-800 border border-green-200 font-extrabold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  {uploadedBI ? 'Anexado' : 'Simular Upload'}
                </button>
              </div>

              {/* Doc 3 */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Certificado de Habilitações *</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Certificado Literário com notas</p>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 inline-block border border-blue-100/50">PDF · máx. 2 MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedCert(!uploadedCert)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    uploadedCert ? 'bg-green-100 text-green-800 border border-green-200 font-extrabold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  {uploadedCert ? 'Anexado' : 'Simular Upload'}
                </button>
              </div>

              {/* Doc 4 */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Declaração do INAAREES</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Habilitações obtidas no exterior</p>
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded mt-1.5 inline-block border border-slate-200/50">PDF · máx. 2 MB • Opcional</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedInaarees(!uploadedInaarees)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    uploadedInaarees ? 'bg-green-100 text-green-800 border border-green-200 font-extrabold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  {uploadedInaarees ? 'Anexado' : 'Simular Upload'}
                </button>
              </div>

            </div>

            {/* Strict Notice banner specified by the user */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 text-amber-900 leading-normal text-xs flex items-start gap-3 mt-4">
              <span className="text-base">⚠️</span>
              <p className="font-medium text-[11px] leading-relaxed">
                <strong>Nota Importante:</strong> Todos os ficheiros devem ser legíveis e submetidos em formato PDF. Documentos ilegíveis ou incompletos podem invalidar a candidatura.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-sm"
            >
              <span>Revisar Inscrição</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Final Revision */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <FileCheck className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-800">Revisão dos Dados Antes de Submeter</h3>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Nome Completo</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">{nomeCompleto}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Nº de Bilhete de Identidade (BI)</span>
                <span className="text-sm font-bold text-blue-700 font-mono block mt-0.5">{biNumero}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Filiação</span>
                <span className="text-slate-700 block mt-0.5">Pai: {nomePai}</span>
                <span className="text-slate-700 block">Mãe: {nomeMae}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Género / Estado Civil</span>
                <span className="text-slate-700 block mt-0.5">Género: {genero === 'M' ? 'Masculino' : 'Feminino'}</span>
                <span className="text-slate-700 block">Estado Civil: {estadoCivil}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Formação Académica</span>
                <span className="text-slate-700 block mt-0.5">{nivelEnsino} em <strong className="text-slate-900">{cursoEspecialidade}</strong></span>
                <span className="text-slate-700 block">Média Final: <strong className="text-blue-700">{mediaFinal} Valores</strong></span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Regime / Categoria Alvo</span>
                <span className="text-slate-700 block mt-0.5">{regime === 'Especial' ? 'Regime Especial (Professor)' : 'Regime Geral (Técnico Médio)'}</span>
                <span className="text-slate-700 block">{categoria}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Colocação Pretendida</span>
                <span className="text-slate-700 block mt-0.5">Município: <strong className="text-slate-900">{municipioCandidatura}</strong></span>
                <span className="text-slate-700 block">Escola: {escolaPretendida}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Contactos</span>
                <span className="text-slate-700 block mt-0.5">Telefone: {telefone}</span>
                <span className="text-slate-700 block">Email: {email}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-slate-500 uppercase font-bold tracking-wider block text-[9px]">Lista de Documentos Anexos</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 border border-green-200 text-green-800 rounded-md font-bold text-[10px]">✓ Requerimento à Ministra</span>
                <span className="px-2 py-1 bg-green-100 border border-green-200 text-green-800 rounded-md font-bold text-[10px]">✓ Bilhete de Identidade</span>
                <span className="px-2 py-1 bg-green-100 border border-green-200 text-green-800 rounded-md font-bold text-[10px]">✓ Certificado de Habilitações</span>
                {uploadedInaarees && <span className="px-2 py-1 bg-green-100 border border-green-200 text-green-800 rounded-md font-bold text-[10px]">✓ Declaração do INAAREES</span>}
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-4 text-[11px] text-blue-800 font-semibold leading-relaxed">
            Ao clicar em <strong>"Submeter Candidatura"</strong>, declaro sob compromisso de honra que todas as informações prestadas são fidedignas e completas. Reconheço que qualquer falsidade documental invalidará imediatamente o processo no Concurso do Uíge.
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-700/10 transition-all"
            >
              <span>Submeter Candidatura Oficial</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Step 5: Success Receipt Generation */}
      {step === 5 && successCandidate && (
        <div className="space-y-8 animate-fade-in print:bg-white print:text-black">
          
          <div className="text-center space-y-2.5 print:hidden">
            <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">Inscrição Recebida com Sucesso!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              A sua candidatura foi catalogada e enviada para o Gabinete de Educação do Uíge. Imprima o seu comprovativo oficial abaixo.
            </p>
          </div>

          {/* Printable Receipt Card */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-200 max-w-2xl mx-auto relative overflow-hidden font-sans">
            
            {/* Stamp Ribbon */}
            <div className="absolute top-0 right-0 bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest py-1 px-8 rotate-45 translate-x-6 translate-y-3.5 shadow-sm">
              UÍGE 2026
            </div>

            {/* Header of Receipt */}
            <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
              {/* Shield representing official status */}
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <svg viewBox="0 0 100 100" className="w-8 h-8 text-slate-800 fill-current">
                  <path d="M50,15 L15,30 L15,60 C15,75 50,85 50,85 C50,85 85,75 85,60 L85,30 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                  <path d="M50,22 L50,78 M25,48 L75,48" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase leading-none">Governo Provincial do Uíge</div>
                <div className="text-xs font-extrabold text-slate-800 uppercase mt-1 leading-none">Gabinete Provincial da Educação</div>
                <div className="text-[10px] font-bold text-blue-700 uppercase mt-1 leading-none">Recibo de Inscrição Oficial</div>
              </div>
            </div>

            {/* Content Body of Receipt */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Nº de Candidatura</span>
                  <span className="text-sm font-black text-slate-900 tracking-wider font-mono">{successCandidate.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Data de Recepção</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">{successCandidate.dataSubmissao}</span>
                </div>
              </div>

              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Nome do Candidato</span>
                  <span className="text-xs font-extrabold text-slate-900">{successCandidate.nomeCompleto}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Nº Bilhete de Identidade (BI)</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">{successCandidate.biNumero}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Município Pretendido</span>
                  <span className="text-xs font-bold text-slate-800">{successCandidate.municipioCandidatura}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Escola Opção</span>
                  <span className="text-xs font-semibold text-slate-800">{successCandidate.escolaPretendida}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Formação Literária</span>
                  <span className="text-xs font-bold text-slate-800">{successCandidate.nivelEnsino} ({successCandidate.cursoEspecialidade})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Média de Curso</span>
                  <span className="text-xs font-bold text-blue-700 font-mono">{successCandidate.mediaFinal} Valores</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Regime / Categoria a que Concorre</span>
                <span className="text-xs font-bold text-slate-900">{successCandidate.regime === 'Especial' ? 'Regime Especial' : 'Regime Geral'} — {successCandidate.categoria}</span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>Cod. Assinatura Digital:</span>
                <span className="font-bold">{successCandidate.id.replace('UI-EDU-', 'EDU-UIGE-')}SHA256-{successCandidate.biNumero.slice(0, 4)}</span>
              </div>
            </div>

            {/* Simulated Official Stamp */}
            <div className="pt-4 flex justify-between items-end border-t border-slate-150">
              <div className="space-y-1">
                <div className="w-24 h-0.5 bg-slate-300"></div>
                <div className="text-[8px] text-slate-400 uppercase tracking-widest text-center">Assinatura do Candidato</div>
              </div>
              
              {/* Circular official stamp representation */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500 p-0.5 flex items-center justify-center opacity-65 relative">
                <div className="w-full h-full rounded-full border border-blue-400 flex flex-col items-center justify-center text-[6px] font-bold text-blue-500 uppercase tracking-tighter text-center">
                  <span>EDUCAÇÃO</span>
                  <span className="text-[7px] font-black">UÍGE</span>
                  <span>CONCURSO</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action buttons on receipt */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-4.5 h-4.5" />
              <span>Imprimir Recibo / Guardar PDF</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              <span>Submeter Outra Candidatura</span>
            </button>
            <button
              onClick={() => setActiveTab('inicio')}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Ir para o Painel</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
