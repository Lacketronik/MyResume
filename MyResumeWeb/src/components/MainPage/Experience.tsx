import type { ExperienceProps } from "../../types/ExperienceProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";

function Experience({ experiences }: { experiences: ExperienceProps[] }) {
    const sorted = [...experiences].sort((a, b) => {
        const aDate = a.endDate ? new Date(a.endDate).valueOf() : new Date(a.startDate).valueOf();
        const bDate = b.endDate ? new Date(b.endDate).valueOf() : new Date(b.startDate).valueOf();
        return bDate - aDate;
    });

    return (
        <div className="experience-section">
            {sorted.map((exp, index) => (
                <Card style={{ width: '90%', border: 'none', borderRadius: '0.75rem', overflow: 'hidden' }} key={index} className="mx-auto mb-3">
                    <Card.Body style={{ background: "rgba(17, 24, 39, 0.45)" }}>
                        <Card.Title style={{ fontSize: '1.5rem' }}>{exp.position} | {exp.company}</Card.Title>
                        <Card.Text style={{fontSize: '0.9rem', fontStyle: 'italic'}} className="text-start text-muted">
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </Card.Text>
                        <Card.Text as="div" className="text-start">
                            <strong className="d-block mb-1 text-primary" style={{fontSize: '1.25rem'}}>Responsibilities:</strong>
                            <ul className="list-unstyled ps-0">
                                {exp.responsibilities.map((resp, index) => (
                                    <li key={index} className="mb-1 text-muted" style={{fontSize: '0.8rem'}}>• {resp}</li>
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