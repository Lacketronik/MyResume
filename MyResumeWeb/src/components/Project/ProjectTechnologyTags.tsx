import { getTechnologyBadgeStyle } from "../../constants/TechnologyTags.ts";

type ProjectTechnologyTagsProps = {
    technologies: string[];
};

function ProjectTechnologyTags({ technologies }: ProjectTechnologyTagsProps) {
    if (technologies.length === 0) {
        return null;
    }

    return (
        <div className="project-technology-tags" aria-label="Project technologies">
            {technologies.map((technology, index) => (
                <span
                    key={`${technology}-${index}`}
                    className="project-technology-tag"
                    style={getTechnologyBadgeStyle(technology)}
                >
                    {technology}
                </span>
            ))}
        </div>
    );
}

export default ProjectTechnologyTags;