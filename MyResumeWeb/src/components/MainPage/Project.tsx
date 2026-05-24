import { useMemo } from "react";
import type { ProjectProps } from "../../types/ProjectProps";
import type { FileProps } from "../../types/FileProps";
import type { ImageProps } from "../../types/ImageProps";
import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import ProjectImageGallery from "../Project/ProjectImageGallery.tsx";

function Project({ projects, files, imageDetails }: { projects: ProjectProps[]; files: FileProps[]; imageDetails: ImageProps[] }) {
    const Player = ReactPlayer as any;
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

    return (
        <div className="project-section">
            {sortedProjects.map((proj, index) => (
                <Card key={index} className="mx-auto mb-4 shadow-sm" style={{ width: '90%', borderLeft: '5px solid #FFA500' }}>
                    <Card.Body>
                        <Card.Title as="h3" className="mb-3">{proj.name}</Card.Title>

                        {proj.videoLinks && proj.videoLinks.length > 0 && (
                            (() => {
                                const videos = proj.videoLinks ?? [];

                                return (
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
                                );
                            })()
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
                                                {proj.projectFileIDs.map((id) => (
                                                    <Button
                                                        key={id}
                                                        as="a"
                                                        variant="primary"
                                                        size="sm"
                                                        href={`${getMetaPath(id)}/${id.toUpperCase()}_${getMetaName(id)}.pdf`}
                                                        download={`${getMetaName(id)}.pdf`}
                                                    >
                                                        Download {getMetaName(id) ?? `File ${id}`}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Project;