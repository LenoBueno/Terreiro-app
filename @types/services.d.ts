declare module '@/services/messageService' {
  export interface Message {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    imageUrl?: string;
    author?: string;
    date?: string;
  }

  export const fetchMessages: () => Promise<Message[]>;
}
