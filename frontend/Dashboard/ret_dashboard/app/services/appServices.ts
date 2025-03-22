import api from '../utils/api';

export interface AppStatus {
  status: string;
  version: string;
}
export const fetchAppStatus = async (): Promise<AppStatus> => {
  try {
    const response = await api.get<AppStatus>('/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch app status:", error);
    throw error;
  }
};
