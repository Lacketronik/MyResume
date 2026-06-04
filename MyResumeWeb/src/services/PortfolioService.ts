import type { PortfolioProps } from "../types/PortfolioProps";

declare const __BUILD_ID__: string;

export class PortfolioService {
    static async getPortfolio(): Promise<PortfolioProps> {
        try {
            const response = await fetch('/data/portfolio.json', { 
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to load portfolio.json: ${response.status}`);
        }
        return response.json();
        } catch (error) {
            console.error("Error fetching portfolio:", error);
            throw error;
        }
    }
}

export default PortfolioService;