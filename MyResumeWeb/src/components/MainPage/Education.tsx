import type { EducationProps } from "../../types/EducationProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";

function Education({ educations }: { educations: EducationProps[] }) {
    return (
        <div className="education-section">
            {educations.map((edu, index) => (
                <Card style={{ width: '70%' }} key={index} className="mx-auto mb-3">
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1.5rem' }}>{edu.degree}</Card.Title>
                        <Card.Text as="div" className="text-start">
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Institution:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{edu.institution}</span>
                            </div>

                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Graduation Date:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{formatDate(edu.graduationDate)}</span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Education;