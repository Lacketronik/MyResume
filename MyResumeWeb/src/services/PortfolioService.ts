import type { PortfolioProps } from "../types/PortfolioProps";

declare const __BUILD_ID__: string;

export class PortfolioService {
    static async getPortfolio(): Promise<PortfolioProps> {
        try {
            const response = await fetch(`/data/portfolio.json?v=${encodeURIComponent(__BUILD_ID__)}`, {
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`Failed to load portfolio.json: ${response.status} ${response.statusText}`);
            }

            return (await response.json()) as PortfolioProps;
        } catch (error) {
            console.error("Error fetching portfolio:", error);
            throw error;
        }
    }
}

export default PortfolioService;