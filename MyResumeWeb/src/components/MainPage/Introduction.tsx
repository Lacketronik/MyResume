import type { InformationProps } from "../../types/InformationProps";
import type { FileProps } from "../../types/FileProps";
import { useMemo } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function Introduction({ information, files }: { information: InformationProps; files: FileProps[] }) {
  //const itchUrl = "https://itch.io/embed-upload/17838035?color=333333";
  const itchUrl = "https://itch.io/embed-upload/17837907?color=333333"
  const fallbackProfileImage =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
        <rect width="640" height="640" rx="320" fill="#111827"/>
        <circle cx="320" cy="250" r="104" fill="#374151"/>
        <path d="M160 560c0-88 71-160 160-160s160 72 160 160" fill="#374151"/>
      </svg>
    `);

  const fileMetas = useMemo(() => {
    return files.reduce<Record<string, FileProps>>((lookup, file) => {
      lookup[file.id.toUpperCase()] = file;
      return lookup;
    }, {});
  }, [files]);

  const getMetaName = (id: string) => fileMetas[id.toUpperCase()]?.name;

  const getMetaPath = (id: string) => fileMetas[id.toUpperCase()]?.path;

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
                        Download Resume
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

       <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '1280px', 
      margin: '0 auto', 
      aspectRatio: '16 / 9' 
    }}>
      <iframe
        src={itchUrl}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen *; geolocation; gamepad"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        }}
        title="Forged In Flame Dilemma"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
    </div>
  );
}

export default Introduction