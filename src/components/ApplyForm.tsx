/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Candidato } from '../types';
import { MUNICIPIOS_UIGE, ESPECIALIDADES_CURSOS } from '../data/mockData';

interface ApplyFormProps {
  onAddCandidate: (c: Candidato) => void;
  setActiveTab: (tab: string) => void;
}

const NIVEIS = ['Médio Pedagógico', 'Bacharelato', 'Licenciatura'] as const;

export default function ApplyForm({ onAddCandidate, setActiveTab }: ApplyFormProps) {
  const [submitted, setSubmitted] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    nomeCompleto: '',
    biNumero: '',
    telefone: '',
    email: '',
    municipioCandidatura: MUNICIPIOS_UIGE[0],
    nivelEnsino: NIVEIS[0] as Candidato['nivelEnsino'],
    cursoEspecialidade: ESPECIALIDADES_CURSOS[0],
    mediaFinal: '',
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `UI-EDU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    onAddCandidate({
      id,
      nomeCompleto: form.nomeCompleto,
      biNumero: form.biNumero,
      telefone: form.telefone,
      email: form.email,
      municipioCandidatura: form.municipioCandidatura,
      nivelEnsino: form.nivelEnsino,
      cursoEspecialidade: form.cursoEspecialidade,
      mediaFinal: Number(form.mediaFinal),
      dataSubmissao: new Date().toISOString().slice(0, 10),
      status: 'Pendente',
    });
    setSubmitted(id);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-xl border border-slate-200 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-lg font-extrabold text-slate-900 mb-1">Candidatura submetida</h2>
        <p className="text-sm text-slate-500 mb-4">Guarde o seu número de candidatura para consultar o estado mais tarde.</p>
        <div className="inline-block px-4 py-2 rounded-lg bg-slate-100 font-mono font-bold text-slate-800">{submitted}</div>
        <button
          onClick={() => setActiveTab('consultar')}
          className="mt-6 block w-full px-4 py-2.5 rounded-lg bg-red-700 text-white font-bold text-sm hover:bg-red-800"
        >
          Consultar candidatura
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-extrabold text-slate-900 mb-1">Candidatar-se</h2>
      <p className="text-sm text-slate-500 mb-6">Preencha os seus dados para submeter a candidatura ao Concurso Público de Ingresso Externo 2026.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Nome completo</label>
          <input required value={form.nomeCompleto} onChange={(e) => update('nomeCompleto', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Nº do Bilhete de Identidade</label>
            <input required value={form.biNumero} onChange={(e) => update('biNumero', e.target.value)}
              placeholder="000000000UE000"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Telefone</label>
            <input required value={form.telefone} onChange={(e) => update('telefone', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Email</label>
          <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Município da candidatura</label>
            <select value={form.municipioCandidatura} onChange={(e) => update('municipioCandidatura', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600">
              {MUNICIPIOS_UIGE.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Nível de ensino</label>
            <select value={form.nivelEnsino} onChange={(e) => update('nivelEnsino', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600">
              {NIVEIS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Especialidade / Curso</label>
            <select value={form.cursoEspecialidade} onChange={(e) => update('cursoEspecialidade', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600">
              {ESPECIALIDADES_CURSOS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">Média final do curso</label>
            <input required type="number" min={10} max={20} step={0.1} value={form.mediaFinal} onChange={(e) => update('mediaFinal', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
        </div>

        <button type="submit" className="w-full px-4 py-3 rounded-lg bg-red-700 text-white font-bold text-sm hover:bg-red-800 transition-colors">
          Submeter candidatura
        </button>
      </form>
    </div>
  );
}
