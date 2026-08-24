import sermonsData from '../data/sermons.json';
import shortsData from '../data/shorts.json';
import type { Sermon, ShortVideo } from '../types';

// MOCK IMPLEMENTATION — swap for `fetch(`${API_BASE}/sermons`)` later.
export async function getSermons(): Promise<Sermon[]> {
  const sorted = [...sermonsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return Promise.resolve(sorted as Sermon[]);
}

export async function getSermonById(id: string): Promise<Sermon | undefined> {
  const sermons = await getSermons();
  return sermons.find((s) => s.id === id);
}

export async function getShorts(): Promise<ShortVideo[]> {
  return Promise.resolve(shortsData as ShortVideo[]);
}
