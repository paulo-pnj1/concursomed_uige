/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

function getRemaining(target: string) {
  const diff = new Date(target + 'T23:59:59').getTime() - Date.now();
  const clamp = Math.max(diff, 0);
  return {
    dias: Math.floor(clamp / (1000 * 60 * 60 * 24)),
    horas: Math.floor((clamp / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((clamp / (1000 * 60)) % 60),
    segundos: Math.floor((clamp / 1000) % 60),
    ended: diff <= 0,
  };
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = React.useState(() => getRemaining(target));

  React.useEffect(() => {
    const t = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const units = [
    { label: 'Dias', value: time.dias },
    { label: 'Horas', value: time.horas },
    { label: 'Minutos', value: time.minutos },
    { label: 'Segundos', value: time.segundos },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70">{u.label}</div>
        </div>
      ))}
    </div>
  );
}
