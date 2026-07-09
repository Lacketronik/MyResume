import "../../styles/Project.css";
import { useMemo, useState } from "react";
import type { ProjectProps } from "../../types/ProjectProps";
import type { FileProps } from "../../types/FileProps";
import type { ImageProps } from "../../types/ImageProps";
import { Accordion, Button, Card } from "react-bootstrap";
import ProjectPdfDetailsModal, { type ProjectPdfDetailsModalFile } from "../Project/ProjectPdfDetailsModal.tsx";
import ProjectAccordionHeader from "../Project/ProjectAccordionHeader.tsx";
import ProjectVideoSection from "../Project/ProjectVideoSection.tsx";
import ProjectDemoSection from "../Project/ProjectDemoSection.tsx";
import ProjectDescriptionSection from "../Project/ProjectDescriptionSection.tsx";
import ProjectAssetsSection from "../Project/ProjectAssetsSection.tsx";
import FilterBadge from "../Project/ProjectFilterBadge.tsx";
import { Dropdown } from "react-bootstrap";

function Project({ projects, files, imageDetails }: { projects: ProjectProps[]; files: FileProps[]; imageDetails: ImageProps[] }) {
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

    const [selectedTag, setSelectedTag] = useState<string | null>(null); 

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach(p => p.technologies?.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (!selectedTag) return projects;
        return projects.filter(p => p.technologies?.includes(selectedTag));
    }, [projects, selectedTag]);

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        const aDate = a.projectDate ? new Date(a.projectDate).valueOf() : 0;
        const bDate = b.projectDate ? new Date(b.projectDate).valueOf() : 0;
        return bDate - aDate;
    });

    const getMetaName = (id: string) => fileMetas[id.toUpperCase()]?.name;

    const getMetaPath = (id: string) => fileMetas[id.toUpperCase()]?.path;

    const getImageSetName = (id: string) => imageMetaLookup[id.toUpperCase()]?.imageSet ?? 'NONE';

    const getProjectFileIDs = (projectFileIDs: string[]) => {
        return [...projectFileIDs].sort((leftID, rightID) => {
            const leftName = fileMetas[leftID.toUpperCase()]?.name ?? leftID;
            const rightName = fileMetas[rightID.toUpperCase()]?.name ?? rightID;

            const normalizedLeftName = leftName.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_?/i, "");
            const normalizedRightName = rightName.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_?/i, "");

            return normalizedLeftName.localeCompare(normalizedRightName, undefined, { sensitivity: "base", numeric: true });
        });
    };

    const buildFileSrc = (id: string) => {
        const meta = fileMetas[id.toUpperCase()];

        if (!meta) {
            return "";
        }

        const normalizedPath = meta.path.replace(/\/+$/, "");
        return `${normalizedPath}/${meta.id.toUpperCase()}_${meta.name}.${meta.extension}`;
    };

    const openPdfDetails = (projectName: string, projectFileIDs: string[]) => {
        const modalFiles = getProjectFileIDs(projectFileIDs)
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
        const hasAssets = (proj.imageBlobIDs && proj.imageBlobIDs?.length > 0) || (proj.projectFileIDs && proj.projectFileIDs?.length > 0);
        return (
            <Card.Body style={{ background: "rgba(17, 24, 39, 0.45)" }}>
                {proj.projectFileIDs && proj.projectFileIDs.length > 0 && (
                    <div className="d-flex justify-content-center mb-3">
                        <Button
                            className="profile-btn"
                            style={{ minWidth: "150px" }}
                            size="sm"
                            onClick={() => openPdfDetails(proj.name, proj.projectFileIDs ?? [])}
                        >
                            More Details
                        </Button>
                    </div>
                )}

                <ProjectVideoSection
                    videos={proj.videoLinks ?? []}
                    //isActive={activeProjectKey === proj.name}
                />

                <ProjectDemoSection demos={proj.demos ?? []} />
                
                
                <div className="g-3 row">
                    <div className={hasAssets ? "col-lg-7" : "col-12"}>
                        <ProjectDescriptionSection descriptions={proj.descriptions} githubUrl={proj.githubUrl} />
                    </div>
                    
                    <ProjectAssetsSection
                        imageBlobIDs={proj.imageBlobIDs}
                        projectFileIDs={getProjectFileIDs(proj.projectFileIDs ?? [])}
                        getMetaName={getMetaName}
                        getMetaPath={getMetaPath}
                        getImageSetName={getImageSetName}
                        buildFileSrc={buildFileSrc}
                    />
                </div>
            </Card.Body>
        );
    };

    return (
        <>
            <Dropdown style={{width: '250px', marginRight: 'auto', marginLeft: 'auto'}}>
                <Dropdown.Toggle variant="secondary">
                    {selectedTag ?? "All Tags"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="bg-dark border-secondary" 
                    style={{ 
                        maxHeight: '300px',   
                        overflowY: 'auto'     
                    }}>
                    <Dropdown.Item
                    onClick={() => setSelectedTag(null)}
                    className="bg-dark"
                    >
                    <FilterBadge
                        label="All"
                        isActive={selectedTag === null}
                    />
                    </Dropdown.Item>

                    <Dropdown.Divider className="border-secondary" />

                    {allTags.map((tag) => (
                    <Dropdown.Item
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="bg-dark"
                    >
                        <FilterBadge
                        label={tag}
                        isActive={selectedTag === tag}
                        />
                    </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

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
                        className="mx-auto mb-4"
                        style={{ width: '90%', border: 'none', borderRadius: '0.75rem', overflow: 'hidden' }}
                    >
                        <Card.Header className="p-0 border-0 bg-transparent">
                            <ProjectAccordionHeader
                                eventKey={proj.name}
                                title={proj.name}
                                technologies={proj.technologies ?? []}
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