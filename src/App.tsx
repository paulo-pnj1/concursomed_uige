/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Candidato } from './types';
import { CANDIDATOS_MOCK } from './data/mockData';
import Header from './components/Header';
import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';
import CandidateQuery from './components/CandidateQuery';

const STORAGE_KEY = 'edu_uige_candidates_2026_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [candidates, setCandidates] = useState<Candidato[]>([]);

  // Initialize candidates list from localStorage or pre-populated Mock
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCandidates(JSON.parse(stored));
      } catch (e) {
        setCandidates(CANDIDATOS_MOCK);
      }
    } else {
      setCandidates(CANDIDATOS_MOCK);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(CANDIDATOS_MOCK));
    }
  }, []);

  // Handler to register/add new candidate
  const handleAddCandidate = (newCand: Candidato) => {
    const updated = [newCand, ...candidates];
    setCandidates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Handler to update an existing candidate (e.g. reclamação)
  const handleUpdateCandidate = (updatedCand: Candidato) => {
    const updated = candidates.map((c) => (c.id === updatedCand.id ? updatedCand : c));
    setCandidates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">

      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'inicio' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'candidatar-professor' && (
          <ApplicationForm onAddCandidate={handleAddCandidate} setActiveTab={setActiveTab} regime="Especial" />
        )}
        {activeTab === 'candidatar-tecnico' && (
          <ApplicationForm onAddCandidate={handleAddCandidate} setActiveTab={setActiveTab} regime="Geral" />
        )}
        {activeTab === 'consultar' && (
          <CandidateQuery candidates={candidates} onUpdateCandidate={handleUpdateCandidate} />
        )}
      </main>

      <footer className="bg-blue-950 text-blue-100 py-12 px-4 sm:px-6 lg:px-8 mt-20 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

          <div className="space-y-2 max-w-sm">
            <div className="font-black text-white uppercase text-xs tracking-wide">Governo da Província do Uíge</div>
            <p className="text-blue-300 leading-relaxed">
              Portal oficial de candidaturas aos Concursos Públicos de Ingresso Externo 2026 -  Professor do Ensino Primário e Secundário e Técnico Médio de 3ª Classe do sector da Educação.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="space-y-2">
              <div className="font-bold text-white uppercase text-[10px] tracking-wide">Navegação</div>
              <button onClick={() => setActiveTab('candidatar-professor')} className="block text-blue-300 hover:text-white transition-colors">Candidaturas para Professores</button>
              <button onClick={() => setActiveTab('candidatar-tecnico')} className="block text-blue-300 hover:text-white transition-colors">Candidaturas para a Carreira Geral</button>
              <button onClick={() => setActiveTab('consultar')} className="block text-blue-300 hover:text-white transition-colors">Consultar Candidatura</button>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-white uppercase text-[10px] tracking-wide">Informações</div>
              <span className="block text-blue-300">suporte.edu@uige.gov.ao</span>
              <span className="block text-blue-300">(+244) 935 442 110</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-blue-900 mt-8 pt-6 text-blue-400">
          © {new Date().getFullYear()} Governo Provincial do Uíge. República de Angola. Todos os direitos reservados.
        </div>
      </footer>

    </div>
  );
}
