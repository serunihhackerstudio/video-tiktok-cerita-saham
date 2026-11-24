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
  {id: "s1", seconds: 8, lead: 0, tail: 0}, // hook dividen Rp114
  {id: "s2", seconds: 12, lead: 0, tail: 0}, // laba & total dividen
  {id: "s3", seconds: 10, lead: 0, tail: 0}, // imbal hasil 4,3%
  {id: "s4", seconds: 13, lead: 0, tail: 0}, // cum/ex-date
  {id: "s5", seconds: 12, lead: 0, tail: 0}, // harga turun teori
  {id: "s6", seconds: 9, lead: 0, tail: 0}, // pindah kantong
  {id: "s7", seconds: 12, lead: 0, tail: 0}, // payout 75->45
  {id: "s8", seconds: 9, lead: 0, tail: 0}, // cek dulu
  {id: "s9", seconds: 7, lead: 0, tail: 0}, // CTA dividen/harga
];

// Thumbnail = komposisi "Thumbnail" (statis, 2D), frame berapa pun hasilnya sama.
export const THUMB = {
  frame: 0,
};
