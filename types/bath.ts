export interface Bath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  preparation: string;
  imageUrl?: string;
  benefits?: string;
  tips?: string;
  ingredients?: string[];
  duration?: string;
  frequency?: string;
  bestTime?: string;
  category?: string;
  isFavorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
