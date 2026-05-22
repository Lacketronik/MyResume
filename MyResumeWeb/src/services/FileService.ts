import api from "./API";
import type { FileProps } from "../types/FileProps";

export class FileService {
    static async getFile(fileID: string): Promise<FileProps> {
        try {
            const response = await api.get('File/id?id=' + fileID);
            return response.data as FileProps;
        } catch (error) {
            console.error("Error fetching file:", error);
            throw error;
        }
    }

    static async getFilesByIDs(fileIDs: string[]): Promise<FileProps[]> {
        try {
            const response = await api.post('File/ids', fileIDs);
            return response.data as FileProps[];
        } catch (error) {
            console.error('Error fetching files batch:', error);
            throw error;
        }
    }
}

export default FileService;