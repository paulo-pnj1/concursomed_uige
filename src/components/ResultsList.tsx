/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Candidato } from '../types';
import { MUNICIPADOS_UIGE } from '../data/mockData';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Settings, 
  Award, 
  Trash2, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ResultsListProps {
  candidates: Candidato[];
  onUpdateCandidate: (updated: Candidato) => void;
  onDeleteCandidate?: (id: string) => void;
}

export default function ResultsList({ candidates, onUpdateCandidate, onDeleteCandidate }: ResultsListProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMunicipio, setFilterMunicipio] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Interactive editing states for administrator simulations
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [editingGrade, setEditingGrade] = useState<string>('');
  const [editingStatus, setEditingStatus] = useState<'Pendente' | 'Validado' | 'Rejeitado'>('Pendente');
  const [editingRejectionReason, setEditingRejectionReason] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter candidates
  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch = 
      cand.nomeCompleto.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cand.biNumero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMunicipio = filterMunicipio === 'Todos' || cand.municipioCandidatura === filterMunicipio;
    const matchesStatus = filterStatus === 'Todos' || cand.status === filterStatus;

    return matchesSearch && matchesMunicipio && matchesStatus;
  });

  // Paginated chunk
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage) || 1;
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (cand: Candidato) => {
    setEditingCandidateId(cand.id);
    setEditingGrade(cand.notaExame?.toString() || '');
    setEditingStatus(cand.status);
    setEditingRejectionReason(cand.motivoRejeicao || '');
  };

  const handleSaveAdminAction = (cand: Candidato) => {
    const updated: Candidato = {
      ...cand,
      status: editingStatus,
      notaExame: editingStatus === 'Validado' && editingGrade ? parseFloat(editingGrade) : undefined,
      motivoRejeicao: editingStatus === 'Rejeitado' ? editingRejectionReason : undefined
    };

    onUpdateCandidate(updated);
    setEditingCandidateId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search and Filters Controller Board */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>Lista Geral de Inscrições do Concurso</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Gestão de candidaturas, pautas de exames e resultados provisórios</p>
          </div>

          {/* Admin Simulation Mode Toggle */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isAdminMode 
                ? 'bg-blue-700 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-750 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isAdminMode ? 'Sair do Modo Administrativo' : 'Simular Modo Administrativo'}</span>
          </button>
        </div>

        {/* Filters Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Query input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Pesquisar por Nome, BI ou Código..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 transition-colors"
            />
          </div>

          {/* Municipality filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterMunicipio}
              onChange={(e) => { setFilterMunicipio(e.target.value); setCurrentPage(1); }}
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 font-medium transition-colors"
            >
              <option value="Todos">Todos os Municípios</option>
              {MUNICIPADOS_UIGE.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 font-medium transition-colors"
            >
              <option value="Todos">Todos os Estados</option>
              <option value="Pendente">Pendentes</option>
              <option value="Validado">Validados (Admitidos)</option>
              <option value="Rejeitado">Rejeitados (Excluídos)</option>
            </select>
          </div>

        </div>
      </section>

      {/* Candidates Output Table Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Código / BI</th>
                <th className="px-5 py-4">Candidato / Especialidade</th>
                <th className="px-5 py-4">Localização Concorrida</th>
                <th className="px-5 py-4">Nota de Curso</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4">Nota Exame</th>
                {isAdminMode && <th className="px-5 py-4 text-right">Ação de Júri</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedCandidates.map((cand) => {
                const isEditing = editingCandidateId === cand.id;
                return (
                  <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* ID & BI */}
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <span className="font-mono font-bold text-slate-900 block">{cand.id}</span>
                        <span className="font-mono text-[10px] text-slate-400 block">{cand.biNumero}</span>
                      </div>
                    </td>

                    {/* Personal / Specialty */}
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 block text-sm">{cand.nomeCompleto}</span>
                        <span className="text-[10px] text-slate-400 block">{cand.nivelEnsino} - {cand.cursoEspecialidade}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800 block">{cand.municipioCandidatura}</span>
                        <span className="text-[10px] text-slate-400 block">{cand.escolaPretendida}</span>
                      </div>
                    </td>

                    {/* Class grade */}
                    <td className="px-5 py-4">
                      <span className="font-mono text-blue-700 font-bold text-sm">{cand.mediaFinal} Val.</span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value as any)}
                          className="bg-white border border-slate-200 text-slate-850 p-1 rounded-md text-[11px] font-bold"
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Validado">Validado</option>
                          <option value="Rejeitado">Rejeitado</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center space-x-1">
                          {cand.status === 'Pendente' && (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              <Clock className="w-3 h-3" />
                              <span>Pendente</span>
                            </span>
                          )}
                          {cand.status === 'Validado' && (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100">
                              <CheckCircle className="w-3 h-3" />
                              <span>Admitido</span>
                            </span>
                          )}
                          {cand.status === 'Rejeitado' && (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">
                              <XCircle className="w-3 h-3" />
                              <span>Excluído</span>
                            </span>
                          )}
                        </span>
                      )}
                    </td>

                    {/* Exam score */}
                    <td className="px-5 py-4">
                      {isEditing && editingStatus === 'Validado' ? (
                        <input
                          type="number"
                          min={0}
                          max={20}
                          step={0.1}
                          placeholder="Nota"
                          value={editingGrade}
                          onChange={(e) => setEditingGrade(e.target.value)}
                          className="w-16 bg-white border border-slate-200 text-slate-800 p-1 rounded-md text-center text-[11px] font-bold"
                        />
                      ) : (
                        <span className="font-mono font-bold text-slate-500">
                          {cand.status === 'Validado' 
                            ? (cand.notaExame !== undefined ? `${cand.notaExame} Valores` : 'Falta Realizar')
                            : '- '
                          }
                        </span>
                      )}
                    </td>

                    {/* Admin Action columns */}
                    {isAdminMode && (
                      <td className="px-5 py-4 text-right">
                        {isEditing ? (
                          <div className="space-y-2">
                            {editingStatus === 'Rejeitado' && (
                              <input
                                type="text"
                                placeholder="Motivo de Exclusão"
                                value={editingRejectionReason}
                                onChange={(e) => setEditingRejectionReason(e.target.value)}
                                className="w-48 bg-white border border-slate-200 text-red-600 p-1 rounded-md text-[10px] block placeholder:text-slate-300"
                              />
                            )}
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleSaveAdminAction(cand)}
                                className="px-2.5 py-1 rounded bg-green-700 hover:bg-green-800 text-white font-bold text-[10px] cursor-pointer"
                              >
                                Gravar
                              </button>
                              <button
                                onClick={() => setEditingCandidateId(null)}
                                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end items-center space-x-2">
                            <button
                              onClick={() => handleEditClick(cand)}
                              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 text-[10px] flex items-center space-x-1 cursor-pointer"
                            >
                              <Award className="w-3 h-3 text-blue-700" />
                              <span>Decidir / Nota</span>
                            </button>
                            {onDeleteCandidate && (
                              <button
                                onClick={() => onDeleteCandidate(cand.id)}
                                className="p-1 rounded-lg bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-400 transition-all cursor-pointer"
                                title="Anular Candidatura"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    )}

                  </tr>
                );
              })}

              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={isAdminMode ? 7 : 6} className="text-center py-8 text-slate-400">
                    Nenhum candidato corresponde aos critérios de filtragem selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section Bar */}
        {totalPages > 1 && (
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-sans">
            <span>A apresentar {paginatedCandidates.length} de {filteredCandidates.length} candidatos</span>
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white disabled:opacity-40 transition-opacity cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <span className="font-semibold text-slate-700">Página {currentPage} de {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white disabled:opacity-40 transition-opacity cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helpful notification panel inside lists */}
      {isAdminMode && (
        <div className="bg-blue-50/50 rounded-2xl border border-blue-200 p-4 flex gap-3 text-xs text-blue-800 font-semibold leading-relaxed max-w-3xl">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-blue-700" />
          <div>
            <strong>Modo de Simulação Ativo:</strong> Como membro fictício do júri do Uíge, pode aprovar ("Decidir") ou rejeitar dossiers de candidatos, introduzir notas obtidas nas provas escritas (0 a 20 valores) ou justificar exclusões. Os dados atualizam e persistem localmente na sua sessão do navegador.
          </div>
        </div>
      )}

    </div>
  );
}
