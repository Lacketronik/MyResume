import { useEffect, useState } from "react";
import type { ProjectProps } from "../../types/ProjectProps";
import type { FileProps } from "../../types/FileProps";
import FileService from "../../services/FileService";
import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import ProjectImageGallery from "../Project/ProjectImageGallery";

function Project({ projects }: { projects: ProjectProps[] }) {
    const [fileMetas, setFileMetas] = useState<Record<string, FileProps>>({});
    const Player = ReactPlayer as any;

    const getMetaName = (id: string) => fileMetas[id]?.name;

    const getMetaPath = (id: string) => fileMetas[id]?.path;

    useEffect(() => {
        let mounted = true;

        const fileIDs = Array.from(
            new Set(
                projects.flatMap((proj) => [
                    ...(proj.projectFileIDs ?? []),
                    ...(proj.imageBlobIDs ?? []),
                ])
            )
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
                    return { id, meta: { id, name: `File ${id}`, path: '', extension: '', type: '' } };
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
    }, [projects]);

    return (
        <div className="project-section">
            {projects.map((proj, index) => (
                <Card key={index} className="mx-auto mb-4 shadow-sm" style={{ width: '90%', borderLeft: '5px solid #FFA500' }}>
                    <Card.Body>
                        <Card.Title as="h3" className="mb-3">{proj.name}</Card.Title>

                        {proj.videoLinks && proj.videoLinks.length > 0 && (
                            <Row className="g-3 mb-3">
                                <Col xs={12}>
                                    <Card className="shadow-sm">
                                        <Card.Body className="p-3">
                                            <Card.Title as="h5" className="mb-3">Video</Card.Title>
                                            <div className="d-flex flex-column gap-3">
                                                {proj.videoLinks.map((link, videoIndex) => (
                                                    <div key={videoIndex} style={{ width: '100%' }}>
                                                        <Player
                                                            src={link}
                                                            controls
                                                            width="100%"
                                                            height="360px"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
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

                                        <div className="mb-3">
                                            <ProjectImageGallery
                                                imageIDs={proj.imageBlobIDs ?? []}
                                                getImageLabel={(id, imageIndex) => getMetaName(id) ?? `Image ${imageIndex + 1}`}
                                                getImageSrc={(id) => {
                                                    const imagePath = getMetaPath(id);
                                                    const imageName = getMetaName(id);

                                                    if (imagePath && imageName) {
                                                        return `${imagePath}/${id}_${imageName}.webp`;
                                                    }

                                                    return `/api/blobs/${id}`;
                                                }}
                                                getImagePath={(id) => getMetaPath(id)}
                                            />
                                        </div>

                                        {proj.projectFileIDs && proj.projectFileIDs.length > 0 && (
                                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                                {proj.projectFileIDs.map((id) => (
                                                    <Button
                                                        key={id}
                                                        as="a"
                                                        variant="primary"
                                                        size="sm"
                                                        href={`${getMetaPath(id)}/${id}_${getMetaName(id)}.pdf`}
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