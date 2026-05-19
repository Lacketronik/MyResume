import api from "./API";
import type { CertificationProps } from "../types/CertificationProps";

export class CertificationService {
    static async getCertifications(): Promise<CertificationProps[]> {
        try {
            const response = await api.get('Certification');
            return response.data as CertificationProps[];
        }
        catch (error) {
            console.error("Error fetching certifications:", error);
            throw error;
        }
    }
}

export default CertificationService;