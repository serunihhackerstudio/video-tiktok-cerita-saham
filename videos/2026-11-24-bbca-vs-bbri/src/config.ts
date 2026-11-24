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
  {id: "s1", seconds: 10, lead: 0, tail: 0}, // asing
  {id: "s2", seconds: 12, lead: 0, tail: 0}, // laba
  {id: "s3", seconds: 12, lead: 0, tail: 0}, // kredit
  {id: "s4", seconds: 11, lead: 0, tail: 0}, // NPL NIM
  {id: "s5", seconds: 11, lead: 0, tail: 0}, // arah NIM
  {id: "s6", seconds: 9, lead: 0, tail: 0}, // asing BBCA
  {id: "s7", seconds: 10, lead: 0, tail: 0}, // analis
  {id: "s8", seconds: 11, lead: 0, tail: 0}, // rapor
  {id: "s9", seconds: 8, lead: 0, tail: 0}, // cta
];

// Thumbnail = komposisi "Thumbnail" (statis, 2D), frame berapa pun hasilnya sama.
export const THUMB = {
  frame: 0,
};
