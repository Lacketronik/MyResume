import { Button, Card, Col } from "react-bootstrap";
import ProjectImageGallery from "./ProjectImageGallery.tsx";

type ProjectAssetsSectionProps = {
    imageBlobIDs?: string[];
    projectFileIDs?: string[];
    getMetaName: (id: string) => string | undefined;
    getMetaPath: (id: string) => string | undefined;
    getImageSetName: (id: string) => string;
    buildFileSrc: (id: string) => string;
};

function ProjectAssetsSection({
    imageBlobIDs,
    projectFileIDs,
    getMetaName,
    getMetaPath,
    getImageSetName,
    buildFileSrc,
}: ProjectAssetsSectionProps) {
    if (!imageBlobIDs?.length && !projectFileIDs?.length) {
        return null;
    }
    return (
        <Col xs={12} lg={5} className="d-flex" style={{ textAlign: "center", justifyContent: "center" }}>
            <Card className="flex-fill" style= {{ border: "none" }}>
                <Card.Body style={{ background: "rgba(17, 24, 39, 0.45)" }}>
                    <Card.Title as="h5" className="mb-3 d-inline-block pb-1" style={{ borderBottom: "3px solid var(--accent)" }}>
                        {imageBlobIDs?.length && projectFileIDs?.length
                            ? "Images & Documents"
                            : imageBlobIDs?.length && !projectFileIDs?.length
                            ? "Images"
                            : !imageBlobIDs?.length && projectFileIDs?.length
                            ? "Documents"
                            : null}
                    </Card.Title>

                    <div className="d-flex flex-column gap-4 mb-3">
                        {Object.entries(
                            (imageBlobIDs ?? []).reduce<Record<string, string[]>>((groups, id) => {
                                const setName = getImageSetName(id.toUpperCase());
                                const groupName = setName === "NONE" ? "NONE" : setName;

                                if (!groups[groupName]) {
                                    groups[groupName] = [];
                                }

                                groups[groupName].push(id.toUpperCase());
                                return groups;
                            }, {})
                        ).map(([setName, imageIDs]) => (
                            <div key={setName} className="d-flex flex-column gap-2">
                                {setName !== "NONE" && (
                                    <Card.Subtitle as="h6" className="text-muted mb-0">
                                        {setName}
                                    </Card.Subtitle>
                                )}

                                <ProjectImageGallery
                                    imageIDs={imageIDs}
                                    getImageLabel={(id, imageIndex) => getMetaName(id.toUpperCase()) ?? `Image ${imageIndex + 1}`}
                                    getImageSrc={(id) => {
                                        const imagePath = getMetaPath(id.toUpperCase());
                                        const imageName = getMetaName(id.toUpperCase());
                                        return imagePath && imageName ? `${imagePath}/${id.toUpperCase()}_${imageName}.webp` : "";
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {projectFileIDs && projectFileIDs.length > 0 && (
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {projectFileIDs.map((id) => {
                                const meta = getMetaName(id);
                                const fileSrc = buildFileSrc(id);

                                return (
                                    <Button
                                        key={id}
                                        as="a"
                                        className="profile-btn"
                                        size="sm"
                                        href={fileSrc || undefined}
                                        download={meta ? `${meta}.pdf` : undefined}
                                        disabled={!fileSrc}
                                    >
                                        Download {meta ?? `File ${id}`}
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProjectAssetsSection;