/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Candidato } from '../types';
import { Search, SearchCode, Calendar, ShieldCheck, AlertOctagon, HelpCircle, Send } from 'lucide-react';

interface CandidateQueryProps {
  candidates: Candidato[];
  onUpdateCandidate: (updated: Candidato) => void;
}

export default function CandidateQuery({ candidates, onUpdateCandidate }: CandidateQueryProps) {
  const [queryVal, setQueryVal] = useState('');
  const [searchedCandidate, setSearchedCandidate] = useState<Candidato | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reclamation fields
  const [reclamationText, setReclamationText] = useState('');
  const [reclamationSuccess, setReclamationSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSearchedCandidate(null);
    setReclamationSuccess(false);

    const cleanQuery = queryVal.trim().toUpperCase();

    if (!cleanQuery) {
      setErrorMsg('Por favor, introduza o seu Número de BI ou Código de Candidatura.');
      return;
    }

    // Find candidate by BI or by application ID
    const found = candidates.find(
      (c) => c.biNumero.replace(/\s+/g, '') === cleanQuery.replace(/\s+/g, '') || c.id.toUpperCase() === cleanQuery
    );

    if (found) {
      setSearchedCandidate(found);
    } else {
      setErrorMsg('Candidatura não encontrada. Verifique se digitou o BI ou Código correctamente.');
    }
  };

  const handleReclamationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedCandidate || !reclamationText.trim()) return;

    const updated: Candidato = {
      ...searchedCandidate,
      reclamacao: {
        descricao: reclamationText,
        data: new Date().toISOString().split('T')[0],
        status: 'Pendente'
      }
    };

    onUpdateCandidate(updated);
    setSearchedCandidate(updated);
    setReclamationText('');
    setReclamationSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Search Header Container */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Consulte o Estado da sua Candidatura</h2>
          <p className="text-xs text-slate-500">
            Introduza o número do seu Bilhete de Identidade (BI) ou o Código de Candidatura (Ex: UI-EDU-2026-XXXX) fornecido no momento da sua submissão.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={queryVal}
              onChange={(e) => setQueryVal(e.target.value)}
              placeholder="Ex: 005423122UI041 ou UI-EDU-2026-1024"
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-800 font-mono placeholder:text-slate-400 uppercase transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <SearchCode className="w-4 h-4" />
            <span>Consultar Sistema</span>
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs text-rose-600 font-bold">{errorMsg}</p>
        )}
      </section>

      {/* Candidate Status Presentation Board */}
      {searchedCandidate && (
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-5 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Ficha Cadastral</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{searchedCandidate.nomeCompleto}</h3>
              <p className="text-xs text-slate-500 mt-1">BI: <span className="font-mono text-blue-700 font-semibold">{searchedCandidate.biNumero}</span> | Código: <span className="font-mono font-semibold">{searchedCandidate.id}</span></p>
            </div>

            {/* Application Status Badges */}
            <div>
              {searchedCandidate.status === 'Pendente' && (
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  Candidatura Pendente (Em Análise)
                </span>
              )}
              {searchedCandidate.status === 'Validado' && (
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                  Inscrição Validada (Admitido)
                </span>
              )}
              {searchedCandidate.status === 'Rejeitado' && (
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                  Candidatura Excluída (Rejeitada)
                </span>
              )}
            </div>
          </div>

          {/* Details Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Informações da Concorrência</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500">Município Alvo:</span>
                  <span className="font-bold text-slate-900">{searchedCandidate.municipioCandidatura}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500">Escola Escolhida:</span>
                  <span className="font-semibold text-slate-900">{searchedCandidate.escolaPretendida}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500">Categoria Profissional:</span>
                  <span className="font-semibold text-slate-900">{searchedCandidate.categoria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Especialidade / Curso:</span>
                  <span className="font-bold text-slate-900">{searchedCandidate.cursoEspecialidade}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Habilitações e Documentos</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500">Nível Literário:</span>
                  <span className="font-semibold text-slate-900">{searchedCandidate.nivelEnsino}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500">Média de Licenciatura/Curso:</span>
                  <span className="font-bold text-blue-700">{searchedCandidate.mediaFinal} Valores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validação Documental:</span>
                  <span className="font-bold text-green-700">Verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional state presentation */}
          {searchedCandidate.status === 'Pendente' && (
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2.5">
              <h4 className="text-xs font-bold text-blue-800 flex items-center gap-1.5 uppercase tracking-wide">
                <HelpCircle className="w-4 h-4" />
                Em Processo de Triagem Documental
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A comissão de júri do Gabinete Provincial da Educação do Uíge está a validar as suas digitalizações e notas declaradas. A lista provisória de admitidos e excluídos será atualizada de forma faseada. Verifique este painel com regularidade.
              </p>
            </div>
          )}

          {searchedCandidate.status === 'Validado' && (
            <div className="p-6 rounded-2xl bg-green-50/50 border border-green-100 space-y-4">
              <div className="flex items-center gap-2 text-green-800">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="text-xs font-bold uppercase tracking-wide">Inscrição Validada para o Exame de Admissão</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parabéns! O seu dossier foi considerado conforme todos os requisitos do concurso da Província do Uíge. Está oficialmente admitido para realizar a prova de conhecimentos.
              </p>
              
              {/* Exam card detail block */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="space-y-0.5">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Data do Exame</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-blue-700" />
                    Brevemente (Agosto 2026)
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Local de Prova</span>
                  <span className="font-bold text-slate-900 block mt-0.5">Escola de Residência Concorrida</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 block uppercase text-[9px] font-bold">Pauta Provisória</span>
                  <span className="font-bold text-blue-750 block mt-0.5">
                    {searchedCandidate.notaExame !== undefined ? `${searchedCandidate.notaExame} / 20 Valores` : 'Aguardando Exame'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {searchedCandidate.status === 'Rejeitado' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 space-y-3">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertOctagon className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-wide">Motivo da Exclusão de Candidatura</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lamentamos informar, mas a comissão técnica excluiu a sua candidatura pelos seguintes fundamentos declarados:
                </p>
                <div className="bg-white p-4 rounded-xl border border-red-200 font-bold text-red-700 text-xs">
                  {searchedCandidate.motivoRejeicao || 'Documentação incompleta ou em não conformidade com o edital do sector provincial.'}
                </div>
              </div>

              {/* Administrative Reclamation Form */}
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Apresentar Reclamação Administrativa</h4>
                <p className="text-xs text-slate-500">
                  De acordo com os termos legais do concurso, se discordar do motivo de exclusão, dispõe de 5 dias úteis a contar desta notificação para expor a sua contestação directamente à comissão provincial de júri.
                </p>

                {searchedCandidate.reclamacao ? (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700">Reclamação Submetida à Comissão</span>
                    <p className="text-xs text-slate-700">"{searchedCandidate.reclamacao.descricao}"</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-200 font-mono">
                      <span>Data: {searchedCandidate.reclamacao.data}</span>
                      <span className="font-bold text-blue-700">Estado: {searchedCandidate.reclamacao.status === 'Pendente' ? 'Em Apreciação' : 'Respondida'}</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReclamationSubmit} className="space-y-3">
                    <textarea
                      value={reclamationText}
                      onChange={(e) => setReclamationText(e.target.value)}
                      placeholder="Descreva detalhadamente as suas razões de reclamação (Ex: O meu certificado está perfeitamente legível e foi emitido por instituição credenciada de ensino no Uíge...)"
                      rows={4}
                      maxLength={800}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl p-4 text-xs text-slate-800 transition-colors"
                      required
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submeter Reclamação</span>
                      </button>
                    </div>
                  </form>
                )}

                {reclamationSuccess && (
                  <p className="text-xs text-green-700 font-bold mt-2">
                    ✓ A sua reclamação foi registada com sucesso! O júri provincial emitirá um parecer revisor oportunamente.
                  </p>
                )}
              </div>
            </div>
          )}

        </section>
      )}

    </div>
  );
}
