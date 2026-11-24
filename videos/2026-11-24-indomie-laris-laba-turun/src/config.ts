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
  {id: "s1", seconds: 10, lead: 0, tail: 0}, // hook
  {id: "s2", seconds: 12, lead: 0, tail: 0}, // penjualan
  {id: "s3", seconds: 12, lead: 0, tail: 0}, // laba
  {id: "s4", seconds: 11, lead: 0, tail: 0}, // biaya
  {id: "s5", seconds: 11, lead: 0, tail: 0}, // INDF
  {id: "s6", seconds: 9, lead: 0, tail: 0}, // laba usaha
  {id: "s7", seconds: 10, lead: 0, tail: 0}, // kurs
  {id: "s8", seconds: 11, lead: 0, tail: 0}, // perhatikan
  {id: "s9", seconds: 8, lead: 0, tail: 0}, // cta
];

// Thumbnail = komposisi "Thumbnail" (statis, 2D), frame berapa pun hasilnya sama.
export const THUMB = {
  frame: 0,
};
