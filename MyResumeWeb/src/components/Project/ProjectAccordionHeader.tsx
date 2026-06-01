import { Button, useAccordionButton } from "react-bootstrap";
import ProjectTechnologyTags from "./ProjectTechnologyTags.tsx";

type ProjectAccordionHeaderProps = {
    eventKey: string;
    title: string;
    technologies?: string[];
};

function ProjectAccordionHeader({ eventKey, title, technologies = [] }: ProjectAccordionHeaderProps) {
    const toggleAccordion = useAccordionButton(eventKey);

    return (
        <div className="project-accordion-header d-flex flex-column align-items-start gap-2 px-3 py-2">
            <Button
                variant="link"
                className="project-accordion-title-btn w-100 p-0 text-start text-decoration-none"
                type="button"
                onClick={toggleAccordion}
            >
                <span className="project-accordion-title">{title}</span>
            </Button>

            <ProjectTechnologyTags technologies={technologies} />
        </div>
    );
}

export default ProjectAccordionHeader;