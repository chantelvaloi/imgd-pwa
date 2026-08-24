import liveData from '../data/live.json';
import updatesData from '../data/updates.json';
import type { LiveStatus, UpdatePost } from '../types';

// MOCK IMPLEMENTATION — swap for `fetch(`${API_BASE}/live`)` later.
// In production this would likely be polled or pushed via websocket.
export async function getLiveStatus(): Promise<LiveStatus> {
  return Promise.resolve(liveData as LiveStatus);
}

export async function getUpdates(): Promise<UpdatePost[]> {
  const sorted = [...updatesData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return Promise.resolve(sorted as UpdatePost[]);
}
