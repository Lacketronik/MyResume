import type { CertificationProps } from "../../types/CertificationProps";
import { formatDate } from "../../helpers/dates";
import { Button } from "react-bootstrap";
import "../../styles/Certification.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function Certification({ certs }: { certs: CertificationProps[] }) {
    return (
        <div className="certification-section">
            {certs.map((cert, index) => (
                <VerticalTimeline key={index} layout="1-column" lineColor="#ff9900" animate={true}>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--certification"
                        contentStyle={{ background: 'rgba(27, 36, 55, 0.725)', borderRadius: '0.75rem', color: '#fff', boxShadow: '0 0 0 0px' }}
                        contentArrowStyle={{ borderRight: '7px solid rgba(27, 36, 55, 0.725)' }}
                        date={`Issued: ${formatDate(cert.issueDate)} - Expires: ${cert.expirationDate ? formatDate(cert.expirationDate) : 'N/A'}`}
                        iconStyle={{ background: '#ff9900', color: '#fff', boxShadow: '0 0 0 4px #ff9900' }}
                    >
                        <h3 className="vertical-timeline-element-title" style={{ marginBottom: '1rem' }}>{cert.title}</h3>
                        <h4 className="vertical-timeline-element-title text-primary" style={{ textAlign: 'left', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{cert.provider}</h4>
                        <div className="mb-2" style={{ textAlign: 'left' }}>
                            <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Certificate ID:</strong>
                            <span className="text-muted" style={{ fontSize: '1.25rem' }}>{cert.id}</span>
                        </div>
                        <div className="mb-2" style={{ textAlign: 'left' }}>
                            <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Exam Code:</strong>
                            <span className="text-muted" style={{ fontSize: '1.25rem' }}>{cert.examCode}</span>
                        </div>
                        <div className="mb-2" style={{ textAlign: 'left' }}>
                            <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Verification URL:</strong>
                            <Button className="profile-btn" size="sm" href={cert.verificationLink} target="_blank">
                                Show Credential
                            </Button>
                        </div>
                        <div className="mb-2" style={{ textAlign: 'left' }}>
                            <strong className="text-primary me-2" style={{ fontSize: '1.25rem' }}>Status:</strong>
                            <span
                                style={{
                                    fontSize: '1.25rem',
                                    color: cert.status.toLowerCase() === 'active'
                                        ? '#28a745'
                                        : cert.status.toLowerCase() === 'expired'
                                            ? '#dc3545'
                                            : undefined,
                                    fontWeight: 'bold',
                                }}
                            >
                                {cert.status}
                            </span>
                        </div>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            ))}
        </div>
    );
}

export default Certification;