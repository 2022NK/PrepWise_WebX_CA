import apiClient from './client';

// Define interfaces for roadmap data
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
  category: string;
}

export interface RoadmapCategory {
  id: string;
  name: string;
  description: string;
  items: RoadmapItem[];
}

// Roadmap API functions
export const getRoadmap = async (): Promise<RoadmapCategory[]> => {
  const response = await apiClient.get<RoadmapCategory[]>('/roadmap');
  return response.data;
};

export const updateRoadmapItem = async (itemId: string, data: Partial<RoadmapItem>): Promise<RoadmapItem> => {
  const response = await apiClient.patch<RoadmapItem>(`/roadmap/items/${itemId}`, data);
  return response.data;
};

export const markItemCompleted = async (itemId: string, completed: boolean): Promise<RoadmapItem> => {
  return updateRoadmapItem(itemId, { completed });
};
