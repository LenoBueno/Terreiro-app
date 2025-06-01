import { Event } from '@/types';

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Celebração Especial',
    description: 'Uma celebração especial para todos os membros do terreiro.',
    startDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    endDate: new Date(Date.now() + 86400000 * 3 + 7200000).toISOString(), // 3 days from now + 2 hours
    location: 'Terreiro Principal',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    createdBy: '1',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Sessão de Desenvolvimento',
    description: 'Sessão dedicada ao desenvolvimento mediúnico.',
    startDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    endDate: new Date(Date.now() + 86400000 * 7 + 7200000).toISOString(), // 7 days from now + 2 hours
    location: 'Terreiro Principal - Sala 2',
    imageUrl: 'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg',
    createdBy: '1',
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Estudo de Ervas e Banhos',
    description: 'Aula prática sobre ervas medicinais e banhos rituais.',
    startDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
    endDate: new Date(Date.now() + 86400000 * 10 + 7200000).toISOString(), // 10 days from now + 2 hours
    location: 'Terreiro Principal - Jardim',
    imageUrl: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg',
    createdBy: '1',
    status: 'scheduled',
  },
];

export async function fetchEvents(filter: string = 'all'): Promise<Event[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const now = new Date().toISOString();
  
  if (filter === 'upcoming') {
    return mockEvents.filter(event => event.startDate > now);
  }
  
  if (filter === 'past') {
    return mockEvents.filter(event => event.startDate < now);
  }
  
  return mockEvents;
}

export async function fetchUpcomingEvents(limit: number = 3): Promise<Event[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const now = new Date().toISOString();
  return mockEvents
    .filter(event => event.startDate > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
}

export async function fetchEventById(id: string): Promise<Event | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const event = mockEvents.find(event => event.id === id);
  return event || null;
}

export async function createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newEvent: Event = {
    id: Math.random().toString(36).substring(2, 9), // Generate random ID
    ...eventData,
  };
  
  return newEvent;
}

export async function updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const eventIndex = mockEvents.findIndex(event => event.id === id);
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }
  
  const updatedEvent: Event = {
    ...mockEvents[eventIndex],
    ...eventData,
  };
  
  return updatedEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
}