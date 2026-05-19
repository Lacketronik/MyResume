import type { ExperienceProps } from "../../types/ExperienceProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";

function Experience({ experiences }: { experiences: ExperienceProps[] }) {
    return (
        <div className="experience-section">
            {experiences.map((exp, index) => (
                <Card style={{ width: '70%' }} key={index} className="mx-auto mb-3">
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1.5rem' }}>{exp.position} at {exp.company}</Card.Title>
                        <Card.Text style={{fontSize: '0.9rem', fontStyle: 'italic'}} className="text-start text-muted">
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </Card.Text>
                        <Card.Text as="div" className="text-start">
                            <strong className="d-block mb-1 text-secondary" style={{fontSize: '1.25rem'}}>Responsibilities:</strong>
                            <ul className="list-unstyled ps-0">
                                {exp.responsibilities.map((resp, index) => (
                                    <li key={index} className="mb-1 text-light" style={{fontSize: '0.8rem'}}>{resp}</li>
                                ))}
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Experience;