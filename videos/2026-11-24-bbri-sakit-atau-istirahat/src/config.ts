// ====== DIISI PER VIDEO ======
// id scene harus sama dengan tts/naskah.json dan src/scenes/index.ts
export const VIDEO = {
  compositionId: "Main",
  brand: "serunihstudio",
  label: "Edukasi Saham",
};

export type SceneConfig = {
  id: string;
  seconds: number; // durasi naskah, dipakai kalau audio TTS belum ada
  lead: number; // jeda (dtk) sebelum narasi mulai
  tail: number; // jeda (dtk) setelah narasi selesai
  captions?: boolean; // false = scene menggambar teksnya sendiri
};

export const SCENES: SceneConfig[] = [
  {id: "s1", seconds: 6, lead: 0, tail: 0}, // hook: saham -17,6%, poll sakit/istirahat
  {id: "s2", seconds: 8, lead: 0, tail: 0}, // laba +16,8%
  {id: "s3", seconds: 9, lead: 0, tail: 0}, // kredit +14,5%
  {id: "s4", seconds: 11, lead: 0, tail: 0}, // modal CAR & CIR
  {id: "s5", seconds: 11, lead: 0, tail: 0}, // NIM turun
  {id: "s6", seconds: 10, lead: 0, tail: 0}, // asing jual
  {id: "s7", seconds: 9, lead: 0, tail: 0}, // dividen & payout
  {id: "s8", seconds: 9, lead: 0, tail: 0}, // diagnosis istirahat
  {id: "s9", seconds: 7, lead: 0, tail: 0}, // CTA tahan/lepas + disclaimer
];

// Thumbnail = komposisi "Thumbnail" (statis, 2D), frame berapa pun hasilnya sama.
export const THUMB = {
  frame: 0,
};
