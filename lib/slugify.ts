/**
 * Slugify simples e estável — usado tanto em server (geração de anchors)
 * quanto em client (TOC scroll target). Fica em lib/ pra não ficar
 * preso a um "use client".
 */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
