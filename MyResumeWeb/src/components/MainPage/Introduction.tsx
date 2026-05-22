import type { InformationProps } from "../../types/InformationProps";
import type { FileProps } from "../../types/FileProps";
import FileService from "../../services/FileService";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function Introduction({ information }: { information: InformationProps }) {
  const [fileMetas, setFileMetas] = useState<Record<string, FileProps>>({});
  const fallbackProfileImage =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
        <rect width="640" height="640" rx="320" fill="#111827"/>
        <circle cx="320" cy="250" r="104" fill="#374151"/>
        <path d="M160 560c0-88 71-160 160-160s160 72 160 160" fill="#374151"/>
      </svg>
    `);

  const getMetaName = (id: string) => fileMetas[id]?.name;

  const getMetaPath = (id: string) => fileMetas[id]?.path;

  useEffect(() => {
    let mounted = true;

    const fileIDs = [information.resumeFileID, information.profileImageID].filter(
      (id): id is string => Boolean(id)
    );

    if (fileIDs.length === 0) {
      if (mounted) setFileMetas({});
      return () => {
        mounted = false;
      };
    }

    Promise.all(
      fileIDs.map(async (id) => {
        try {
          const file = await FileService.getFile(id);
          return { id, meta: file };
        } catch {
          return { id, meta: { id, name: `File ${id}`, path: "", extension: "", type: "" } };
        }
      })
    ).then((entries) => {
      if (!mounted) return;

      const next: Record<string, FileProps> = {};
      entries.forEach(({ id, meta }) => {
        next[id] = meta;
      });
      setFileMetas(next);
    });

    return () => {
      mounted = false;
    };
  }, [information.profileImageID, information.resumeFileID]);

  const profileImageSrc = information.profileImageID
    ? (() => {
        const imagePath = getMetaPath(information.profileImageID);
        const imageName = getMetaName(information.profileImageID);

        if (imagePath && imageName) {

          return `${imagePath}/${information.profileImageID.toUpperCase()}_${imageName}.webp`;
        }

        return `/api/blobs/${information.profileImageID}`;
      })()
    : undefined;

  const resumeFileID = information.resumeFileID;
  const resumeFileSrc = resumeFileID
    ? (() => {
        const resumePath = getMetaPath(resumeFileID);
        const resumeName = getMetaName(resumeFileID);

        if (resumePath && resumeName) {
          return `${resumePath}/${resumeFileID.toUpperCase()}_${resumeName}.pdf`;
        }

        return undefined;
      })()
    : undefined;
  
  return (
    <div className="Introduction" style={{ padding: '1.5rem' }}>
      <Card className="shadow mx-auto bg-dark text-light" style={{ width: '100%', borderLeft: '5px solid #0d6efd', borderRight: '5px solid #0d6efd' }}>
        <Card.Body className="p-4">
          <Row className="g-4 align-items-stretch">
            <Col xs={12} md={5} className="d-flex">
              <Card
                className="flex-fill text-light"
                style={{
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  zIndex: 1,
                }}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
                  <div
                    style={{
                      width: 'clamp(220px, 100%, 320px)',
                      aspectRatio: '1 / 1',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '6px solid rgba(255,255,255,0.18)',
                      boxShadow: '0 18px 38px rgba(0,0,0,0.35)',
                      backgroundColor: '#111827',
                    }}
                  >
                    <img
                      src={profileImageSrc ?? fallbackProfileImage}
                      alt={information.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={7} className="d-flex">
              <Card className="flex-fill bg-dark text-light shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-center p-4 text-center text-md-start">
                  <h1 className="mb-2">{information.name}</h1>
                  <h2 className="h4 text-secondary mb-4">{information.role.join(" | ")}</h2>

                  <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start mb-4">
                    {information.linkedin && (
                      <Button variant="outline-primary" href={information.linkedin} target="_blank" rel="noopener noreferrer" size="sm">
                        LinkedIn Profile
                      </Button>
                    )}
                    {resumeFileID && (
                      <Button
                        as="a"
                        variant="outline-success"
                        size="sm"
                        href={resumeFileSrc}
                        disabled={!resumeFileSrc}
                        download={information.name.replace(/\s+/g, '_') + '_Resume.pdf'}
                      >
                        Download {getMetaName(resumeFileID) ?? 'Resume'}
                      </Button>
                    )}
                  </div>

                  {information.introduction.map((paragraph, index) => (
                    <Card.Text className="text-secondary small lh-base mb-2 text-start" key={index}>
                      {paragraph}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Introduction