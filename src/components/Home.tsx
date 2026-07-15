/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CalendarDays, MapPin, Users, CheckCircle2, FileText, Phone, Mail, Clock } from 'lucide-react';
import { INFO_GERAL_CONCURSO, VAGAS_MUNICIPIOS, TOTAL_VAGAS } from '../data/mockData';
import Countdown from './Countdown';

function formatarData(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
}

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const info = INFO_GERAL_CONCURSO;

  return (
    <div className="space-y-14">

      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 px-6 sm:px-10 py-10 sm:py-14 text-white">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            Concurso Público de Ingresso Externo 2026
          </h1>
          <p className="mt-4 text-red-50/90 leading-relaxed">
            Recrutamento de Agentes de Educação (Professores) para o Ensino Primário e Secundário na
            Província do Uíge, nos termos da Lei n.º 26/22, de 22 de Agosto, e do Decreto Presidencial n.º 112/24, de 17 de Maio.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-100/80 mb-2">
              As candidaturas encerram em — {formatarData(info.dataFechoInscricoes)}
            </div>
            <Countdown target={info.dataFechoInscricoes} />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('candidatar')}
              className="px-5 py-3 rounded-lg bg-white text-red-800 font-bold text-sm hover:bg-red-50 transition-colors"
            >
              Candidatar-se
            </button>
            <button
              onClick={() => setActiveTab('consultar')}
              className="px-5 py-3 rounded-lg bg-white/10 border border-white/30 text-white font-bold text-sm hover:bg-white/20 transition-colors"
            >
              Consultar Candidatura
            </button>
          </div>
        </div>
      </section>

      {/* Info rápida */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: CalendarDays, label: 'Abertura das inscrições', value: formatarData(info.dataAberturaInscricoes) },
          { icon: FileText, label: 'Modalidade', value: 'Ingresso Externo' },
          { icon: Users, label: 'Destinatários', value: 'Professores' },
          { icon: MapPin, label: 'Província', value: 'Uíge' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <item.icon className="w-5 h-5 text-red-700 mb-2" />
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{item.label}</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{item.value}</div>
          </div>
        ))}
      </section>

      {/* Vagas disponíveis */}
      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Vagas disponíveis</h2>
        <p className="text-sm text-slate-500 mb-6">
          Para o presente concurso a Província do Uíge dispõe de um total de{' '}
          <span className="font-bold text-slate-800">{TOTAL_VAGAS} vagas</span>, distribuídas pelos 16 municípios.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-slate-600">Município</th>
                <th className="text-right px-4 py-3 font-bold text-slate-600">Vagas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {VAGAS_MUNICIPIOS.map((v) => (
                <tr key={v.municipio}>
                  <td className="px-4 py-2.5 text-slate-700">{v.municipio}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-slate-900">{v.totalVagas}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-extrabold">
                <td className="px-4 py-3 text-slate-900">TOTAL</td>
                <td className="px-4 py-3 text-right text-slate-900">{TOTAL_VAGAS}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Requisitos e documentos */}
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-extrabold text-slate-900 mb-4">Requisitos gerais</h3>
          <ul className="space-y-2.5">
            {info.requisitosGerais.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-extrabold text-slate-900 mb-4">Documentos exigidos</h3>
          <ul className="space-y-2.5">
            {info.documentosExigidos.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-slate-600">
                <FileText className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contactos */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-extrabold text-slate-900 mb-4">Contactos</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-red-700" /> {info.contactos.email}</div>
          <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-red-700" /> {info.contactos.telefone}</div>
          <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-red-700" /> {info.contactos.horario}</div>
        </div>
      </section>

    </div>
  );
}
