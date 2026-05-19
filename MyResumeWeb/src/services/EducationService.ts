import api from "./API";
import type { EducationProps } from "../types/EducationProps";

export class EducationService {
    static async getEducation(): Promise<EducationProps[]> {
        try {
            const response = await api.get('Education');
            return response.data as EducationProps[];
        } catch (error) {
            console.error("Error fetching education:", error);
            throw error;
        }
    }
}

export default EducationService;