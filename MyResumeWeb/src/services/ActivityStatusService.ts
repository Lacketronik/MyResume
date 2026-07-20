import type { ActivityStatusProp, RawActivityStatus } from '../types/ActivityStatusProp';
import axios,{ AxiosError } from 'axios';

const baseURL = "https://activity-status.onrender.com"
const api = axios.create({ baseURL });

export class ActivityStatusService {
    static async getActivityStatus(): Promise<ActivityStatusProp[]> {
        try {
            const response = await api.get<RawActivityStatus[]>(`/status`);
            
            return response.data.map((item) => {
                return {
                    activity: item.activity,
                    display_text: item.display_text 
                        ? item.display_text.split(',').map(t => t.trim()) 
                        : [],
                    links: (item.links && item.links !== 'undefined') 
                        ? item.links.split(',').map(l => l.trim()) 
                        : []
                };
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error fetching activity status:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }
}