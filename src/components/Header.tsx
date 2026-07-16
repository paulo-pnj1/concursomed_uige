/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Landmark } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'candidatar-professor', label: 'Candidaturas para Professores', style: 'dark' },
    { id: 'candidatar-tecnico', label: 'Candidaturas para a Carreira Geral', style: 'accent' },
    { id: 'consultar', label: 'Consultar Candidatura', style: 'outline' }
  ] as const;

  const buttonClass = (style: 'dark' | 'accent' | 'outline', isActive: boolean) => {
    if (style === 'dark') return `bg-blue-950 hover:bg-blue-900 text-white ${isActive ? 'ring-2 ring-blue-300' : ''}`;
    if (style === 'accent') return `bg-amber-400 hover:bg-amber-500 text-blue-950 ${isActive ? 'ring-2 ring-amber-200' : ''}`;
    return `bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 ${isActive ? 'ring-2 ring-blue-200' : ''}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo / Insignia */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('inicio')}>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-blue-700" />
            </div>
            <div className="leading-tight">
              <div className="text-xs sm:text-sm font-black text-blue-950 uppercase">Governo Provincial do Uíge</div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500">Concursos Públicos de Ingresso Externo 2026</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${buttonClass(item.style, activeTab === item.id)}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-4 space-y-2 shadow-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-center px-4 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer ${buttonClass(item.style, activeTab === item.id)}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
