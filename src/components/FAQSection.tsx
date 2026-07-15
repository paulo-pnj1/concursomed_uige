/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Clock, FileCheck } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Todas' | 'Inscrição' | 'Documentos' | 'Exame' | 'Resultados'>('Todas');

  const categories = ['Todas', 'Inscrição', 'Documentos', 'Exame', 'Resultados'] as const;

  const filteredFaqs = FAQS.filter(
    (faq) => activeCategory === 'Todas' || faq.categoria === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Intro Header Section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-700" />
            <span>Dúvidas e Perguntas Frequentes (FAQs)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Consulte as respostas às principais dúvidas de candidatos sobre o Concurso Público do Sector da Educação na Província do Uíge.
          </p>
        </div>

        {/* Category horizontal selector bar */}
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-700 text-white font-bold shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen ? 'border-blue-700/40 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-5 py-4 flex justify-between items-center text-left text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <div className="flex items-center space-x-3 pr-4">
                  <span className={`inline-block shrink-0 px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase rounded border ${
                    faq.categoria === 'Inscrição' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    faq.categoria === 'Documentos' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    faq.categoria === 'Exame' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
                  }`}>{faq.categoria}</span>
                  <span className="font-bold text-slate-900">{faq.pergunta}</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 leading-relaxed">
                  {faq.resposta}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Contacts Block */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm">Não encontrou a resposta que procurava?</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          O Gabinete Provincial da Educação do Uíge disponibiliza canais oficiais de apoio para suporte à submissão eletrónica e esclarecimento de editais:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Apoio por Email</span>
            <span className="font-bold text-slate-800 block">suporte.edu@uige.gov.ao</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Apoio por Telefone</span>
            <span className="font-bold text-slate-800 block">(+244) 935 442 110</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Horário de Atendimento</span>
            <span className="font-bold text-slate-800 block">Seg-Sex: 8h00 às 15h30</span>
          </div>
        </div>
      </section>

    </div>
  );
}
