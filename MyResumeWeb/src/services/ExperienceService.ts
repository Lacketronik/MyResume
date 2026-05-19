import api from "./API";
import type { ExperienceProps } from "../types/ExperienceProps";

export class ExperienceService {
    static async getExperiences(): Promise<ExperienceProps[]> {
        try {
            const response = await api.get('Experience');
            return response.data as ExperienceProps[];
        } catch (error) {
            console.error("Error fetching experiences:", error);
            throw error;
        }
    }
}

export default ExperienceService;