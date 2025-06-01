export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'member';
  createdAt: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: 'active' | 'inactive';
  plan: 'basic' | 'standard' | 'premium';
  theme: string;
  userCount: number;
  createdAt: string;
  logo?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  imageUrl?: string;
  createdBy: string;
  status: 'scheduled' | 'cancelled' | 'completed';
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  maxUsers: number;
  maxEvents: number;
  customization: boolean;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  preview?: string;
}