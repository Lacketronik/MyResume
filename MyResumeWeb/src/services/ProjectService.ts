import api from "./API";
import type { ProjectProps } from "../types/ProjectProps";

export class ProjectService {
    static async getProjects(): Promise<ProjectProps[]> {
        try {
            const response = await api.get('/project');
            return response.data as ProjectProps[];
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    }
}