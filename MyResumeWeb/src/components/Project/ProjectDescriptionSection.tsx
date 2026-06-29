import { Button, Card } from "react-bootstrap";
import type { ProjectDescriptionProps } from "../../types/ProjectDescriptionProps";

type ProjectDescriptionSectionProps = {
    descriptions: ProjectDescriptionProps[];
    githubUrl?: string;
};

function ProjectDescriptionSection({ descriptions, githubUrl }: ProjectDescriptionSectionProps) {
    
    const renderContentWithLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        if (!urlRegex.test(text)) {
            return text;
        }

        const [name, url] = text.split(/:\s*(https?:\/\/[^\s]+)/);

        return (
            <>
                <span>{name}: </span>
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-underline-hover ms-1"
                    style={{ color: '#61dafb' }}
                >
                    LinkedIn
                </a>
            </>
        );
    };

    return (
        // <Col xs={12} lg={7} className="d-flex">
            <Card className="flex-fill h-100" style={{ border: 'none' }}>
                <Card.Body style={{ background: "rgba(17, 24, 39, 0.45)" }}>
                    <Card.Title as="h5" className="mb-3 d-inline-block pb-1" style={{ borderBottom: "3px solid var(--accent)" }}>
                        Description
                    </Card.Title>
                    <div className="text-start text-muted small">
                        {descriptions.map((descriptionItem, index) => {
                            if (descriptionItem.type === "bullet") {
                                return (
                                    <ul key={index} className="ps-3 mb-2">
                                        <li>{renderContentWithLinks(descriptionItem.description)}</li>
                                    </ul>
                                );
                            }

                            return (
                                <Card.Text as="div" key={index} className="mb-2">
                                    {descriptionItem.description}
                                </Card.Text>
                            );
                        })}
                    </div>

                    {githubUrl && (
                        <div className="mt-3">
                            <Button className="profile-btn" size="sm" href={githubUrl} target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        // </Col>
    );
}

export default ProjectDescriptionSection;