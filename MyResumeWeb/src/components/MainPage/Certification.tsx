import type { CertificationProps } from "../../types/CertificationProps";
import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/dates";

function Certification({ certs }: { certs: CertificationProps[] }) {
    return (
        <div className="certification-section">
            {certs.map((cert) => (
                <Card style={{ width: '70%' }} key={cert.id} className="mx-auto mb-3">
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
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.verificationLink}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-secondary me-2" style={{ fontSize: '1.25rem' }}>Status:</strong>
                                <span className="text-light" style={{ fontSize: '1.1rem' }}>{cert.status}</span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Certification;