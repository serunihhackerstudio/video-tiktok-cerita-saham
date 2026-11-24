// S6: dana asing keluar: sosok "ASING" berjalan keluar membawa koin, harga tertekan.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, Stamp, clamp} from '../components';
import {GridBg, Pill} from '../kit';
import {C, HEAD, MONO} from '../theme';
import {SceneProps, wordFrame} from '../timing';

export const S6: React.FC<SceneProps> = ({t, dur}) => {
  const f = useCurrentFrame();
  const asing = wordFrame(t, 'asing', 0.15, dur);
  const jual = wordFrame(t, 'sasaran', 0.4, dur);
  const tekan = wordFrame(t, 'tertekan', 0.68, dur);
  const walk = interpolate(f, [asing, asing + 60], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={asing} name="whoosh" volume={0.4} />
      <Sfx at={jual} name="coin" volume={0.5} />
      <Sfx at={tekan} name="hit" volume={0.5} />

      <div style={{position: 'absolute', left: 700, top: 420, width: 260, height: 480, background: C.steel, border: `8px solid ${C.dim}`, borderRadius: '30px 30px 0 0'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: -64, textAlign: 'center', fontFamily: MONO, fontSize: 36, color: C.tape, letterSpacing: 4}}>KELUAR</div>
      </div>
      {[0, 1, 2].map((i) => {
        const x = 40 + i * 120 + walk * (520 - i * 40);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: 640 + (i % 2) * 40, width: 110}}>
            <div style={{width: 70, height: 70, borderRadius: '50%', background: C.dim, margin: '0 auto'}} />
            <div style={{width: 100, height: 130, borderRadius: 30, background: '#3B5B9A', marginTop: 6, textAlign: 'center', fontFamily: MONO, fontSize: 18, color: C.white, paddingTop: 10, boxSizing: 'border-box'}}>ASING</div>
            <div style={{position: 'absolute', right: -20, top: 110, width: 44, height: 44, borderRadius: '50%', background: C.tape, border: '5px solid #C99A1E', boxSizing: 'border-box'}} />
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 120, top: 940, fontFamily: HEAD, fontWeight: 800, fontSize: 70, color: C.siren, opacity: f >= jual ? 1 : 0}}>JUAL BERSIH ➜</div>
      <Pill text="Harga ikut tertekan" at={tekan} top={1040} bg={C.siren} color={C.white} />
      <Stamp at={tekan + 10} text="LABA TUMBUH" color={C.scan} size={46} style={{left: 200, top: 1190}} />
    </AbsoluteFill>
  );
};
