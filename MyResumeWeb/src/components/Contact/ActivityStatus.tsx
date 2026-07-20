import type { ActivityStatusProp } from "../../types/ActivityStatusProp";
import { Container, Row } from "react-bootstrap";
import { FaSpotify, FaYoutube, FaMusic } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import "../../styles/Glow.css";

function ActivityStatus({ ActivityStatusProps }: { ActivityStatusProps: ActivityStatusProp[] }) { 
    
    const renderMusicContent = (text: string, link: string | undefined) => {
        if (!link) return <span><FaMusic className="me-2 text-secondary" /> {text}</span>;
        
        const url = link.toLowerCase();
        let IconComponent = FaMusic;
        let iconColorClass = "text-secondary";
        
        if (url.includes("spotify")) {
            IconComponent = FaSpotify;
            iconColorClass = "text-success";
        } else if (url.includes("youtube") || url.includes("youtu.be")) {
            IconComponent = FaYoutube;
            iconColorClass = "text-danger";
        } else if (url.includes("apple")) {
            IconComponent = SiApplemusic;
            iconColorClass = "text-danger";
        }

        return (
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none d-inline-flex align-items-center"
            >
                <IconComponent className={`me-2 ${iconColorClass}`} size={18} />
                <span>{text}</span>
            </a>
        );
    };

    return (
        <Container fluid className="px-0">
            {ActivityStatusProps.map((activityStatus, index) => (
                <Row key={index} className="mb-3 flex-column">
                    
                    <div className="fw-bold garden-title mb-1">
                        {activityStatus.activity} :
                    </div>
                    
                    <div className="garden-content">
                        {activityStatus.display_text.map((text, textIndex) => {
                            const link = activityStatus.links?.[textIndex];
                            const isPlainText = !link || link === "undefined";

                            return (
                                <span 
                                    key={textIndex} 
                                    className="d-inline-block me-3 garden-summary text-muted"
                                >
                                    {activityStatus.activity === "Listening To" ? (
                                        renderMusicContent(text, isPlainText ? undefined : link)
                                    ) : (
                                        isPlainText ? (
                                            activityStatus.activity === "Status" ? (
                                                text.toLowerCase().includes("open") ? (
                                                    <div>
                                                        <span className="permanent-glow-emoji">🟢 </span> <span style={{ color: '#39FF14' }}>{text}</span>
                                                    </div>
                                                ) : (
                                                    <span>🔵 {text}</span>
                                                )
                                            ) : (
                                                <span>{text}</span>
                                            )
                                        ) : (
                                            <a 
                                                href={link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-decoration-none"
                                            >
                                                {text}
                                            </a>
                                        )
                                    )}
                                </span>
                            );
                        })}
                    </div>
                    
                </Row>
            ))}
        </Container>
    );
}

export default ActivityStatus;