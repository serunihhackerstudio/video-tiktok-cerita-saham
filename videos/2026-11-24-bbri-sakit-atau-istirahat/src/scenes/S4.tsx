// S4: modal tebal (CAR 23%) dan efisiensi (CIR 42,8% -> 40%).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp} from '../components';
import {Card, GridBg, Mascot, Panel, idNum, useCount} from '../kit';
import {C, HEAD, MONO} from '../theme';
import {SceneProps, wordFrame} from '../timing';

export const S4: React.FC<SceneProps> = ({t, dur}) => {
  const f = useCurrentFrame();
  const modal = wordFrame(t, 'modalnya', 0.05, dur);
  const car = wordFrame(t, 'dua', 0.25, dur);
  const irit = wordFrame(t, 'irit', 0.62, dur);
  const fill = interpolate(f, [car, car + 36], [0, 0.23], clamp);
  const cir = useCount(irit, irit + 36, 42.8, 40);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={modal} name="pop" volume={0.4} />
      <Sfx at={car} name="tick" volume={0.4} />
      <Sfx at={irit} name="ding" volume={0.4} />

      <Panel x={60} y={210} w={470} h={680}>
        <div style={{position: 'absolute', left: 30, top: 24, fontFamily: MONO, fontSize: 28, color: C.dim}}>MODAL (CAR)</div>
        <div style={{position: 'absolute', left: 150, top: 100, width: 170, height: 420, border: `8px solid ${C.white}`, borderRadius: 24, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${fill * 100 * 3.4}%`, background: C.scan}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 84, color: C.scan}}>
          {idNum(fill * 100, 0)}%
        </div>
      </Panel>
      <Card x={560} y={210} w={460} at={irit - 6} label="BIAYA / PENDAPATAN" value={`${idNum(cir)}%`} color={C.tape} sub="CIR: makin kecil makin irit" valueSize={92} />
      <Mascot x={600} y={620} scale={0.8} mood={f >= irit ? 'happy' : 'ok'} signal={0.8} />
    </AbsoluteFill>
  );
};
