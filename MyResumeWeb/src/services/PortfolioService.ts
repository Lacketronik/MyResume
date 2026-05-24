import api from "./API";
import type { PortfolioProps } from "../types/PortfolioProps";

export class PortfolioService {
    static async getPortfolio(): Promise<PortfolioProps> {
        try {
            const response = await api.get('Portfolio');
            return response.data as PortfolioProps;
        } catch (error) {
            console.error("Error fetching portfolio:", error);
            throw error;
        }
    }
}

export default PortfolioService;