import eventsData from '../data/events.json';
import type { EventItem } from '../types';

// MOCK IMPLEMENTATION — swap for `fetch(`${API_BASE}/events`)` later.
export async function getEvents(): Promise<EventItem[]> {
  const sorted = [...eventsData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return Promise.resolve(sorted as EventItem[]);
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  const events = await getEvents();
  return events.find((e) => e.id === id);
}
