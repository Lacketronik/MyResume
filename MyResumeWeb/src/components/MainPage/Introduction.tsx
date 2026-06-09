import type { InformationProps } from "../../types/InformationProps";
import type { FileProps } from "../../types/FileProps";
import { useMemo } from "react";
import { Button, Card } from "react-bootstrap";

function Introduction({ information, files }: { information: InformationProps; files: FileProps[] }) {
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
    <div className="Introduction">
      <Card className="shadow-sm bg-dark text-light intro-card">
        <Card.Body className="p-4 p-xl-5">
          <div className="intro-avatar-wrap mb-4 mx-auto">
            <img
              src={profileImageSrc ?? fallbackProfileImage}
              alt={information.name}
              className="intro-avatar"
            />
          </div>

          <div className="text-center">
            <h1 className="mb-2">{information.name}</h1>
            <h2 className="h4 text-secondary mb-4">{information.role.join(" | ")}</h2>
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
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

    </div>
  );
}

export default Introduction