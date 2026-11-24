// S7: dividen TB2025 Rp345,98/lembar, payout 91,19%; proyeksi ~70% (belum pasti).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, Stamp, clamp} from '../components';
import {Card, GridBg, Panel} from '../kit';
import {C, HEAD, MONO} from '../theme';
import {SceneProps, wordFrame} from '../timing';

export const S7: React.FC<SceneProps> = ({t, dur}) => {
  const f = useCurrentFrame();
  const nominal = wordFrame(t, 'tiga', 0.1, dur);
  const payout = wordFrame(t, 'sembilan', 0.4, dur);
  const proyeksi = wordFrame(t, 'proyeksi', 0.6, dur);
  const belum = wordFrame(t, 'belum', 0.92, dur);
  const w1 = interpolate(f, [payout, payout + 30], [0, 0.9119], clamp);
  const w2 = interpolate(f, [proyeksi + 8, proyeksi + 36], [0, 0.7], clamp);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={nominal} name="coin" volume={0.5} />
      <Sfx at={payout} name="tick" volume={0.4} />
      <Sfx at={proyeksi} name="pop" volume={0.4} />
      <Sfx at={belum} name="stamp" volume={0.6} />

      <Card x={110} y={210} w={860} at={nominal} label="DIVIDEN TAHUN BUKU 2025" value="Rp345,98 / lembar" color={C.tape} valueSize={70} />
      <Panel x={110} y={540} w={860} h={560}>
        <div style={{position: 'absolute', left: 36, top: 30, fontFamily: MONO, fontSize: 28, color: C.dim}}>RASIO DIVIDEN (PAYOUT)</div>
        <div style={{position: 'absolute', left: 36, top: 100, width: 788, height: 84, background: '#232C46', borderRadius: 20}}>
          <div style={{width: `${w1 * 100}%`, height: '100%', background: C.scan, borderRadius: 20}} />
        </div>
        <div style={{position: 'absolute', left: 36, top: 196, fontFamily: HEAD, fontWeight: 800, fontSize: 48, color: C.white}}>2025: 91,19%</div>
        {f >= proyeksi && (
          <>
            <div style={{position: 'absolute', left: 36, top: 300, width: 788, height: 84, background: '#232C46', borderRadius: 20}}>
              <div style={{width: `${w2 * 100}%`, height: '100%', border: `6px dashed ${C.tape}`, borderRadius: 20, boxSizing: 'border-box'}} />
            </div>
            <div style={{position: 'absolute', left: 36, top: 396, fontFamily: HEAD, fontWeight: 800, fontSize: 48, color: C.tape}}>proyeksi analis: ±70%</div>
          </>
        )}
      </Panel>
      <Stamp at={belum} text="BELUM PASTI" color={C.siren} size={96} style={{left: 190, top: 1180}} />
    </AbsoluteFill>
  );
};
