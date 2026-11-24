// S3: kredit tumbuh. Tumpukan balok naik, kartu Rp1.647 T, stempel +14,5%.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, Stamp, clamp} from '../components';
import {Card, GridBg, Mascot} from '../kit';
import {C} from '../theme';
import {SceneProps, wordFrame} from '../timing';

export const S3: React.FC<SceneProps> = ({t, dur}) => {
  const f = useCurrentFrame();
  const jalan = wordFrame(t, 'jalan', 0.15, dur);
  const total = wordFrame(t, 'totalnya', 0.3, dur);
  const pct = wordFrame(t, 'empat', 0.75, dur);
  const blocks = Math.round(interpolate(f, [jalan, total + 60], [2, 9], clamp));
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={jalan} name="whoosh" volume={0.4} />
      <Sfx at={total} name="tick" volume={0.4} />
      <Sfx at={pct} name="stamp" volume={0.7} />

      <Card x={110} y={220} w={860} at={total} label="TOTAL KREDIT · SEP 2026" value="Rp1.647 T" color={C.white} sub="tumbuh sehat, bukan seret" />

      <div style={{position: 'absolute', left: 150, top: 560, width: 420, height: 700}}>
        {Array.from({length: blocks}).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: i % 2 ? 24 : 0, bottom: i * 66, width: 330, height: 56, borderRadius: 12, background: i % 2 ? C.scan : '#1FA866', border: '4px solid #0F7A48', boxSizing: 'border-box'}} />
        ))}
      </div>

      <Mascot x={640} y={700} scale={0.8} mood="happy" signal={0.8} />
      <Stamp at={pct} text="+14,5%" color={C.scan} size={96} style={{left: 600, top: 1220}} />
    </AbsoluteFill>
  );
};
