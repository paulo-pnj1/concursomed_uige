/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  INFO_GERAL_CONCURSO,
  VAGAS_MUNICIPADOS,
  VAGAS_TECNICO_MEDIO,
  TOTAL_VAGAS_PROFESSORES,
  TOTAL_VAGAS_TECNICO_MEDIO,
  TOTAL_VAGAS_CONCURSO
} from '../data/mockData';
import { MapPin, CalendarClock, Users, ArrowRight } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

function useCountdown(targetIso: string) {
  const [remaining, setRemaining] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: false });

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setRemaining({ dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true });
        return;
      }
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);
      setRemaining({ dias, horas, minutos, segundos, terminado: false });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  return remaining;
}

function formatarDataHora(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function Home({ setActiveTab }: HomeProps) {
  const fechoInscricoes = `${INFO_GERAL_CONCURSO.dataFechoInscricoes}T23:59:00`;
  const countdown = useCountdown(fechoInscricoes);

  const pct13 = Math.round((TOTAL_VAGAS_PROFESSORES > 0 ? 224 / TOTAL_VAGAS_CONCURSO : 0) * 100);
  const pct6 = Math.round((172 / TOTAL_VAGAS_CONCURSO) * 100);
  const pctTec = Math.round((TOTAL_VAGAS_TECNICO_MEDIO / TOTAL_VAGAS_CONCURSO) * 100);

  return (
    <div className="space-y-14 animate-fade-in">

      {/* Hero */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 to-blue-900 p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Concursos Públicos de Ingresso Externo 2026
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
            Dois concursos em simultâneo no sector da Educação da Província do Uíge: Professor do Ensino Primário e Secundário (Regime Especial) e Técnico Médio de 3ª Classe (Regime Geral), nos termos do Despacho Nº 247/2026 do Governador Provincial, ao abrigo do Decreto Presidencial nº 104/11 e nº 112/24.
          </p>
          <p className="text-xs sm:text-sm text-blue-200 font-semibold">
            As candidaturas encerram em {formatarDataHora(INFO_GERAL_CONCURSO.dataFechoInscricoes)} às 23:59.
          </p>

          {!countdown.terminado ? (
            <div className="grid grid-cols-4 gap-3 max-w-sm">
              {[
                { label: 'Dias', valor: countdown.dias },
                { label: 'Horas', valor: countdown.horas },
                { label: 'Minutos', valor: countdown.minutos },
                { label: 'Segundos', valor: countdown.segundos }
              ].map((item) => (
                <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl py-3 text-center backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">{String(item.valor).padStart(2, '0')}</div>
                  <div className="text-[9px] font-bold text-blue-200 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="inline-block px-4 py-2 rounded-xl bg-red-500/20 border border-red-300/40 text-red-100 text-xs font-bold">
              O prazo de inscrições está encerrado.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('candidatar-professor')}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold text-sm transition-all cursor-pointer"
            >
              Candidaturas para Professores
            </button>
            <button
              onClick={() => setActiveTab('candidatar-tecnico')}
              className="px-5 py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Candidaturas para a Carreira Geral
            </button>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
          <CalendarClock className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Abertura das Inscrições</span>
            <span className="text-sm font-bold text-slate-900">{formatarDataHora(INFO_GERAL_CONCURSO.dataAberturaInscricoes)}</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
          <MapPin className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Modalidade</span>
            <span className="text-sm font-bold text-slate-900">Ingresso Externo</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
          <Users className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Destinatários</span>
            <span className="text-sm font-bold text-slate-900">Professores e Carreira Geral</span>
          </div>
        </div>
      </section>

      {/* Vagas disponíveis */}
      <section className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Província do Uíge</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Vagas Disponíveis</h2>
          <p className="text-xs text-slate-500 mt-1">Para o presente concurso, a Província do Uíge dispõe das seguintes vagas:</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total no Concurso</span>
            <div className="text-5xl font-black text-slate-900">{TOTAL_VAGAS_CONCURSO}<span className="text-base font-bold text-slate-400 ml-2">vagas</span></div>
            <div className="h-1 w-16 bg-amber-400 rounded-full mt-2"></div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {[
              { letra: 'a)', nome: 'Professor - 13º Grau', desc: 'Ensino Primário e Secundário — carreira do Regime Especial', vagas: 224, pct: pct13 },
              { letra: 'b)', nome: 'Professor - 6º Grau', desc: 'Ensino Primário e Secundário — carreira do Regime Especial', vagas: 172, pct: pct6 },
              { letra: 'c)', nome: 'Técnico Médio de 3ª Classe', desc: 'Carreira Geral do sector da Educação', vagas: 50, pct: pctTec }
            ].map((cat) => (
              <div key={cat.letra} className="flex items-start gap-4">
                <span className="w-7 h-7 shrink-0 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-[10px] font-black">{cat.letra}</span>
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">{cat.nome}</span>
                      <span className="text-[10px] text-slate-400">{cat.desc}</span>
                    </div>
                    <span className="text-xl font-black text-slate-900">{cat.vagas}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-700 rounded-full transition-all duration-1000" style={{ width: `${cat.pct}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 block text-right">{cat.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabelas de distribuição por município */}
      <section className="space-y-8">
        <div>
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Mapas de Quotas</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Distribuição de Vagas por Município</h2>
          <p className="text-xs text-slate-500 mt-1">Quotas atribuídas pelo Despacho Nº 247/2026, por município da Província do Uíge.</p>
        </div>

        <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-blue-950 text-white text-left">
                <th className="px-4 py-3 font-bold">Município</th>
                <th className="px-4 py-3 font-bold text-right">Professor 13º Grau</th>
                <th className="px-4 py-3 font-bold text-right">Professor 6º Grau</th>
                <th className="px-4 py-3 font-bold text-right">Técnico Médio 3ª Classe</th>
                <th className="px-4 py-3 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {VAGAS_MUNICIPADOS.map((mun, i) => {
                const tecnico = VAGAS_TECNICO_MEDIO.find((v) => v.municipio === mun.municipio)?.vagas ?? 0;
                return (
                  <tr key={mun.municipio} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-2.5 font-bold text-slate-800">{mun.municipio}</td>
                    <td className="px-4 py-2.5 text-right text-slate-700">{mun.vagas13Grau}</td>
                    <td className="px-4 py-2.5 text-right text-slate-700">{mun.vagas6Grau}</td>
                    <td className="px-4 py-2.5 text-right text-slate-700">{tecnico}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-blue-700">{mun.totalVagas + tecnico}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 border-t-2 border-slate-200">
                <td className="px-4 py-3 font-black text-slate-900">TOTAL</td>
                <td className="px-4 py-3 text-right font-black text-slate-900">224</td>
                <td className="px-4 py-3 text-right font-black text-slate-900">172</td>
                <td className="px-4 py-3 text-right font-black text-slate-900">50</td>
                <td className="px-4 py-3 text-right font-black text-blue-800">{TOTAL_VAGAS_CONCURSO}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Escolha o concurso */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Escolha o Concurso</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">A que concurso se candidata?</h2>
          <p className="text-xs text-slate-500">Estão abertos dois concursos públicos de ingresso externo no sector da Educação. Escolha o que corresponde ao seu perfil para consultar os requisitos, documentos e legislação.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-28 bg-gradient-to-br from-slate-700 to-slate-500"></div>
            <div className="p-6 space-y-3 flex-1 flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Regime Especial — Professor do Ensino Primário e Secundário</span>
              <h3 className="text-lg font-bold text-slate-900">Candidaturas para Professores</h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                Recrutamento e selecção de professores do Ensino Primário e Secundário (categorias do 13º e 6º Grau), realizado nos 23 municípios da Província do Uíge, nos termos do Despacho Nº 247/2026 e do Decreto Presidencial nº 104/11, de 23 de Maio.
              </p>
              <div className="text-xs space-y-1 pt-2 border-t border-slate-100">
                <p><span className="font-bold text-slate-500">Categoria:</span> Professor do Ensino Primário e Secundário</p>
                <p><span className="font-bold text-slate-500">Entidade contratante:</span> Gabinete Provincial da Educação do Uíge</p>
              </div>
              <button
                onClick={() => setActiveTab('candidatar-professor')}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <span>Ver informações do concurso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-28 bg-gradient-to-br from-emerald-700 to-emerald-400"></div>
            <div className="p-6 space-y-3 flex-1 flex flex-col">
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Regime Geral — Técnico Médio de 3ª Classe</span>
              <h3 className="text-lg font-bold text-slate-900">Candidaturas para a Carreira Geral</h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                Recrutamento e selecção de pessoal técnico médio de 3ª classe para o sector da Educação, realizado nos 23 municípios da Província do Uíge, nos termos do Despacho Nº 247/2026 e do Decreto Presidencial nº 112/24, de 17 de Maio.
              </p>
              <div className="text-xs space-y-1 pt-2 border-t border-slate-100">
                <p><span className="font-bold text-slate-500">Categoria:</span> Técnico Médio de 3ª Classe</p>
                <p><span className="font-bold text-slate-500">Entidade contratante:</span> Gabinete Provincial da Educação do Uíge</p>
              </div>
              <button
                onClick={() => setActiveTab('candidatar-tecnico')}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <span>Ver informações do concurso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
