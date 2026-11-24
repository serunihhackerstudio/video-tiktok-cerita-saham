import React from "react";
import {C} from "../theme";
import {SceneProps} from "../timing";
import {bars, bigNumber, cta, steps} from "../gen";

// id harus sama dengan src/config.ts dan tts/naskah.json
export const SCENE_COMPONENTS: Record<string, React.FC<SceneProps>> = {
  s1: bigNumber({
    label: "DIVIDEN PER SAHAM · PTBA",
    to: 114,
    prefix: "Rp",
    sub: "kedengarannya untung, kan?",
    color: C.tape,
    mood: "happy",
    pill: "Tapi harga bisa ikut turun?",
    a: {num: ["seratus", 0.1], pill: ["kok", 0.85]},
  }),
  s2: bars({
    label: "TOTAL DIVIDEN TB2025",
    to: 1.3,
    prefix: "Rp",
    suffix: " T",
    sub: "45% dari laba bersih",
    bars: [
      {k: "Laba", v: 2.93, color: C.scan},
      {k: "Dividen", v: 1.32, color: C.tape},
    ],
    max: 3.2,
    note: "Rp triliun, skala dari nol",
    a: {num: ["empat", 0.5], sub: ["satu", 0.85]},
  }),
  s3: bigNumber({
    label: "IMBAL HASIL DIVIDEN",
    to: 4.33,
    dec: 2,
    suffix: "%",
    sub: "Rp114 ÷ Rp2.630 (penutupan 11 Jun)",
    color: C.scan,
    mood: "ok",
    pill: "Rp114 per saham",
    a: {num: ["imbal", 0.75], pill: ["seratus", 0.1]},
  }),
  s4: steps({
    title: "JADWAL DIVIDEN PTBA 2026",
    chips: [
      {t: "CUM DATE · 22 Juni", sub: "beli di sini = berhak dividen", color: C.scan, a: ["beli", 0.25]},
      {t: "EX-DATE · 23 Juni", sub: "beli di sini = tidak dapat lagi", color: C.siren, a: ["mulai", 0.5]},
      {t: "CAIR · 10 Juli", sub: "dividen masuk rekening", color: C.tape, a: ["cair", 0.9]},
    ],
  }),
  s5: steps({
    title: "SECARA TEORI, DI HARI EX-DATE",
    chips: [
      {t: "Uang keluar dari kas", sub: "dibagikan ke pemegang saham", color: C.white, a: ["uangnya", 0.1]},
      {t: "Harga turun ± Rp114", sub: "sebesar dividennya", color: C.siren, a: ["turun", 0.45]},
      {t: "Rp2.630 → ±Rp2.516", sub: "2.630 − 114 = 2.516", color: C.tape, a: ["jadi", 0.85]},
    ],
    stamp: {text: "SECARA TEORI", color: C.tape, size: 80, a: ["teori", 0.3]},
  }),
  s6: steps({
    title: "DIVIDEN = PINDAH KANTONG",
    chips: [
      {t: "Nilai saham −Rp114", sub: "harga turun", color: C.siren, a: ["gratis", 0.2]},
      {t: "Rekening +Rp114", sub: "dividen cair", color: C.scan, a: ["pindah", 0.45]},
      {t: "Total ≈ sama", sub: "secara teori", color: C.white, a: ["total", 0.8]},
    ],
  }),
  s7: bars({
    label: "RASIO DIVIDEN (PAYOUT)",
    to: 45,
    dec: 0,
    suffix: "%",
    sub: "turun 30 poin dari 75%",
    bars: [
      {k: "TB2024", v: 75, color: C.dim},
      {k: "TB2025", v: 45, color: C.siren},
    ],
    max: 80,
    note: "% dari laba bersih",
    mood: "meh",
    a: {num: ["tujuh", 0.4], sub: ["tinggal", 0.85]},
  }),
  s8: steps({
    title: "CEK DULU SEBELUM MEMBELI",
    chips: [
      {t: "Laba: tumbuh atau turun?", color: C.scan, a: ["labanya", 0.4]},
      {t: "Kas: cukup tebal?", color: C.tape, a: ["kasnya", 0.62]},
      {t: "Dividen: konsisten?", color: C.white, a: ["konsisten", 0.88]},
    ],
    stamp: {text: "BUKAN SEGALANYA", color: C.siren, size: 76, a: ["tunggal", 0.35]},
  }),
  s9: cta({
    pill: "Dividen atau harga naik?",
    question: "Kamu lebih suka yang mana?",
    opts: ["DIVIDEN", "HARGA NAIK"],
    disclaimer: "Data: Bisnis.com, Kontan (RUPST PTBA 11 Jun 2026). Harga Rp2.630 = penutupan 11 Jun. Ilustrasi teori, bukan ajakan membeli atau menjual.",
    a: {intro: ["giliran", 0.08], pick: ["dividen", 0.4], write: ["tulis", 0.75]},
  }),
};
