import { User } from '@/types';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
  },
  {
    id: '2',
    name: 'Super Admin',
    email: 'super@example.com',
    role: 'superadmin',
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(), // 60 days ago
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'member',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'member',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
  },
  {
    id: '5',
    name: 'Mary Johnson',
    email: 'mary@example.com',
    role: 'member',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
];

export async function fetchUsers(roleFilter: string = 'all'): Promise<User[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (roleFilter !== 'all') {
    return mockUsers.filter(user => user.role === roleFilter);
  }
  
  return mockUsers;
}

export async function fetchUserById(id: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(user => user.id === id);
  return user || null;
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 9), // Generate random ID
    createdAt: new Date().toISOString(),
    ...userData,
  };
  
  return newUser;
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser: User = {
    ...mockUsers[userIndex],
    ...userData,
  };
  
  return updatedUser;
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
}