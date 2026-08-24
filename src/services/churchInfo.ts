import churchInfoData from '../data/churchInfo.json';
import type { ChurchInfo } from '../types';

// MOCK IMPLEMENTATION
// When the backend is ready, replace the body of this function with a real
// fetch call, e.g.:
//   const res = await fetch(`${API_BASE}/church-info`);
//   return res.json();
// The rest of the app calls getChurchInfo() and never needs to change.
export async function getChurchInfo(): Promise<ChurchInfo> {
  return Promise.resolve(churchInfoData as ChurchInfo);
}
