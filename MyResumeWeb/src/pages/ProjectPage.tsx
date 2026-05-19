import { useEffect, useState } from "react";
import Project from "../components/ProjectPage/Project";
import type { ProjectProps } from "../types/ProjectProps";
import { ProjectService } from "../services/ProjectService";

function ProjectPage() {
    const [projectData, setProjectData] = useState<ProjectProps[]>([]);

    useEffect(() => {
        let mounted = true;
        ProjectService.getProjects()
            .then((data) => {
                if (mounted) setProjectData(data);
            })
            .catch(() => {
                if (mounted) setProjectData([]);
            });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="ProjectPage">
            <Project projects={projectData} />
        </div>
    );
}

export default ProjectPage;