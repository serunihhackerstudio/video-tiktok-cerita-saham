// S5: masalah utama: NIM turun 6,53% -> 6,16%.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {Sfx, Stamp, shake} from '../components';
import {Card, GridBg, Mascot, Panel, Pill, PriceLine, idNum, useCount} from '../kit';
import {C} from '../theme';
import {SceneProps, wordFrame} from '../timing';

export const S5: React.FC<SceneProps> = ({t, dur}) => {
  const f = useCurrentFrame();
  const masalah = wordFrame(t, 'masalahnya', 0.05, dur);
  const nim = wordFrame(t, 'enam', 0.3, dur);
  const dana = wordFrame(t, 'biaya', 0.72, dur);
  const v = useCount(nim, nim + 40, 6.53, 6.16);
  const sh = shake(f, [nim + 40], 8);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <GridBg />
      <Sfx at={masalah} name="alarm" volume={0.3} />
      <Sfx at={nim + 30} name="hit" volume={0.5} />
      <Sfx at={dana} name="pop" volume={0.4} />
      <AbsoluteFill style={{transform: `translate(${sh.x}px, ${sh.y}px)`}}>
        <Card x={110} y={210} w={860} at={masalah + 6} label="NIM (MARGIN BUNGA BERSIH) · Q3" value={`${idNum(v, 2)}%`} color={C.siren} sub="setahun lalu: 6,53%" />
        <Panel x={110} y={520} w={860} h={420}>
          <PriceLine x={70} y={70} w={720} h={250} data={[6.53, 6.5, 6.44, 6.36, 6.28, 6.2, 6.16]} a={nim} b={nim + 40} color={C.siren} />
        </Panel>
        <Pill text="Biaya dana naik" at={dana} top={990} />
        <Mascot x={730} y={800} scale={0.5} mood="meh" signal={0.3} />
      </AbsoluteFill>
      <Stamp at={nim + 40} text="MARGIN ↓" color={C.siren} size={90} style={{left: 70, top: 1190}} />
    </AbsoluteFill>
  );
};
