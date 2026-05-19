import api from "./API";
import type { InformationProps } from "../types/InformationProps";

export class InformationService {
    static async getInformation(): Promise<InformationProps> {
        try {
            const response = await api.get('Information');
            return response.data as InformationProps;
        } catch (error) {
            console.error("Error fetching information:", error);
            throw error;
        }
    }
}

export default InformationService;