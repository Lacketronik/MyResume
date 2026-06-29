import type { CertificationProps } from "../../types/CertificationProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";
import { Button } from "react-bootstrap";

function Certification({ certs }: { certs: CertificationProps[] }) {
    return (
        <div className="certification-section">
            {certs.map((cert) => (
                <Card style={{ width: '90%', border: 'none', borderRadius: '0.75rem', overflow: 'hidden' }} key={cert.id} className="mx-auto mb-3">
                    <Card.Body style={{ background: "rgba(17, 24, 39, 0.45)" }}>
                        <Card.Title style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{cert.title}</Card.Title>
                        <Card.Text as="div" className="text-start">
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Certificate ID:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem', textAlign: 'right' }}>{cert.id}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Provider:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{cert.provider}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Exam Code:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{cert.examCode}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Issue Date:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{formatDate(cert.issueDate)}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Expiration Date:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{cert.expirationDate ? formatDate(cert.expirationDate) : 'N/A'}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Provider:</strong>
                                <span className="text-muted" style={{ fontSize: '1.1rem' }}>{cert.provider}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Verification URL:</strong>
                                <Button className="profile-btn" size="sm" href={cert.verificationLink} target="_blank">
                                    Show Credential
                                </Button>
                            </div>
                            <div className="mb-2">
                                <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Status:</strong>
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