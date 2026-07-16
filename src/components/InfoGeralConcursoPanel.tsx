/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { INFO_GERAL_CONCURSO } from '../data/mockData';
import { CalendarDays, FileText, ShieldCheck, ListChecks, Landmark, Clock3 } from 'lucide-react';

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function InfoGeralConcursoPanel() {
  const info = INFO_GERAL_CONCURSO;

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1.5 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded">
            <Landmark className="w-3 h-3" />
            Aviso Oficial
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">{info.tituloAviso}</h2>
          <p className="text-xs text-slate-500">{info.entidadeOrganizadora}</p>
          <p className="text-[11px] text-slate-400 italic">{info.diplomaLegal}</p>
        </div>
      </div>

      {/* Key dates strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-blue-700 text-[10px] font-bold uppercase tracking-wide">
            <CalendarDays className="w-3.5 h-3.5" /> Abertura
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1.5">{formatarData(info.dataAberturaInscricoes)}</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-red-700 text-[10px] font-bold uppercase tracking-wide">
            <Clock3 className="w-3.5 h-3.5" /> Encerramento
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1.5">{formatarData(info.dataFechoInscricoes)}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
            <FileText className="w-3.5 h-3.5" /> Prova Escrita
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1.5">{formatarData(info.dataPrevistaExame)}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-green-700 text-[10px] font-bold uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" /> Resultados
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1.5">{formatarData(info.dataPrevistaResultados)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Requisitos gerais */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5 text-blue-700" /> Requisitos Gerais
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
            {info.requisitosGerais.map((r, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-blue-600 font-bold">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Documentos exigidos */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-700" /> Documentos Exigidos
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
            {info.documentosExigidos.map((d, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-blue-600 font-bold">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fases do concurso */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Fases do Concurso
          </h3>
          <ol className="space-y-2 text-xs text-slate-600 leading-relaxed">
            {info.fasesConcurso.map((f, i) => (
              <li key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                <span className="font-bold text-slate-800 block">{f.fase} -  {f.nome}</span>
                <span>{f.descricao}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer strip: age, fee, submission place, contacts */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Faixa Etária</span>
          <span className="font-semibold text-slate-800">{info.idadeMinima} a {info.idadeMaxima} anos</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Taxa de Inscrição</span>
          <span className="font-semibold text-slate-800">{info.taxaInscricao}</span>
        </div>
        <div className="lg:col-span-2">
          <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Local de Submissão</span>
          <span className="font-semibold text-slate-800">{info.localSubmissao}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Email</span>
          <span className="font-semibold text-slate-800">{info.contactos.email}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Telefone</span>
          <span className="font-semibold text-slate-800">{info.contactos.telefone}</span>
        </div>
        <div className="lg:col-span-2">
          <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wide">Horário de Atendimento</span>
          <span className="font-semibold text-slate-800">{info.contactos.horario}</span>
        </div>
      </div>
    </section>
  );
}
