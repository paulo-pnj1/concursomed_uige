/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'candidatar', label: 'Candidatar-se' },
  { id: 'consultar', label: 'Consultar Candidatura' },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const go = (id: string) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <button onClick={() => go('inicio')} className="flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-full bg-red-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Governo da Província do Uíge</div>
            <div className="text-sm sm:text-base font-extrabold text-slate-900">Concurso Público de Ingresso Externo 2026</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === l.id ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold ${
                activeTab === l.id ? 'bg-red-50 text-red-700' : 'text-slate-600'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
