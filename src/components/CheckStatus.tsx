/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Candidato } from '../types';

interface CheckStatusProps {
  candidates: Candidato[];
}

const STATUS_STYLE: Record<Candidato['status'], { icon: React.ElementType; classes: string }> = {
  Validado: { icon: CheckCircle2, classes: 'bg-green-50 text-green-700 border-green-200' },
  Pendente: { icon: Clock, classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  Rejeitado: { icon: XCircle, classes: 'bg-red-50 text-red-700 border-red-200' },
};

export default function CheckStatus({ candidates }: CheckStatusProps) {
  const [bi, setBi] = React.useState('');
  const [result, setResult] = React.useState<Candidato | null | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = candidates.find((c) => c.biNumero.toLowerCase() === bi.trim().toLowerCase());
    setResult(found ?? null);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-extrabold text-slate-900 mb-1">Consultar Candidatura</h2>
      <p className="text-sm text-slate-500 mb-6">Introduza o número do seu Bilhete de Identidade para ver o estado da candidatura.</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={bi}
          onChange={(e) => setBi(e.target.value)}
          placeholder="Nº do Bilhete de Identidade"
          className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button type="submit" className="px-4 py-2.5 rounded-lg bg-red-700 text-white font-bold text-sm hover:bg-red-800 flex items-center gap-2">
          <Search className="w-4 h-4" /> Consultar
        </button>
      </form>

      {result === null && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-500">
          Nenhuma candidatura encontrada com esse número de B.I.
        </div>
      )}

      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400">Candidatura</div>
              <div className="font-mono font-bold text-slate-900">{result.id}</div>
            </div>
            {(() => {
              const s = STATUS_STYLE[result.status];
              const Icon = s.icon;
              return (
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${s.classes}`}>
                  <Icon className="w-3.5 h-3.5" /> {result.status}
                </span>
              );
            })()}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><div className="text-xs text-slate-400">Nome</div><div className="font-semibold text-slate-800">{result.nomeCompleto}</div></div>
            <div><div className="text-xs text-slate-400">Município</div><div className="font-semibold text-slate-800">{result.municipioCandidatura}</div></div>
            <div><div className="text-xs text-slate-400">Especialidade</div><div className="font-semibold text-slate-800">{result.cursoEspecialidade}</div></div>
            <div><div className="text-xs text-slate-400">Data de submissão</div><div className="font-semibold text-slate-800">{result.dataSubmissao}</div></div>
          </div>

          {result.status === 'Rejeitado' && result.motivoRejeicao && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">{result.motivoRejeicao}</div>
          )}
          {result.status === 'Validado' && result.notaExame !== undefined && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
              Nota do exame: <span className="font-bold">{result.notaExame}</span> valores
            </div>
          )}
        </div>
      )}
    </div>
  );
}
