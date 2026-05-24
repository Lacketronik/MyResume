import { useMemo, useState } from "react";
import type { ProjectProps } from "../../types/ProjectProps";
import type { FileProps } from "../../types/FileProps";
import type { ImageProps } from "../../types/ImageProps";
import { Accordion, Button, Card, Col, Row, useAccordionButton } from "react-bootstrap";
import ReactPlayer from "react-player";
import ProjectImageGallery from "../Project/ProjectImageGallery.tsx";
import ProjectPdfDetailsModal, { type ProjectPdfDetailsModalFile } from "../Project/ProjectPdfDetailsModal.tsx";

type ProjectAccordionHeaderProps = {
    eventKey: string;
    title: string;
};

function ProjectAccordionHeader({ eventKey, title }: ProjectAccordionHeaderProps) {
    const toggleAccordion = useAccordionButton(eventKey);

    return (
        <div className="project-accordion-header d-flex align-items-center gap-3 px-3 py-2">
            <Button
                variant="link"
                className="project-accordion-title-btn flex-grow-1 p-0 text-start text-decoration-none"
                onClick={toggleAccordion}
            >
                <span className="project-accordion-title">{title}</span>
            </Button>
        </div>
    );
}

function Project({ projects, files, imageDetails }: { projects: ProjectProps[]; files: FileProps[]; imageDetails: ImageProps[] }) {
    const Player = ReactPlayer as any;
    const [activePdfProject, setActivePdfProject] = useState<{
        name: string;
        files: ProjectPdfDetailsModalFile[];
    } | null>(null);
    const [activeProjectKey, setActiveProjectKey] = useState<string | null>(null);

    const fileMetas = useMemo(() => {
        return files.reduce<Record<string, FileProps>>((lookup, file) => {
            lookup[file.id.toUpperCase()] = file;
            return lookup;
        }, {});
    }, [files]);

    const imageMetaLookup = useMemo(() => {
        return imageDetails.reduce<Record<string, ImageProps>>((lookup, image) => {
            if (image.imageID) {
                lookup[image.imageID.toUpperCase()] = image;
            }
            return lookup;
        }, {});
    }, [imageDetails]);

    const sortedProjects = [...projects].sort((a, b) => {
        const aDate = a.projectDate ? new Date(a.projectDate).valueOf() : 0;
        const bDate = b.projectDate ? new Date(b.projectDate).valueOf() : 0;
        return bDate - aDate;
    });

    const getMetaName = (id: string) => fileMetas[id.toUpperCase()]?.name;

    const getMetaPath = (id: string) => fileMetas[id.toUpperCase()]?.path;

    const getImageSetName = (id: string) => imageMetaLookup[id.toUpperCase()]?.imageSet ?? 'NONE';

    const buildFileSrc = (id: string) => {
        const meta = fileMetas[id.toUpperCase()];

        if (!meta) {
            return "";
        }

        const normalizedPath = meta.path.replace(/\/+$/, "");
        return `${normalizedPath}/${meta.id.toUpperCase()}_${meta.name}.${meta.extension}`;
    };

    const openPdfDetails = (projectName: string, projectFileIDs: string[]) => {
        const modalFiles = projectFileIDs
            .map((id) => {
                const meta = fileMetas[id.toUpperCase()];

                if (!meta) {
                    return null;
                }

                const src = buildFileSrc(id);

                if (!src) {
                    return null;
                }

                return {
                    id: meta.id,
                    name: meta.name,
                    src,
                    downloadName: `${meta.name}.${meta.extension}`,
                };
            })
            .filter((file): file is ProjectPdfDetailsModalFile => file !== null);

        setActivePdfProject({
            name: projectName,
            files: modalFiles,
        });
    };

    const renderProjectContent = (proj: ProjectProps) => {
        const videos = proj.videoLinks ?? [];
        const hasProjectFiles = Boolean(proj.projectFileIDs && proj.projectFileIDs.length > 0);

        return (
            <Card.Body>
                {hasProjectFiles && (
                    <div className="d-flex justify-content-end mb-3">
                        <Button
                            variant="warning"
                            className="fw-semibold px-3 py-2 shadow-sm"
                            style={{ minWidth: "150px" }}
                            onClick={() => openPdfDetails(proj.name, proj.projectFileIDs ?? [])}
                        >
                            More Details
                        </Button>
                    </div>
                )}

                {videos.length > 0 && (
                    <Row className="g-3 mb-3">
                        <Col xs={12}>
                            <Card className="shadow-sm">
                                <Card.Body className="p-3">
                                    <Card.Title as="h5" className="mb-3">Video</Card.Title>
                                    {videos.length > 1 ? (
                                        <div className="row g-3">
                                            {videos.map((link, videoIndex) => {
                                                const isLastOddVideo = videos.length % 2 === 1 && videoIndex === videos.length - 1;

                                                return (
                                                    <div
                                                        key={videoIndex}
                                                        className={isLastOddVideo ? "col-12 d-flex justify-content-center" : "col-12 col-md-6"}
                                                    >
                                                        <div style={{ width: "100%", maxWidth: isLastOddVideo ? "min(100%, 760px)" : "100%" }}>
                                                            <Player
                                                                src={link}
                                                                controls
                                                                width="100%"
                                                                height="360px"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div style={{ width: '100%' }}>
                                            <Player
                                                src={videos[0]}
                                                controls
                                                width="100%"
                                                height="360px"
                                            />
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                <Row className="g-3">
                    <Col xs={12} lg={7} className="d-flex">
                        <Card className="flex-fill">
                            <Card.Body>
                                <Card.Title as="h5">Description</Card.Title>
                                <Card.Text className="mb-0 text-start text-muted small">{proj.description}</Card.Text>
                                {proj.githubUrl && (
                                    <div className="mt-3">
                                        <Button variant="outline-secondary" href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                                            View on GitHub
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} lg={5} className="d-flex">
                        <Card className="flex-fill">
                            <Card.Body>
                                <Card.Title as="h5">Images & Documents</Card.Title>

                                <div className="d-flex flex-column gap-4 mb-3">
                                    {Object.entries(
                                        (proj.imageBlobIDs ?? []).reduce<Record<string, string[]>>((groups, id) => {
                                            const setName = getImageSetName(id.toUpperCase());
                                            const groupName = setName === 'NONE' ? 'NONE' : setName;

                                            if (!groups[groupName]) {
                                                groups[groupName] = [];
                                            }

                                            groups[groupName].push(id.toUpperCase());
                                            return groups;
                                        }, {})
                                    ).map(([setName, imageIDs]) => (
                                        <div key={setName} className="d-flex flex-column gap-2">
                                            {setName !== 'NONE' && (
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

                                {proj.projectFileIDs && proj.projectFileIDs.length > 0 && (
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        {proj.projectFileIDs.map((id) => {
                                            const meta = fileMetas[id.toUpperCase()];
                                            const fileSrc = buildFileSrc(id);

                                            return (
                                                <Button
                                                    key={id}
                                                    as="a"
                                                    variant="primary"
                                                    size="sm"
                                                    href={fileSrc || undefined}
                                                    download={meta ? `${meta.name}.${meta.extension}` : undefined}
                                                    disabled={!fileSrc}
                                                >
                                                    Download {getMetaName(id) ?? `File ${id}`}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        );
    };

    return (
        <>
            <Accordion
                className="project-section"
                activeKey={activeProjectKey ?? undefined}
                onSelect={(eventKey) => {
                    setActiveProjectKey(typeof eventKey === "string" ? eventKey : null);
                }}
            >
                {sortedProjects.map((proj) => (
                    <Card
                        key={proj.name}
                        className="mx-auto mb-4 shadow-sm"
                        style={{ width: '90%', borderLeft: '5px solid #FFA500' }}
                    >
                        <Card.Header className="p-0 border-0 bg-transparent">
                            <ProjectAccordionHeader
                                eventKey={proj.name}
                                title={proj.name}
                            />
                        </Card.Header>

                        <Accordion.Collapse eventKey={proj.name}>
                            {renderProjectContent(proj)}
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>

            <ProjectPdfDetailsModal
                show={activePdfProject !== null}
                projectName={activePdfProject?.name ?? "Project Details"}
                files={activePdfProject?.files ?? []}
                onHide={() => setActivePdfProject(null)}
            />
        </>
    );
}

export default Project;