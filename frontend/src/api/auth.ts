import apiClient from './client';

// Define interfaces for request and response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: {
      id: string;
      email: string;
      name?: string;
      picture?: string;
    };
  };
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export interface GoogleAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    picture: string;
  };
}

// Authentication API functions
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/signup', data);
  return response.data;
};

// Google authentication function
export const googleAuth = async (code: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/google/callback', { code });
  return response.data;
};

// Function to handle Google auth callback
export const handleGoogleCallback = (token: string, userData: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', userData);
  window.location.href = '/dashboard';
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Function to get the current user
export const getCurrentUser = (): { id: string; email: string; name?: string; picture?: string } | null => {
  try {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    // Try to parse the JSON
    try {
      return JSON.parse(userJson);
    } catch (e) {
      // If parsing fails, clear the invalid data
      console.error('Invalid user data in localStorage:', e);
      localStorage.removeItem('user');
      return null;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Function to logout
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth';
};
