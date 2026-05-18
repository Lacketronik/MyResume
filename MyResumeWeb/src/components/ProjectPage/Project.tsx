import type { ProjectProps } from "../../types/ProjectProps";

function Project({ projects }: { projects: ProjectProps[] }) {
    return (
        <div className="project-section">
            <h2>Projects</h2>
            {projects.map((proj, index) => (
                <div key={index} className="project-card">
                    <h3>{proj.name}</h3>
                    <p>{proj.description}</p>
                    {proj.videoBlobID && <video controls src={`/api/blobs/${proj.videoBlobID}`} />}
                    {proj.imageBlobIDs && proj.imageBlobIDs.map((id, index) => (
                        <img key={index} src={`/api/blobs/${id}`} alt={`${proj.name} screenshot ${index + 1}`} />
                    ))}
                    {proj.githubUrl && <p><a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a></p>}
                </div>
            ))}
        </div>
    );
}

export default Project;