import { useEffect, useState } from "react";
import { Modal, Button, Card, Alert } from "react-bootstrap";

export type ProjectPdfDetailsModalFile = {
    id: string;
    name: string;
    src: string;
    downloadName: string;
};

type ProjectPdfDetailsModalProps = {
    show: boolean;
    projectName: string;
    files: ProjectPdfDetailsModalFile[];
    onHide: () => void;
};

function ProjectPdfDetailsModal({ show, projectName, files, onHide }: ProjectPdfDetailsModalProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const updateIsMobile = () => {
            setIsMobile(mediaQuery.matches);
        };

        updateIsMobile();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateIsMobile);
            return () => mediaQuery.removeEventListener("change", updateIsMobile);
        }

        mediaQuery.addListener(updateIsMobile);
        return () => mediaQuery.removeListener(updateIsMobile);
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="xl"
            scrollable
            contentClassName="project-gallery-modal-content text-light"
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>{projectName} - More Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="project-pdf-details-modal-body">
                {isMobile && (
                    <Alert variant="warning" className="mb-4">
                        PDF viewer might not work reliably on some mobile devices.
                    </Alert>
                )}

                <div className="d-flex flex-column gap-4">
                    {files.map((file) => (
                        <Card key={file.id} className="project-pdf-card bg-dark text-light border-0 shadow-sm">
                            <Card.Body>
                                <Card.Title as="h5" className="mb-3">
                                    {file.name}
                                </Card.Title>

                                {isMobile ? (
                                    <div className="d-flex flex-column gap-3">
                                        <Alert variant="info" className="mb-0">
                                            Open the PDF in your browser for the best mobile experience.
                                        </Alert>

                                        <div className="d-flex flex-wrap justify-content-end gap-2">
                                            <Button
                                                as="a"
                                                variant="outline-light"
                                                href={file.src}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Open PDF
                                            </Button>

                                            <Button
                                                as="a"
                                                variant="outline-light"
                                                href={file.src}
                                                download={file.downloadName}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Download PDF
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="project-pdf-frame-wrap">
                                            <iframe
                                                title={file.name}
                                                src={file.src}
                                                className="project-pdf-frame"
                                            />
                                        </div>

                                        <div className="d-flex justify-content-end mt-3">
                                            <Button
                                                as="a"
                                                variant="outline-light"
                                                href={file.src}
                                                download={file.downloadName}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Download PDF
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ProjectPdfDetailsModal;