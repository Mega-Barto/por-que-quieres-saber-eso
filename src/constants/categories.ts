/** Categoría curada por Barto; no entra en el sorteo de preguntas aleatorias. */
export const BARTO_SELECTION_CATEGORY = "Barto's Selection";

export function isExcludedFromRandom(category: string): boolean {
  return category === BARTO_SELECTION_CATEGORY;
}
