import { useState } from 'react';
import { Card, Col, Row } from "react-bootstrap";

interface ProjectDemoSectionProps {
    demos: string[];
    isActive?: boolean;
}

function ProjectDemoSection({ demos, isActive = true }: ProjectDemoSectionProps) {
    const [activeDemos, setActiveDemos] = useState<Record<number, boolean>>({});

    if (!isActive || !demos.length) {
        return null;
    }

    const handlePlayClick = (index: number) => {
        setActiveDemos((prev) => ({ ...prev, [index]: true }));
    };

    const handleCloseClick = (index: number) => {
        setActiveDemos((prev) => ({ ...prev, [index]: false }));
    };

    return (
        <Row className="g-3 mb-3 justify-content-center">
            <Col xs={12}>
                <Card className="shadow-sm">
                    <Card.Body className="p-0">
                        <div className="p-3 pb-0">
                            <Card.Title as="h5" className="mb-0">Demo <br></br> Click into game to play, Press 'ESC' and click 'Close Demo' to end.</Card.Title>
                        </div>
                        
                        <div className="row g-0 p-3 justify-content-center">
                            {demos.map((demoLink, index) => {
                                const isPlaying = activeDemos[index];
                                const isLastOddDemo = demos.length % 2 === 1 && index === demos.length - 1;

                                return (
                                    <div
                                        key={`${demoLink}-${index}`}
                                        className={isPlaying || isLastOddDemo ? "col-12 d-flex justify-content-center" : "col-12 col-md-6"}
                                    >
                                        <div 
                                            style={{ 
                                                width: "100%", 
                                                maxWidth: isLastOddDemo ? "min(100%, 760px)" : "100%",
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '4px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                aspectRatio: '980 / 660',
                                            }}
                                        >
                                            {isPlaying ? (
                                                <div 
                                                    style={{ 
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <button
                                                        onClick={() => handleCloseClick(index)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '12px',
                                                            right: '12px',
                                                            zIndex: 10,
                                                            padding: '6px 12px',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            color: '#fff',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff4b4b')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)')}
                                                    >
                                                        ✕ Close Demo
                                                    </button>

                                                    <div style={{
                                                        width: '980px',
                                                        height: '660px',
                                                        transform: 'scale(var(--iframe-scale, 1))',
                                                        transformOrigin: 'center center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        maxWidth: 'none',
                                                    } as any}
                                                    ref={(el) => {
                                                        if (!el) return;
                                                        const resizeObserver = new ResizeObserver(() => {
                                                            const parent = el.parentElement;
                                                            if (parent) {
                                                                const scale = Math.min(
                                                                    parent.clientWidth / 980,
                                                                    parent.clientHeight / 660
                                                                );
                                                                el.style.setProperty('--iframe-scale', scale.toString());
                                                            }
                                                        });
                                                        if (el.parentElement) resizeObserver.observe(el.parentElement);
                                                    }}
                                                    >
                                                        <iframe
                                                            src={demoLink}
                                                            frameBorder="0"
                                                            allowFullScreen={false}
                                                            width="980"
                                                            height="660"
                                                            style={{
                                                                border: 'none',
                                                                display: 'block',
                                                            }}
                                                            title={`Project Demo ${index + 1}`}
                                                        >
                                                            <p>Your browser does not support iframes.</p>
                                                        </iframe >
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        background: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75))',
                                                    }}
                                                    onClick={() => handlePlayClick(index)}
                                                >
                                                    <button
                                                        style={{
                                                            padding: '10px 20px',
                                                            fontSize: '16px',
                                                            fontWeight: 'bold',
                                                            color: '#fff',
                                                            backgroundColor: '#0070f3',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 4px 14px rgba(0, 112, 243, 0.3)',
                                                            transition: 'transform 0.1s ease',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                    >
                                                        Play Demo {demos.length > 1 ? index + 1 : ''}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default ProjectDemoSection;