import apiClient from './client';

// Define interfaces for dashboard data
export interface UserStats {
  completedItems: number;
  totalItems: number;
  progress: number;
  streak: number;
}

export interface RecentActivity {
  id: string;
  type: 'completion' | 'practice' | 'exam';
  title: string;
  timestamp: string;
  details?: string;
}

export interface DashboardData {
  stats: UserStats;
  recentActivities: RecentActivity[];
}

// Dashboard API functions
export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardData>('/dashboard');
  return response.data;
};

export const getRecentActivities = async (limit: number = 5): Promise<RecentActivity[]> => {
  const response = await apiClient.get<RecentActivity[]>(`/activities/recent?limit=${limit}`);
  return response.data;
};
