/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Landmark, GraduationCap, Calendar, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: Landmark },
    { id: 'vagas', label: 'Vagas & Municípios', icon: GraduationCap },
    { id: 'candidatar', label: 'Candidatar-se', icon: Award },
    { id: 'consultar', label: 'Consultar Estado', icon: Calendar },
    { id: 'candidatos', label: 'Lista de Candidatos', icon: Menu },
    { id: 'faq', label: 'Dúvidas Frequentes', icon: GraduationCap }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner with Angola Flag Colors */}
      <div className="h-1.5 w-full flex">
        <div className="bg-red-600 h-full w-1/2"></div>
        <div className="bg-yellow-500 h-full w-1/12"></div>
        <div className="bg-black h-full w-5/12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Insignia Container */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
            {/* Elegant Custom Angolan Shield SVG */}
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-blue-700 flex items-center justify-center overflow-hidden relative">
                <svg viewBox="0 0 100 100" className="w-9 h-9 text-yellow-400 fill-current">
                  {/* Gear (Engrenagem) background */}
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" strokeDasharray="6,4" fill="none" opacity="0.8" />
                  {/* Machete & Hammer cross */}
                  <path d="M35,65 L65,35 M40,35 L60,65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  {/* Central Star */}
                  <polygon points="50,25 53,35 63,35 55,41 58,51 50,45 42,51 45,41 37,35 47,35" fill="currentColor" />
                  {/* Half cog gear */}
                  <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-[9px] font-extrabold tracking-widest text-red-600 uppercase">República de Angola</div>
              <div className="text-sm font-black text-blue-950 leading-tight flex items-center gap-1.5">
                <span>MINISTÉRIO DA EDUCAÇÃO</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">GPEN</span>
              </div>
              <div className="text-xs font-bold text-slate-600">Gabinete Provincial da Educação do Uíge</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
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
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-md">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
