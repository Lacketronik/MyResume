import type { PortfolioProps } from "../types/PortfolioProps";
import portfolioData from "../data/portfolio.json";

export class PortfolioService {
    static async getPortfolio(): Promise<PortfolioProps> {
        return portfolioData as unknown as PortfolioProps;
    }
}

export default PortfolioService;