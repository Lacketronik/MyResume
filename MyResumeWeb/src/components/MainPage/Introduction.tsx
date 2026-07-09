import "../../styles/Introduction.css";
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
      <Card style={{ border: "none", borderRadius:"0.75rem", overflow:'hidden' }}>
        <Card.Body className="p-4 p-xl-3" style={{ background: "rgba(17, 24, 39, 0.45)" }}>
          <div className="intro-avatar-wrap mb-3 mx-auto">
            <img
              src={profileImageSrc ?? fallbackProfileImage}
              alt={information.name}
              className="intro-avatar"
            />
          </div>

          <div className="intro-bio">
            {information.introduction.map((paragraph, index) => (
              <Card.Text className="intro-bio-text text-muted" key={index}>
                {paragraph}
              </Card.Text>
            ))}
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-1">
            {/* {information.linkedin && (
              <Button className="profile-btn" href={information.linkedin} target="_blank" rel="noopener noreferrer" size="sm">
                LinkedIn Profile
              </Button>
            )}
            {information.github && (
              <Button className="profile-btn" href={information.github} target="_blank" rel="noopener noreferrer" size="sm">
                GitHub Profile
              </Button>
            )} */}
            {resumeFileID && (
              <Button
                className="profile-btn"
                as="a"
                size="sm"
                href={resumeFileSrc}
                disabled={!resumeFileSrc}
                download={information.name.replace(/\s+/g, '_') + '_Resume.pdf'}
              >
                Download Resume
              </Button>
            )}
            {resumeFileID && (
              <Button
                className="profile-btn"
                as="a"
                size="sm"
                href={resumeFileSrc}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

    </div>
  );
}

export default Introduction