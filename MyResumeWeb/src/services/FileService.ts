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

    static async downloadFile(fileID: string): Promise<void> {
        try {
            const response = await api.get('File/${fileID}/download', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `file_${fileID}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading file:", error);
            throw error;
        }
    }
}

export default FileService;