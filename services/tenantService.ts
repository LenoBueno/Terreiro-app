import { Tenant } from '@/types';

// Mock data
const mockTenants: Tenant[] = [
  {
    id: 'terreiro-principal',
    name: 'Terreiro Principal',
    description: 'Terreiro principal de umbanda',
    domain: 'terreiro-principal.app',
    status: 'active',
    plan: 'premium',
    theme: 'default',
    userCount: 25,
    createdAt: new Date(Date.now() - 86400000 * 365).toISOString(), // 1 year ago
  },
  {
    id: 'terreiro-luz',
    name: 'Terreiro Luz Divina',
    description: 'Centro de umbanda e espiritualidade',
    domain: 'terreiro-luz.app',
    status: 'active',
    plan: 'basic',
    theme: 'light',
    userCount: 12,
    createdAt: new Date(Date.now() - 86400000 * 180).toISOString(), // 6 months ago
  },
  {
    id: 'casa-caridade',
    name: 'Casa de Caridade',
    description: 'Centro espírita e de umbanda',
    domain: 'casa-caridade.app',
    status: 'active',
    plan: 'standard',
    theme: 'custom',
    userCount: 18,
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(), // 3 months ago
  },
  {
    id: 'terreiro-novo',
    name: 'Terreiro Novo Amanhecer',
    description: 'Centro de umbanda e candomblé',
    domain: 'terreiro-novo.app',
    status: 'inactive',
    plan: 'basic',
    theme: 'default',
    userCount: 5,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), // 1 month ago
  },
];

export async function fetchTenants(): Promise<Tenant[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockTenants;
}

export async function fetchTenantById(id: string): Promise<Tenant | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const tenant = mockTenants.find(tenant => tenant.id === id);
  return tenant || null;
}

export async function createTenant(tenantData: Omit<Tenant, 'id' | 'createdAt' | 'userCount'>): Promise<Tenant> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newTenant: Tenant = {
    id: tenantData.name.toLowerCase().replace(/\s+/g, '-'),
    userCount: 0,
    createdAt: new Date().toISOString(),
    ...tenantData,
  };
  
  return newTenant;
}

export async function updateTenant(id: string, tenantData: Partial<Tenant>): Promise<Tenant> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const tenantIndex = mockTenants.findIndex(tenant => tenant.id === id);
  if (tenantIndex === -1) {
    throw new Error('Tenant not found');
  }
  
  const updatedTenant: Tenant = {
    ...mockTenants[tenantIndex],
    ...tenantData,
  };
  
  return updatedTenant;
}

export async function deleteTenant(id: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
}