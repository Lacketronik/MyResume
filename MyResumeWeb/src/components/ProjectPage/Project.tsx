import { useEffect, useState } from "react";
import type { ProjectProps } from "../../types/ProjectProps";
import FileService from "../../services/FileService";
import { Button } from "react-bootstrap";

function Project({ projects }: { projects: ProjectProps[] }) {
    const [fileNames, setFileNames] = useState<Record<string, string>>({});

    useEffect(() => {
        let mounted = true;

        const fileIDs = Array.from(
            new Set(
                projects.flatMap((proj) => proj.projectFileIDs ?? [])
            )
        );

        if (fileIDs.length === 0) {
            if (mounted) setFileNames({});
            return () => {
                mounted = false;
            };
        }

        Promise.all(
            fileIDs.map(async (id) => {
                try {
                    const file = await FileService.getFile(id);
                    return { id, name: file.name };
                } catch {
                    return { id, name: `File ${id}` };
                }
            })
        ).then((entries) => {
            if (!mounted) return;
            const nextNames: Record<string, string> = {};
            entries.forEach(({ id, name }) => {
                nextNames[id] = name;
            });
            setFileNames(nextNames);
        });

        return () => {
            mounted = false;
        };
    }, [projects]);

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
                            Download {fileNames[id] ?? `File ${id}`}
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Project;