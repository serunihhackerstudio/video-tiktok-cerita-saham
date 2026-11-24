// Template scene "flat 2D motion explainer" yang digerakkan data. Dipakai bersama oleh video seri saham.
// Setiap factory mengembalikan komponen scene; kata penanda ([kata, fraksi cadangan]) menyinkronkan animasi dengan narasi.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, Stamp, clamp, shake} from './components';
import {Card, Cursor, GridBg, Mascot, Mood, Panel, Pill, Poll, PriceLine, idNum, useCount, usePop} from './kit';
import {BODY, C, HEAD, MONO} from './theme';
import {SceneProps, wordFrame} from './timing';

export type A = [string, number];
const wf = (t: SceneProps['t'], a: A, dur: number) => wordFrame(t, a[0], a[1], dur);
type StampSpec = {text: string; color: string; size?: number};

// ------------------------------------------------------------------ HOOK: monitor + ranjang + polling
export const hook = (p: {
  title: string;
  top: string;
  data: number[];
  big: string;
  bigSub: string;
  opts: [string, string];
  pill: string;
  a: {drop: A; pill: A; poll: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const drop = wf(t, p.a.drop, dur);
  const why = wf(t, p.a.pill, dur);
  const sick = wf(t, p.a.poll, dur);
  const sh = shake(f, [drop + 10], 10);
  const cx = interpolate(f, [sick + 6, sick + 26, sick + 46, Math.max(dur, sick + 47)], [700, 400, 690, 560], clamp);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={4} name="beep" volume={0.35} />
      <Sfx at={drop + 10} name="alarm" volume={0.35} />
      <Sfx at={sick} name="pop" volume={0.6} />
      <AbsoluteFill style={{transform: `translate(${sh.x}px, ${sh.y}px)`}}>
        <Panel x={60} y={190} w={960} h={450}>
          <div style={{position: 'absolute', left: 36, top: 26, fontFamily: MONO, fontSize: 28, color: C.dim, letterSpacing: 2}}>{p.title}</div>
          <div style={{position: 'absolute', left: 36, top: 76, fontFamily: MONO, fontSize: 32, color: C.white}}>{p.top}</div>
          <PriceLine x={60} y={140} w={840} h={250} data={p.data} a={6} b={drop + 24} color={C.siren} />
          {f >= drop + 10 && (
            <div style={{position: 'absolute', right: 40, top: 40, textAlign: 'right'}}>
              <div style={{fontFamily: HEAD, fontWeight: 800, fontSize: 110, color: C.siren, lineHeight: 1}}>{p.big}</div>
              <div style={{fontFamily: MONO, fontSize: 28, color: C.white}}>{p.bigSub}</div>
            </div>
          )}
        </Panel>
        <Pill text={p.pill} at={why} top={560} />
        <div style={{position: 'absolute', left: 250, top: 1090, width: 580, height: 24, background: C.dim, borderRadius: 12}} />
        <Mascot x={390} y={660} scale={0.95} mood="sick" compress thermo signal={0.1} tilt={-4} />
        <div style={{position: 'absolute', left: 270, top: 990, width: 540, height: 110, background: '#3B5B9A', borderRadius: 28}} />
      </AbsoluteFill>
      <Poll at={sick} top={1150} options={[{label: p.opts[0], color: C.siren}, {label: p.opts[1], color: C.tape}]} pick={-1} />
      <Cursor x={cx} y={1290} at={sick + 6} />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ ANGKA BESAR + maskot + stempel
export const bigNumber = (p: {
  label: string;
  to: number;
  from?: number;
  dec?: number;
  prefix?: string;
  suffix?: string;
  sub?: string;
  color?: string;
  mood?: Mood;
  pill?: string;
  stamp?: StampSpec;
  blocks?: number; // jumlah balok tumpukan dekoratif
  a: {num: A; pill?: A; stamp?: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const num = wf(t, p.a.num, dur);
  const pillAt = p.a.pill ? wf(t, p.a.pill, dur) : num + 20;
  const stampAt = p.a.stamp ? wf(t, p.a.stamp, dur) : num + 40;
  const v = useCount(num, num + 36, p.from ?? 0, p.to);
  const blocks = p.blocks ? Math.round(interpolate(f, [num, num + 60], [2, p.blocks], clamp)) : 0;
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={num} name="tick" volume={0.4} />
      <Sfx at={pillAt} name="pop" volume={0.4} />
      <Sfx at={stampAt} name="stamp" volume={0.6} />
      <Card x={110} y={220} w={860} at={num - 6} label={p.label} value={`${p.prefix ?? ''}${idNum(v, p.dec ?? 0)}${p.suffix ?? ''}`} color={p.color ?? C.white} sub={p.sub} />
      {p.pill && <Pill text={p.pill} at={pillAt} top={560} />}
      {blocks > 0 && (
        <div style={{position: 'absolute', left: 120, top: 700, width: 420, height: 560}}>
          {Array.from({length: blocks}).map((_, i) => (
            <div key={i} style={{position: 'absolute', left: i % 2 ? 24 : 0, bottom: i * 56, width: 330, height: 48, borderRadius: 12, background: i % 2 ? C.scan : '#1FA866', border: '4px solid #0F7A48', boxSizing: 'border-box'}} />
          ))}
        </div>
      )}
      <Mascot x={blocks ? 620 : 390} y={660} scale={0.9} mood={p.mood ?? 'ok'} signal={0.6} />
      {p.stamp && <Stamp at={stampAt} text={p.stamp.text} color={p.stamp.color} size={p.stamp.size ?? 100} style={{left: 140, top: 1220}} />}
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ BATANG (skala dari nol)
export const bars = (p: {
  label: string;
  to: number;
  dec?: number;
  prefix?: string;
  suffix?: string;
  sub: string;
  bars: {k: string; v: number; color: string}[];
  max: number;
  mood?: Mood;
  note?: string;
  a: {num: A; sub: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const num = wf(t, p.a.num, dur);
  const up = wf(t, p.a.sub, dur);
  const v = useCount(num, num + 40, 0, p.to);
  const grow = interpolate(f, [num, num + 40], [0, 1], clamp);
  const n = p.bars.length;
  const bw = Math.floor(440 / n) - 30;
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={num} name="tick" volume={0.4} />
      <Sfx at={up} name="ding" volume={0.4} />
      <Mascot x={30} y={640} scale={0.9} mood={p.mood ?? 'ok'} compress signal={0.6} />
      <Card x={460} y={210} w={560} at={num - 6} label={p.label} value={`${p.prefix ?? ''}${idNum(v, p.dec ?? 1)}${p.suffix ?? ''}`} sub={f >= up ? p.sub : ' '} />
      <Panel x={460} y={560} w={560} h={640}>
        <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontSize: 26, color: C.dim}}>{p.note ?? 'skala dari nol'}</div>
        {p.bars.map((b, i) => (
          <div key={b.k} style={{position: 'absolute', left: 40 + i * (bw + 30), bottom: 110, width: bw}}>
            <div style={{fontFamily: MONO, fontSize: 28, color: C.white, textAlign: 'center', marginBottom: 10, opacity: grow}}>{idNum(b.v, p.dec ?? 1)}</div>
            <div style={{height: (b.v / p.max) * 420 * grow, background: b.color, borderRadius: '16px 16px 0 0'}} />
          </div>
        ))}
        {p.bars.map((b, i) => (
          <div key={b.k + 'l'} style={{position: 'absolute', left: 40 + i * (bw + 30), bottom: 60, width: bw, textAlign: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 32, color: C.dim}}>
            {b.k}
          </div>
        ))}
      </Panel>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ LANGKAH/RUMUS: chip muncul bergiliran
export const steps = (p: {
  title?: string;
  chips: {t: string; sub?: string; a: A; color?: string; size?: number}[];
  stamp?: StampSpec & {a: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const stampAt = p.stamp ? wf(t, p.stamp.a, dur) : 0;
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      {p.title && <div style={{position: 'absolute', left: 110, top: 200, fontFamily: MONO, fontSize: 30, color: C.dim, letterSpacing: 3}}>{p.title}</div>}
      {p.chips.map((c, i) => (
        <Chip key={i} i={i} at={wf(t, c.a, dur)} text={c.t} sub={c.sub} color={c.color ?? C.white} size={c.size ?? 56} f={f} />
      ))}
      {p.stamp && <Stamp at={stampAt} text={p.stamp.text} color={p.stamp.color} size={p.stamp.size ?? 88} style={{left: 150, top: 1200}} />}
    </AbsoluteFill>
  );
};

const Chip: React.FC<{i: number; at: number; text: string; sub?: string; color: string; size: number; f: number}> = ({i, at, text, sub, color, size, f}) => {
  const s = usePop(at);
  if (f < at) return null;
  return (
    <>
      <Sfx at={at} name="pop" volume={0.45} />
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 270 + i * 230,
          width: 860,
          height: 190,
          boxSizing: 'border-box',
          background: C.steel,
          borderRadius: 30,
          borderLeft: `14px solid ${color}`,
          padding: '28px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 6,
          transform: `translateX(${interpolate(s, [0, 1], [-120, 0])}px)`,
          opacity: interpolate(s, [0, 0.3], [0, 1], clamp),
        }}
      >
        <span style={{fontFamily: HEAD, fontWeight: 800, fontSize: size, color, lineHeight: 1.05}}>{text}</span>
        {sub && <span style={{fontFamily: MONO, fontSize: 28, color: C.dim}}>{sub}</span>}
      </div>
    </>
  );
};

// ------------------------------------------------------------------ VERSUS dua kolom
export const versus = (p: {
  left: {name: string; color: string; rows: [string, string][]};
  right: {name: string; color: string; rows: [string, string][]};
  a: {start: A; end: A};
  stamp?: StampSpec & {a: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const s0 = wf(t, p.a.start, dur);
  const s1 = Math.max(s0 + 10, wf(t, p.a.end, dur));
  const n = p.left.rows.length;
  const side = (col: typeof p.left, x: number) => (
    <Panel x={x} y={210} w={440} h={900}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 70, color: col.color}}>{col.name}</div>
      {col.rows.map((r, i) => {
        const at = s0 + ((s1 - s0) * i) / Math.max(1, n - 1);
        const o = interpolate(f, [at, at + 8], [0, 1], clamp);
        return (
          <div key={r[0]} style={{position: 'absolute', left: 30, right: 30, top: 140 + i * 190, opacity: o, transform: `translateY(${(1 - o) * 30}px)`}}>
            <div style={{fontFamily: MONO, fontSize: 26, color: C.dim, letterSpacing: 1}}>{r[0]}</div>
            <div style={{fontFamily: HEAD, fontWeight: 800, fontSize: 56, color: C.white, lineHeight: 1.1}}>{r[1]}</div>
          </div>
        );
      })}
    </Panel>
  );
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={s0} name="whoosh" volume={0.4} />
      {side(p.left, 60)}
      {side(p.right, 580)}
      <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 56, color: C.tape, opacity: f >= s0 ? 1 : 0}}>VS</div>
      {p.stamp && <Stamp at={wf(t, p.stamp.a, dur)} text={p.stamp.text} color={p.stamp.color} size={p.stamp.size ?? 84} style={{left: 160, top: 1200}} />}
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ DIAGNOSIS
export const diag = (p: {
  title: string;
  struck: string;
  circled: string;
  rows: {k: string; v: string; good: boolean}[];
  a: {struck: A; circled: A; r1: A; r2: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const bukan = wf(t, p.a.struck, dur);
  const rest = wf(t, p.a.circled, dur);
  const r1 = wf(t, p.a.r1, dur);
  const r2 = wf(t, p.a.r2, dur);
  const strike = interpolate(f, [bukan, bukan + 10], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const circle = interpolate(f, [rest, rest + 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const needle = interpolate(f, [rest, rest + 30], [-75, 25], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const jogX = interpolate(f, [r2, dur], [760, 1160], clamp);
  const rad = ((needle - 90) * Math.PI) / 180;
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={bukan} name="pen" volume={0.5} />
      <Sfx at={rest} name="pen" volume={0.5} />
      <Sfx at={rest + 20} name="ding" volume={0.4} />
      <div style={{position: 'absolute', left: 120, top: 220, width: 600, height: 640, background: C.paper, borderRadius: 30, padding: '70px 44px 30px', boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: 220, top: -24, width: 160, height: 60, borderRadius: 14, background: C.dim}} />
        <div style={{fontFamily: MONO, fontSize: 30, color: '#4A5571', letterSpacing: 3}}>{p.title}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, marginTop: 34}}>
          <div style={{position: 'relative', fontFamily: BODY, fontWeight: 700, fontSize: 40, color: C.ink}}>
            <span style={{position: 'relative'}}>
              {p.struck}
              <span style={{position: 'absolute', left: -6, top: '52%', height: 7, width: `${strike * 104}%`, background: C.siren, borderRadius: 4}} />
            </span>
          </div>
          <div style={{position: 'relative', fontFamily: BODY, fontWeight: 700, fontSize: 40, color: C.ink}}>
            <span style={{position: 'relative'}}>
              {p.circled}
              <svg width={300} height={90} style={{position: 'absolute', left: -34, top: -18}} aria-hidden>
                <ellipse cx={150} cy={45} rx={142} ry={38} fill="none" stroke={C.siren} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circle} />
              </svg>
            </span>
          </div>
          {p.rows.map((r, i) => (
            <div key={r.k} style={{display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontWeight: 700, fontSize: 40, color: C.ink}}>
              <span>{r.k}</span>
              <span style={{color: r.good ? '#1E9E5A' : '#B26B00', opacity: f >= (i === 0 ? r1 : r2) ? 1 : 0}}>{r.v}</span>
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
      <Mascot x={jogX} y={360} scale={0.7} mood="ok" signal={0.6} tilt={f >= r2 ? 8 : 0} />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ CTA polling + disclaimer
export const cta = (p: {
  pill: string;
  question: string;
  opts: [string, string];
  disclaimer: string;
  a: {intro: A; pick: A; write: A};
}): React.FC<SceneProps> => ({t, dur}) => {
  const f = useCurrentFrame();
  const giliran = wf(t, p.a.intro, dur);
  const beli = wf(t, p.a.pick, dur);
  const tulis = wf(t, p.a.write, dur);
  const sign = usePop(giliran + 6);
  const swing = f >= beli && f < tulis ? Math.sin((f - beli) / 6) : 0;
  const cx = f < tulis ? 540 + swing * 200 : interpolate(f, [tulis, tulis + 10], [540 + swing * 200, 540], clamp);
  const pick = f >= beli && f < tulis ? (swing < 0 ? 0 : 1) : -1;
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={giliran} name="pop" volume={0.6} />
      <Sfx at={tulis} name="pop" volume={0.5} />
      <Pill text={p.pill} at={giliran} top={230} size={76} />
      <Poll at={giliran + 4} top={420} question={p.question} options={[{label: p.opts[0], color: C.scan}, {label: p.opts[1], color: C.siren}]} pick={pick} />
      <Cursor x={cx} y={600} at={giliran + 10} />
      {f >= tulis + 8 && <div style={{position: 'absolute', left: 560, top: 700, fontFamily: HEAD, fontWeight: 800, fontSize: 90, color: C.tape}}>?</div>}
      <Mascot x={-40} y={760} scale={0.85} mood="happy" tilt={10} signal={0.8} />
      <div
        style={{
          position: 'absolute',
          left: 280,
          top: 960,
          background: C.paper,
          color: C.ink,
          fontFamily: BODY,
          fontWeight: 800,
          fontSize: 46,
          padding: '22px 34px',
          borderRadius: 18,
          border: `6px solid ${C.tape}`,
          transform: `rotate(-4deg) scale(${interpolate(sign, [0, 1], [0.3, 1])})`,
          opacity: interpolate(sign, [0, 0.2], [0, 1], clamp),
        }}
      >
        kamu yang mutusin
      </div>
      <div style={{position: 'absolute', left: 90, right: 130, top: 1230, textAlign: 'center', fontFamily: MONO, fontSize: 22, lineHeight: 1.45, color: C.dim}}>{p.disclaimer}</div>
    </AbsoluteFill>
  );
};
