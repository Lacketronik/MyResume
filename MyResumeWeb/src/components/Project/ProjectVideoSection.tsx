import { Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";

type ProjectVideoSectionProps = {
    videos: string[];
};

function ProjectVideoSection({ videos }: ProjectVideoSectionProps) {
    if (videos.length === 0) {
        return null;
    }

    const Player = ReactPlayer as any;

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
                                    const videoID = link.split("/").pop() ?? link;

                                    return (
                                        <div
                                            key={videoID}
                                            id={videoID}
                                            className={isLastOddVideo ? "col-12 d-flex justify-content-center" : "col-12 col-md-6 "}
                                        >
                                            <div style={{ width: "100%", maxWidth: isLastOddVideo ? "min(100%, 760px)" : "100%" }}>
                                                <Player
                                                    src={link}
                                                    //light={true}
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
                            <div style={{ width: "100%" }}>
                                <Player
                                    src={videos[0]}
                                    //light = {true}
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
}

export default ProjectVideoSection;