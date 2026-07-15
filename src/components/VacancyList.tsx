/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VAGAS_MUNICIPADOS, VAGAS_ESPECIALIDADES } from '../data/mockData';
import { MapPin, Search, GraduationCap, ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';

export default function VacancyList() {
  const [searchVal, setSearchVal] = useState('');
  const [selectedMun, setSelectedMun] = useState<string | null>(null);

  const filteredMunicipalities = VAGAS_MUNICIPADOS.filter((m) =>
    m.municipio.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Intro section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Quadro de Distribuição de Vagas (Uíge)</h2>
          <p className="text-xs text-slate-500">
            Abaixo, consulte o número exato de vagas autorizadas para as instituições públicas de ensino da província do Uíge, distribuídas por município, nível de ensino (Primário e Secundário) e especialidades docentes.
          </p>
        </div>

        {/* Live Filter Inputs */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Pesquisar por município (Ex: Maquela do Zombo, Negage)"
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 transition-colors"
          />
        </div>
      </section>

      {/* Two Column Grid layout: Municipalities vs Specialties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Municipalities Vacancies (Span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider px-1">Distribuição Geográfica</h3>
          
          <div className="space-y-3">
            {filteredMunicipalities.map((mun) => {
              const isOpen = selectedMun === mun.municipio;
              return (
                <div 
                  key={mun.municipio} 
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-blue-700/40 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Item Accordion Header */}
                  <button
                    onClick={() => setSelectedMun(isOpen ? null : mun.municipio)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left text-xs text-slate-700 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{mun.municipio}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Clique para ver as escolas com vagas de admissão</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <span className="text-lg font-black text-slate-900">{mun.totalVagas}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block tracking-wide">Vagas Totais</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {/* Expandable item details */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1.5 border-t border-slate-100 bg-slate-50/50 space-y-4">
                      
                      {/* Sub-distribution stats */}
                      <div className="grid grid-cols-3 gap-3 text-center py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">Ensino Primário</span>
                          <span className="text-xs font-bold text-blue-700 block mt-0.5">{mun.vagasPrimario} Vagas</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">I Ciclo Secundário</span>
                          <span className="text-xs font-bold text-blue-600 block mt-0.5">{mun.vagasSecundarioICiclo} Vagas</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">II Ciclo Secundário</span>
                          <span className="text-xs font-bold text-red-600 block mt-0.5">{mun.vagasSecundarioIICiclo} Vagas</span>
                        </div>
                      </div>

                      {/* Schools listing */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">Escolas em Destaque neste Município:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mun.escolasDestacadas.map((escola, idx) => (
                            <div key={idx} className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-slate-200/60 text-[11px] text-slate-700 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-700"></span>
                              <span>{escola}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 text-[10px] text-blue-800 bg-blue-50/50 p-2.5 rounded-lg border border-blue-200 font-semibold">
                        <AlertCircle className="w-4 h-4 shrink-0 text-blue-700" />
                        <span>A distribuição exata de vagas em cada escola deve ser selecionada no menu de inscrição ("Candidatar-se").</span>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

            {filteredMunicipalities.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">Nenhum município corresponde aos filtros de pesquisa.</p>
            )}
          </div>
        </div>

        {/* Right Col: Specialty vacancies list (Span 1) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider px-1">Distribuição por Categoria</h3>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-4.5 h-4.5 text-blue-700" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Necessidades Provinciais</h4>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {VAGAS_ESPECIALIDADES.map((esp, i) => (
                <div key={i} className={`flex justify-between items-center text-xs ${i > 0 ? 'pt-3' : ''}`}>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">{esp.especialidade}</span>
                    <span className={`inline-block px-1.5 py-0.5 text-[8px] font-bold rounded border ${
                      esp.nivel === 'Primário' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      esp.nivel === 'I Ciclo' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>{esp.nivel}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800">{esp.vagas}</span>
                    <span className="text-[10px] text-slate-400 block">Vagas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
