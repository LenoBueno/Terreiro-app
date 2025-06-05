declare module '@/services/bathService' {
  export interface Bath {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    preparation: string;
    benefits: string;
    imageUrl?: string;
    tips?: string;
  }

  export const fetchBaths: () => Promise<Bath[]>;
}
