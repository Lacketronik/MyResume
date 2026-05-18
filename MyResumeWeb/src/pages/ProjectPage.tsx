import Project from "../components/ProjectPage/Project";
import type { ProjectProps } from "../types/ProjectProps";

function ProjectPage() {
    // sample data for testing
    const projectData: ProjectProps[] = [
        {
            name: "Personal Portfolio Website",
            description: "A personal portfolio website to showcase my projects and experience.",
            videoBlobUrl: "https://example.com/project-video.mp4",
            imageBlobUrl: ["https://example.com/project-image1.png", "https://example.com/project-image2.png"],
            githubUrl: "https://github.com/example/portfolio"
        },
        {
            name: "E-commerce Platform",
            description: "An e-commerce platform built with React and Node.js.",
            videoBlobUrl: "https://example.com/ecommerce-video.mp4",
            imageBlobUrl: ["https://example.com/ecommerce-image1.png", "https://example.com/ecommerce-image2.png"],
            githubUrl: "https://github.com/example/ecommerce"
        }
    ];
    
    return (
        <div className="ProjectPage">
            <Project projects={projectData} />
        </div>
    );
}

export default ProjectPage;