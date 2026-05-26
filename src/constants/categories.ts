/** Categoría curada por Barto; no entra en el sorteo de preguntas aleatorias. */
export const BARTO_SELECTION_CATEGORY = "Barto's Selection";

export const BARTO_UNLOCK_CODE = '0830';

export const BARTO_UNLOCK_STORAGE_KEY = 'barto-selection-unlocked';

export function isExcludedFromRandom(category: string): boolean {
  return category === BARTO_SELECTION_CATEGORY;
}

export function readBartoUnlockedFromStorage(): boolean {
  try {
    return sessionStorage.getItem(BARTO_UNLOCK_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function persistBartoUnlocked(): void {
  try {
    sessionStorage.setItem(BARTO_UNLOCK_STORAGE_KEY, 'true');
  } catch {
    /* sessionStorage no disponible */
  }
}
