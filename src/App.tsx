/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Candidato } from './types';
import { CANDIDATOS_MOCK } from './data/mockData';
import Header from './components/Header';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import CheckStatus from './components/CheckStatus';

const STORAGE_KEY = 'edu_uige_candidates_2026';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [candidates, setCandidates] = useState<Candidato[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCandidates(JSON.parse(stored));
        return;
      } catch {
        // fall through to mock data
      }
    }
    setCandidates(CANDIDATOS_MOCK);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CANDIDATOS_MOCK));
  }, []);

  const handleAddCandidate = (newCand: Candidato) => {
    const updated = [newCand, ...candidates];
    setCandidates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'inicio' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'candidatar' && <ApplyForm onAddCandidate={handleAddCandidate} setActiveTab={setActiveTab} />}
        {activeTab === 'consultar' && <CheckStatus candidates={candidates} />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Governo da Província do Uíge</div>
            <p className="mt-1">Gabinete Provincial da Educação do Uíge, Angola.</p>
          </div>
          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} GPE-Uíge. República de Angola. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
