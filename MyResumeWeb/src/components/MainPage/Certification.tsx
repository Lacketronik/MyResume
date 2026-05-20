import type { CertificationProps } from "../../types/CertificationProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";
import { Button } from "react-bootstrap";

function Certification({ certs }: { certs: CertificationProps[] }) {
    return (
        <div className="certification-section">
            {certs.map((cert) => (
                <Card style={{ width: '90%', borderLeft: '5px solid #FFA500' }} key={cert.id} className="mx-auto mb-3">
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1.5rem' }}>{cert.title}</Card.Title>
                        <Card.Text as="div" className="text-start">
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Certificate ID:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.id}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Provider:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.provider}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Exam Code:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.examCode}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Issue Date:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{formatDate(cert.issueDate)}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Expiration Date:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.expirationDate ? formatDate(cert.expirationDate) : 'N/A'}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Provider:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.provider}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Verification URL:</strong>
                                <Button variant="outline-primary" href={cert.verificationLink} target="_blank" style={{ fontSize: '1.1rem', padding: '0.25rem 0.75rem' }}>
                                    Show Credential
                                </Button>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Status:</strong>
                                <span
                                    style={{
                                        fontSize: '1.1rem',
                                        color: cert.status.toLowerCase() === 'active'
                                            ? '#28a745'
                                            : cert.status.toLowerCase() === 'expired'
                                                ? '#dc3545'
                                                : undefined,
                                    }}
                                >
                                    {cert.status}
                                </span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Certification;