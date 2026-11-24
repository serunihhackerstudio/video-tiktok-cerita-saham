// S8: diagnosis. "Sakit" dicoret, "Istirahat" dilingkari, meteran ke CUKUP SEHAT, Si Menara jogging.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp} from '../components';
import {GridBg, Mascot} from '../kit';
import {BODY, C, HEAD, MONO} from '../theme';
import {SceneProps, wordFrame} from '../timing';

const ROWS = [
  {k: 'Sakit', v: ''},
  {k: 'Istirahat', v: ''},
  {k: 'Laba & modal', v: 'kuat'},
  {k: 'Margin bunga', v: 'sempit'},
];

export const S8: React.FC<SceneProps> = ({t, dur}) => {
  const f = useCurrentFrame();
  const bukan = wordFrame(t, 'bukan', 0.2, dur);
  const rest = wordFrame(t, 'istirahat', 0.4, dur);
  const kuat = wordFrame(t, 'kuat', 0.62, dur);
  const sempit = wordFrame(t, 'menyempit', 0.82, dur);
  const strike = interpolate(f, [bukan, bukan + 10], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const circle = interpolate(f, [rest, rest + 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const needle = interpolate(f, [rest, rest + 30], [-75, 25], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const jogX = interpolate(f, [sempit, dur], [760, 1160], clamp);
  const rad = ((needle - 90) * Math.PI) / 180;
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={bukan} name="pen" volume={0.5} />
      <Sfx at={rest} name="pen" volume={0.5} />
      <Sfx at={rest + 20} name="ding" volume={0.4} />

      <div style={{position: 'absolute', left: 120, top: 220, width: 600, height: 640, background: C.paper, borderRadius: 30, padding: '70px 44px 30px', boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: 220, top: -24, width: 160, height: 60, borderRadius: 14, background: C.dim}} />
        <div style={{fontFamily: MONO, fontSize: 30, color: '#4A5571', letterSpacing: 3}}>DIAGNOSIS · BBRI</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, marginTop: 34}}>
          {ROWS.map((r, i) => (
            <div key={r.k} style={{position: 'relative', display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontWeight: 700, fontSize: 40, color: C.ink}}>
              <span style={{position: 'relative'}}>
                {r.k}
                {i === 0 && <span style={{position: 'absolute', left: -6, top: '52%', height: 7, width: `${strike * 104}%`, background: C.siren, borderRadius: 4}} />}
                {i === 1 && (
                  <svg width={240} height={90} style={{position: 'absolute', left: -34, top: -18}} aria-hidden>
                    <ellipse cx={120} cy={45} rx={112} ry={38} fill="none" stroke={C.siren} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circle} />
                  </svg>
                )}
              </span>
              <span style={{color: r.v === 'kuat' ? '#1E9E5A' : '#B26B00', opacity: (r.v === 'kuat' && f >= kuat) || (r.v === 'sempit' && f >= sempit) ? 1 : 0}}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{position: 'absolute', left: 290, top: 900, width: 500, height: 360}}>
        <svg width={500} height={280} aria-hidden>
          <g transform="translate(250,250)">
            <path d="M-210 0 A210 210 0 0 1 -105 -182" fill="none" stroke={C.siren} strokeWidth={40} />
            <path d="M-105 -182 A210 210 0 0 1 105 -182" fill="none" stroke={C.tape} strokeWidth={40} />
            <path d="M105 -182 A210 210 0 0 1 210 0" fill="none" stroke={C.scan} strokeWidth={40} />
            <line x1={0} y1={0} x2={Math.cos(rad) * 170} y2={Math.sin(rad) * 170} stroke={C.white} strokeWidth={12} strokeLinecap="round" />
            <circle r={20} fill={C.white} />
          </g>
        </svg>
        <div style={{textAlign: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 56, color: C.white, opacity: f >= rest + 20 ? 1 : 0}}>CUKUP SEHAT</div>
      </div>

      <Mascot x={jogX} y={360} scale={0.7} mood="ok" signal={0.6} tilt={f >= sempit ? 8 : 0} />
    </AbsoluteFill>
  );
};
