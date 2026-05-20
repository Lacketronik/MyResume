import { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";

type ProjectImageGalleryProps = {
    imageIDs: string[];
    getImageLabel: (id: string, index: number) => string;
    getImageSrc: (id: string) => string;
    getImagePath?: (id: string) => string | undefined;
    fallbackImageSrc?: string;
};

function ProjectImageGallery({
    imageIDs,
    getImageLabel,
    getImageSrc,
    getImagePath,
    fallbackImageSrc = "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
                <rect width="640" height="360" rx="24" fill="#e9ecef"/>
                <rect x="44" y="44" width="552" height="272" rx="18" fill="#f8f9fa" stroke="#ced4da" stroke-width="5" stroke-dasharray="14 10"/>
                <path d="M164 238l78-84 56 58 42-46 92 102H164z" fill="#adb5bd"/>
                <circle cx="238" cy="146" r="26" fill="#adb5bd"/>
                <text x="320" y="308" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#6c757d">Image Preview</text>
            </svg>
        `),
}: ProjectImageGalleryProps) {
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const visibleImages = useMemo(() => {
        if (imageIDs.length <= 3) {
            return imageIDs;
        }

        return Array.from({ length: 3 }, (_, offset) => imageIDs[(startIndex + offset) % imageIDs.length]);
    }, [imageIDs, startIndex]);

    if (imageIDs.length === 0) {
        return null;
    }

    const canCycle = imageIDs.length > 1;

    const moveLeft = () => {
        if (!canCycle) {
            return;
        }
        setStartIndex((current) => (current - 1 + imageIDs.length) % imageIDs.length);
    };

    const moveRight = () => {
        if (!canCycle) {
            return;
        }
        setStartIndex((current) => (current + 1) % imageIDs.length);
    };

    const moveModalLeft = () => {
        if (activeIndex === null || imageIDs.length === 0) {
            return;
        }

        setActiveIndex((current) => (current === null ? null : (current - 1 + imageIDs.length) % imageIDs.length));
    };

    const moveModalRight = () => {
        if (activeIndex === null || imageIDs.length === 0) {
            return;
        }

        setActiveIndex((current) => (current === null ? null : (current + 1) % imageIDs.length));
    };

    const activeImageID = activeIndex === null ? null : imageIDs[activeIndex];

    return (
        <>
            <div className="d-flex align-items-center gap-2 w-100">
                <Button
                    variant="outline-secondary"
                    onClick={moveLeft}
                    disabled={!canCycle}
                    aria-label="Previous images"
                    style={{ minWidth: 40 }}
                >
                    ‹
                </Button>

                <div
                    className="flex-grow-1"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "0.5rem",
                    }}
                >
                    {visibleImages.map((id, index) => {
                        const actualIndex = imageIDs.indexOf(id);
                        const label = getImageLabel(id, actualIndex);

                        return (
                            <button
                                key={`${id}-${index}`}
                                type="button"
                                onClick={() => setActiveIndex(actualIndex)}
                                className="border-0 bg-transparent p-0 text-start"
                                style={{ minWidth: 0, width: "100%" }}
                            >
                                <div
                                    className="bg-body-tertiary rounded-3 overflow-hidden shadow-sm"
                                    style={{
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        height: 220,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: "1 1 auto",
                                            minHeight: 0,
                                            width: "100%",
                                            overflow: "hidden",
                                            background: "#f8f9fa",
                                        }}
                                    >
                                        <img
                                            src={getImageSrc(id) ?? fallbackImageSrc}
                                            alt={label}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </div>
                                    <div className="px-2 py-2" style={{ flex: "0 0 56px" }}>
                                        <div className="text-truncate small fw-medium" title={label}>{label}</div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <Button
                    variant="outline-secondary"
                    onClick={moveRight}
                    disabled={!canCycle}
                    aria-label="Next images"
                    style={{ minWidth: 40 }}
                >
                    ›
                </Button>
            </div>

            <Modal
                show={activeIndex !== null}
                onHide={() => setActiveIndex(null)}
                centered
                size="xl"
                contentClassName="bg-dark text-light"
                dialogClassName="project-gallery-modal"
            >
                <Modal.Body
                    className="p-0 bg-black"
                    style={{
                        height: "70vh",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {activeImageID && (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    top: 12,
                                    left: 12,
                                    zIndex: 2,
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: 10,
                                    backgroundColor: "rgba(17,24,39,0.72)",
                                    color: "#ffffff",
                                    maxWidth: "calc(100% - 24px)",
                                }}
                            >
                                <div className="fw-semibold text-truncate">
                                    {getImageLabel(activeImageID, activeIndex ?? 0)}
                                </div>
                            </div>
                            <Button
                                variant="dark"
                                onClick={moveModalLeft}
                                disabled={!canCycle}
                                aria-label="Previous image"
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 2,
                                    width: 56,
                                    height: 72,
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: "#ffffff",
                                    backgroundColor: "rgba(17,24,39,0.72)",
                                    borderColor: "rgba(255,255,255,0.35)",
                                    boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                                }}
                            >
                                ‹
                            </Button>
                            <img
                                src={getImageSrc(activeImageID) ?? fallbackImageSrc}
                                alt={getImageLabel(activeImageID, activeIndex ?? 0)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    margin: "0 auto",
                                }}
                            />
                            <Button
                                variant="dark"
                                onClick={moveModalRight}
                                disabled={!canCycle}
                                aria-label="Next image"
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 2,
                                    width: 56,
                                    height: 72,
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: "#ffffff",
                                    backgroundColor: "rgba(17,24,39,0.72)",
                                    borderColor: "rgba(255,255,255,0.35)",
                                    boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                                }}
                            >
                                ›
                            </Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProjectImageGallery;
