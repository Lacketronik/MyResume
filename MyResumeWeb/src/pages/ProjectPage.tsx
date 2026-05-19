import Project from "../components/ProjectPage/Project";
import type { ProjectProps } from "../types/ProjectProps";

function ProjectPage() {
    // sample data for testing
    const projectData: ProjectProps[] = [
        {
            name: "Personal Portfolio Website",
            description: "A personal portfolio website to showcase my projects and experience.",
            videoBlobIDs: ["https://example.com/project-video.mp4", "https://example.com/project-demo.mp4"], 
            imageBlobIDs: ["https://example.com/project-image1.png", "https://example.com/project-image2.png"],
            githubUrl: "https://github.com/example/portfolio",
            projectFileIDs: ["file1.pdf", "file2.pdf"]
        },
        {
            name: "E-commerce Platform",
            description: "An e-commerce platform built with React and Node.js.",
            videoBlobIDs: ["https://example.com/ecommerce-video.mp4", "https://example.com/ecommerce-demo.mp4"],
            imageBlobIDs: ["https://example.com/ecommerce-image1.png", "https://example.com/ecommerce-image2.png"],
            githubUrl: "https://github.com/example/ecommerce",
            projectFileIDs: ["file3.pdf", "file4.pdf"]
        }
    ];
    
    return (
        <div className="ProjectPage">
            <Project projects={projectData} />
        </div>
    );
}

export default ProjectPage;