import type { EducationProps } from "../../types/EducationProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";

function Education({ educations }: { educations: EducationProps[] }) {
    const sorted = [...educations].sort((a, b) => {
        const aDate = a.graduationDate ? new Date(a.graduationDate).valueOf() : 0;
        const bDate = b.graduationDate ? new Date(b.graduationDate).valueOf() : 0;
        return bDate - aDate;
    });

    return (
        <div className="education-section">
            {sorted.map((edu, index) => (
                <Card style={{ width: '90%', border: 'none', borderRadius: '0.75rem', overflow: 'hidden' }} key={index} className="mx-auto mb-3">
                    <Card.Body style={{ background: "rgba(17, 24, 39, 0.45)" }}>
                        <Card.Title style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{edu.degree}</Card.Title>
                        <Card.Text as="div" className="text-start">
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Institution:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{edu.institution}</span>
                            </div>

                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Graduation Date:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{formatDate(edu.graduationDate)}</span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Education;