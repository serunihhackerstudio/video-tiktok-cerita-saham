import React from "react";
import {C} from "../theme";
import {SceneProps} from "../timing";
import {bars, bigNumber, cta, steps} from "../gen";

// id harus sama dengan src/config.ts dan tts/naskah.json
export const SCENE_COMPONENTS: Record<string, React.FC<SceneProps>> = {
  s1: bigNumber({
    label: "PENJUALAN ICBP · JAN–SEP 2026",
    to: 15,
    prefix: "+",
    suffix: "%",
    sub: "tapi laba bersih turun",
    color: C.scan,
    mood: "happy",
    pill: "Kok bisa?",
    a: {num: ["lima", 0.4], pill: ["kok", 0.9]},
  }),
  s2: bars({
    label: "PENJUALAN ICBP · 9 BULAN",
    to: 64.45,
    dec: 2,
    prefix: "Rp",
    suffix: " T",
    sub: "+15% vs 2025",
    bars: [
      {k: "2025", v: 56.2, color: C.dim},
      {k: "2026", v: 64.45, color: C.scan},
    ],
    max: 70,
    note: "Rp triliun, skala dari nol",
    mood: "happy",
    a: {num: ["enam", 0.3], sub: ["benar", 0.8]},
  }),
  s3: bars({
    label: "LABA BERSIH ICBP · 9 BULAN",
    to: 6.16,
    dec: 2,
    prefix: "Rp",
    suffix: " T",
    sub: "turun ±13% vs 2025",
    bars: [
      {k: "2025", v: 7.11, color: C.dim},
      {k: "2026", v: 6.16, color: C.siren},
    ],
    max: 8,
    note: "Rp triliun, skala dari nol",
    mood: "meh",
    a: {num: ["enam", 0.15], sub: ["turun", 0.8]},
  }),
  s4: steps({
    title: "BIANG KEROK: BIAYA NAIK",
    chips: [
      {t: "Bahan baku naik", sub: "biaya produksi", color: C.siren, a: ["bahan", 0.25]},
      {t: "Kemasan & logistik naik", sub: "ongkos distribusi", color: C.siren, a: ["kemasan", 0.5]},
      {t: "Beban keuangan naik", sub: "bunga & pendanaan", color: C.tape, a: ["beban", 0.8]},
    ],
  }),
  s5: bigNumber({
    label: "PENJUALAN INDF · JAN–SEP 2026",
    to: 101.49,
    dec: 2,
    prefix: "Rp",
    suffix: " T",
    sub: "+12% vs 2025",
    color: C.white,
    mood: "ok",
    pill: "Induknya: INDF",
    a: {num: ["seratus", 0.6], pill: ["induknya", 0.2]},
  }),
  s6: bigNumber({
    label: "LABA USAHA INDF",
    to: 15,
    prefix: "+",
    suffix: "%",
    sub: "sebelum biaya keuangan & kurs",
    color: C.scan,
    mood: "happy",
    stamp: {text: "BISNIS INTI JALAN", color: C.scan, size: 66},
    a: {num: ["lima", 0.4], stamp: ["bisnis", 0.7]},
  }),
  s7: steps({
    title: "KENAPA LABA BERSIH TERTAHAN?",
    chips: [
      {t: "Laba usaha naik", sub: "bisnis inti sehat", color: C.scan, a: ["tapi", 0.1]},
      {t: "Rugi selisih kurs", sub: "belum terealisasi · dari pendanaan", color: C.siren, a: ["rugi", 0.4]},
      {t: "Laba bersih tertahan", sub: "dampak ke angka akhir", color: C.tape, a: ["tertahan", 0.2]},
    ],
  }),
  s8: steps({
    title: "YANG PERLU DIPERHATIKAN",
    chips: [
      {t: "Margin", sub: "laba per rupiah penjualan", color: C.scan, a: ["margin", 0.5]},
      {t: "Biaya bahan baku", sub: "terigu, minyak, kemasan", color: C.tape, a: ["bahan", 0.7]},
      {t: "Kurs rupiah/dolar", sub: "utang valas & bahan impor", color: C.white, a: ["kurs", 0.9]},
    ],
    stamp: {text: "LARIS ≠ UNTUNG", color: C.siren, size: 84, a: ["laris", 0.2]},
  }),
  s9: cta({
    pill: "Tahan atau hindari?",
    question: "Saham konsumer menurutmu?",
    opts: ["TAHAN", "HINDARI"],
    disclaimer: "Data: laporan Q3 2026 ICBP & INDF via Fortune IDN, Industry.co.id, Republika, Liputan6. Bukan ajakan membeli atau menjual.",
    a: {intro: ["giliran", 0.08], pick: ["tahan", 0.5], write: ["tulis", 0.8]},
  }),
};
