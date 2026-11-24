import React from "react";
import {C} from "../theme";
import {SceneProps} from "../timing";
import {bars, bigNumber, cta, steps, versus} from "../gen";

const BLUE = "#4C8DFF"; // warna BBCA
// id harus sama dengan src/config.ts dan tts/naskah.json
export const SCENE_COMPONENTS: Record<string, React.FC<SceneProps>> = {
  s1: bigNumber({
    label: "JUAL BERSIH ASING · 4 BANK BESAR",
    to: 67.2,
    dec: 1,
    prefix: "Rp",
    suffix: " T",
    sub: "BBCA, BBRI, BMRI, BBNI · s.d. Okt 2026",
    color: C.siren,
    mood: "meh",
    pill: "Siapa yang lebih kuat?",
    a: {num: ["asing", 0.6], pill: ["jadi", 0.85]},
  }),
  s2: bars({
    label: "LABA BERSIH JAN–SEP 2026",
    to: 48.2,
    prefix: "Rp",
    suffix: " T",
    sub: "BBRI +16,8% · BBCA +4,2%",
    bars: [
      {k: "BBRI", v: 48.2, color: C.tape},
      {k: "BBCA", v: 45.2, color: BLUE},
    ],
    max: 52,
    note: "Rp triliun, skala dari nol",
    a: {num: ["empat", 0.2], sub: ["naik", 0.55]},
  }),
  s3: bars({
    label: "TOTAL KREDIT · SEP 2026",
    to: 1647,
    dec: 0,
    prefix: "Rp",
    suffix: " T",
    sub: "BBRI +14,5% · BBCA +12,6%",
    bars: [
      {k: "BBRI", v: 1647, color: C.tape},
      {k: "BBCA", v: 1063, color: BLUE},
    ],
    max: 1800,
    note: "Rp triliun, skala dari nol",
    a: {num: ["seribu", 0.2], sub: ["tumbuh", 0.45]},
  }),
  s4: versus({
    left: {name: "BBRI", color: C.tape, rows: [["NPL", "2,9%"], ["NIM Q3 2026", "6,16%"]]},
    right: {name: "BBCA", color: BLUE, rows: [["NPL", "1,8%"], ["NIM Q3 2026", "5,6%"]]},
    a: {start: ["kualitas", 0.1], end: ["margin", 0.6]},
  }),
  s5: steps({
    title: "ARAH MARGIN (NIM)",
    chips: [
      {t: "BBRI: 6,53% → 6,16%", sub: "Q3 2025 → Q3 2026 · menyempit", color: C.siren, a: ["bbri", 0.3]},
      {t: "BBCA: 5,3% → 5,6%", sub: "Q2 → Q3 2026 · membaik", color: C.scan, a: ["membaik", 0.7]},
    ],
    stamp: {text: "BASIS BEDA", color: C.tape, size: 70, a: ["arahnya", 0.1]},
  }),
  s6: bigNumber({
    label: "JUAL BERSIH ASING DI BBCA",
    to: 31.34,
    dec: 2,
    prefix: "Rp",
    suffix: " T",
    sub: "s.d. 4 Juni 2026 · laba masih tumbuh",
    color: C.siren,
    mood: "meh",
    stamp: {text: "LABA MASIH TUMBUH", color: C.scan, size: 62},
    a: {num: ["tiga", 0.2], stamp: ["padahal", 0.75]},
  }),
  s7: steps({
    title: "MENURUT SALAH SATU ANALIS",
    chips: [
      {t: "Paling likuid di IHSG", sub: "BBCA & BBRI", color: C.white, a: ["paling", 0.35]},
      {t: "Pintu keluar pertama", sub: "saat asing menarik dana", color: C.siren, a: ["pintu", 0.65]},
      {t: "Bukan soal fundamental", sub: "pandangan analis, bukan fakta mutlak", color: C.tape, a: ["fundamental", 0.2]},
    ],
  }),
  s8: steps({
    title: "RAPOR BBRI vs BBCA",
    chips: [
      {t: "BBRI: laba & kredit lebih kencang", sub: "+16,8% laba · +14,5% kredit", color: C.tape, a: ["bbri", 0.2]},
      {t: "BBCA: NPL lebih rendah", sub: "1,8% vs 2,9%", color: BLUE, a: ["bbca", 0.5]},
      {t: "Sesuaikan profil risikomu", sub: "tidak ada jawaban tunggal", color: C.white, a: ["pilihannya", 0.8]},
    ],
  }),
  s9: cta({
    pill: "BBCA atau BBRI?",
    question: "Pilihanmu yang mana?",
    opts: ["BBCA", "BBRI"],
    disclaimer: "Data: laporan Q3 2026 BCA & BRI via Bisnis.com, Katadata, Kontan, Rmol, BCA Sekuritas. Bukan ajakan membeli atau menjual.",
    a: {intro: ["giliran", 0.08], pick: ["bbca", 0.4], write: ["tulis", 0.75]},
  }),
};
