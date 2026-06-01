import { Card, Col, Row } from "react-bootstrap";

type ProjectVideoSectionProps = {
    videos: string[];
};

function getYouTubeVideoId(link: string) {
    try {
        const url = new URL(link);
        const host = url.hostname.replace(/^www\./, "").toLowerCase();

        if (host === "youtu.be") {
            return url.pathname.split("/").filter(Boolean)[0] ?? null;
        }

        if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
            if (url.pathname === "/watch") {
                return url.searchParams.get("v");
            }

            const pathParts = url.pathname.split("/").filter(Boolean);
            if (pathParts[0] === "embed" || pathParts[0] === "shorts") {
                return pathParts[1] ?? null;
            }
        }
    } catch {
        return null;
    }

    return null;
}

function buildYouTubeEmbedUrl(link: string) {
    const videoId = getYouTubeVideoId(link);

    if (!videoId) {
        return null;
    }

    const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
    embedUrl.searchParams.set("rel", "0");
    embedUrl.searchParams.set("modestbranding", "1");
    embedUrl.searchParams.set("playsinline", "1");

    return embedUrl.toString();
}

function ProjectVideoSection({ videos }: ProjectVideoSectionProps) {
    if (videos.length === 0) {
        return null;
    }

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
                                    const videoID = getYouTubeVideoId(link) ?? `${link}-${videoIndex}`;
                                    const embedUrl = buildYouTubeEmbedUrl(link);

                                    return (
                                        <div
                                            key={videoID}
                                            id={videoID}
                                            className={isLastOddVideo ? "col-12 d-flex justify-content-center" : "col-12 col-md-6 "}
                                        >
                                            <div style={{ width: "100%", maxWidth: isLastOddVideo ? "min(100%, 760px)" : "100%" }}>
                                                {embedUrl ? (
                                                    <iframe
                                                        title={`YouTube video ${videoID}`}
                                                        src={embedUrl}
                                                        width="100%"
                                                        height="360"
                                                        style={{ border: 0 }}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                        loading="lazy"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                    />
                                                ) : (
                                                    <div className="text-center text-light-emphasis py-5">
                                                        Unsupported video URL
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ width: "100%" }}>
                                {buildYouTubeEmbedUrl(videos[0]) ? (
                                    <iframe
                                        title="YouTube video"
                                        src={buildYouTubeEmbedUrl(videos[0]) ?? undefined}
                                        width="100%"
                                        height="360"
                                        style={{ border: 0 }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                ) : (
                                    <div className="text-center text-light-emphasis py-5">
                                        Unsupported video URL
                                    </div>
                                )}
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default ProjectVideoSection;