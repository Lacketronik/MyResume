import api from "./API";
import type { ProjectProps } from "../types/ProjectProps";
import type { ImageProps } from "../types/ImageProps";

export class ProjectService {
    static async getProjects(): Promise<ProjectProps[]> {
        try {
            const response = await api.get('Project');
            return response.data as ProjectProps[];
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    }

    static async getImageDetails(id: string): Promise<ImageProps> {
        try {
            const response = await api.get('Project/Image/id?id=' + id);
            return response.data as ImageProps;
        } catch (error) {
            console.error(`Error fetching image details for ID ${id}:`, error);
            throw error;
        }
    }

    static async getImageDetailsByIDs(ids: string[]): Promise<ImageProps[]> {
        try {
            const response = await api.post('Project/Image/ids', ids);
            return response.data as ImageProps[];
        } catch (error) {
            console.error('Error fetching image details batch:', error);
            throw error;
        }
    }
}