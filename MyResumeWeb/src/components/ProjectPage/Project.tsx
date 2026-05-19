import type { ProjectProps } from "../../types/ProjectProps";
import type { FileProps } from "../../types/FileProps";
import FileService from "../../services/FileService";
import { Button } from "react-bootstrap";

function Project({ projects }: { projects: ProjectProps[] }) {
    return (
        <div className="project-section">
            <h2>Projects</h2>
            {projects.map((proj, index) => (
                <div key={index} className="project-card">
                    <h3>{proj.name}</h3>
                    <p>{proj.description}</p>
                    {proj.videoBlobIDs && proj.videoBlobIDs.map((id, index) => (
                        <video key={index} controls src={`/api/blobs/${id}`} />
                    ))}
                    {proj.imageBlobIDs && proj.imageBlobIDs.map((id, index) => (
                        <img key={index} src={`/api/blobs/${id}`} alt={`${proj.name} screenshot ${index + 1}`} />
                    ))}
                    {proj.githubUrl && <p><a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a></p>}
                    {proj.projectFileIDs && proj.projectFileIDs.map((id, index) => (
                        <Button key={index} variant="primary" onClick={async () => {
                            try {
                                await FileService.downloadFile(id);
                            } catch (error) {
                                console.error("Error downloading file:", error);
                            }
                        }}>
                            Download {FileService.getFile(id).then((file: FileProps) => file.name).catch(() => `File ${id}`)}
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Project;