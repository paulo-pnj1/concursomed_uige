/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Candidato } from './types';
import { CANDIDATOS_MOCK } from './data/mockData';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import CandidateQuery from './components/CandidateQuery';
import VacancyList from './components/VacancyList';
import ResultsList from './components/ResultsList';
import FAQSection from './components/FAQSection';
import { Info, MapPin, Building2, Bell } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [candidates, setCandidates] = useState<Candidato[]>([]);
  const [showNotification, setShowNotification] = useState(true);

  // Initialize candidates list from localStorage or pre-populated Mock
  useEffect(() => {
    const stored = localStorage.getItem('edu_uige_candidates_2026');
    if (stored) {
      try {
        setCandidates(JSON.parse(stored));
      } catch (e) {
        setCandidates(CANDIDATOS_MOCK);
      }
    } else {
      setCandidates(CANDIDATOS_MOCK);
      localStorage.setItem('edu_uige_candidates_2026', JSON.stringify(CANDIDATOS_MOCK));
    }
  }, []);

  // Handler to register/add new candidate
  const handleAddCandidate = (newCand: Candidato) => {
    const updated = [newCand, ...candidates];
    setCandidates(updated);
    localStorage.setItem('edu_uige_candidates_2026', JSON.stringify(updated));
  };

  // Handler to update an existing candidate's decision/grade
  const handleUpdateCandidate = (updatedCand: Candidato) => {
    const updated = candidates.map((c) => (c.id === updatedCand.id ? updatedCand : c));
    setCandidates(updated);
    localStorage.setItem('edu_uige_candidates_2026', JSON.stringify(updated));
  };

  // Handler to delete/cancel a candidate (for admin simulations)
  const handleDeleteCandidate = (id: string) => {
    const updated = candidates.filter((c) => c.id !== id);
    setCandidates(updated);
    localStorage.setItem('edu_uige_candidates_2026', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Official State Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Broadcast news/notification ticker banner */}
      {showNotification && (
        <div className="bg-blue-50 border-b border-blue-100 text-xs text-blue-900 py-3.5 px-4 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <Bell className="w-4 h-4 text-blue-700 shrink-0" />
              <p className="font-medium leading-normal text-blue-850">
                <strong className="text-blue-950 font-extrabold mr-1.5">[Edital Uíge]:</strong> Submissões online abertas até ao termo do calendário oficial. Candidatos excluídos dispõem de recurso de reclamação integrado.
              </p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-blue-400 hover:text-blue-750 font-bold px-2 text-sm transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Body View Controller */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10">
          
          {/* Breadcrumb Info Line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-5">
            <div className="flex items-center space-x-2 text-slate-500 text-xs">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>GPE - Gabinete Provincial da Educação</span>
              <span>/</span>
              <span className="text-slate-800 font-semibold capitalize">{activeTab}</span>
            </div>
            
            <div className="flex items-center space-x-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/80 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Uíge, Angola</span>
            </div>
          </div>

          {/* Active view selection switch */}
          <div className="transition-all duration-200">
            {activeTab === 'inicio' && (
              <Dashboard candidates={candidates} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'candidatar' && (
              <ApplicationForm onAddCandidate={handleAddCandidate} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'consultar' && (
              <CandidateQuery candidates={candidates} onUpdateCandidate={handleUpdateCandidate} />
            )}
            {activeTab === 'vagas' && (
              <VacancyList />
            )}
            {activeTab === 'candidatos' && (
              <ResultsList 
                candidates={candidates} 
                onUpdateCandidate={handleUpdateCandidate}
                onDeleteCandidate={handleDeleteCandidate}
              />
            )}
            {activeTab === 'faq' && (
              <FAQSection />
            )}
          </div>

        </div>
      </main>

      {/* State-Agency High-Contrast Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 mt-20 text-xs text-slate-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="space-y-1.5 text-center md:text-left">
            <div className="font-bold text-slate-700 tracking-wider uppercase text-[10px]">Governo da Província do Uíge</div>
            <p className="max-w-md text-slate-400 leading-relaxed">
              Plataforma oficial para simplificar e garantir transparência em processos públicos de contratação. Gabinete Provincial da Educação do Uíge, Angola.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-4 font-semibold">
              <button onClick={() => setActiveTab('inicio')} className="text-slate-600 hover:text-blue-750 transition-colors">Painel</button>
              <span className="text-slate-300">•</span>
              <button onClick={() => setActiveTab('vagas')} className="text-slate-600 hover:text-blue-750 transition-colors">Quadro de Vagas</button>
              <span className="text-slate-300">•</span>
              <button onClick={() => setActiveTab('faq')} className="text-slate-600 hover:text-blue-750 transition-colors">FAQs</button>
            </div>
            <div className="text-center md:text-right text-[10px] text-slate-400">
              © {new Date().getFullYear()} GPE-Uíge. República de Angola. Todos os direitos reservados.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
