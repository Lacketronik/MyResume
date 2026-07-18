import type { ExperienceProps } from "../../types/ExperienceProps";
import { formatDate } from "../../helpers/dates";
import "../../styles/Experience.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function WorkIcon({ iconFilePath }: { iconFilePath: string }) {
    return (
        <img src={iconFilePath} alt="Work Icon" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
    );
}

function Experience({ experiences }: { experiences: ExperienceProps[] }) {
    const sorted = [...experiences].sort((a, b) => {
        const aDate = a.endDate ? new Date(a.endDate).valueOf() : new Date(a.startDate).valueOf();
        const bDate = b.endDate ? new Date(b.endDate).valueOf() : new Date(b.startDate).valueOf();
        return bDate - aDate;
    });

    return (
        <div className="experience-section">
            {sorted.map((exp, index) => (
                <VerticalTimeline key={index} layout="2-columns" lineColor="#ff9900" animate={true}>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgba(27, 36, 55, 0.725)', borderRadius: '0.75rem', color: '#fff', boxShadow: '0 0 0 0px' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgba(27, 36, 55, 0.725)' }}
                        date={`${exp.startDate && formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`}
                        iconStyle={{ background: '#ff990000', color: '#fff', boxShadow: '0 0 0 4px #ff9900' }}
                        icon={ <WorkIcon iconFilePath={exp.iconFilePath} /> }
                        position={index % 2 === 0 ? 'left' : 'right'}
                    >
                        <h3 className="vertical-timeline-element-title" style={{ marginBottom: '0.5rem' }}>{exp.position}</h3>
                        <h5 className="vertical-timeline-element-subtitle text-primary" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>{exp.company}</h5>
                        <ul className="list-unstyled ps-0">
                            {exp.responsibilities.map((resp, index) => (
                                <li key={index} className="mb-1 text-muted" style={{ fontSize: '0.8rem', textAlign: 'left', padding: '0.25rem 0' }}>{resp}</li>
                            ))}
                        </ul>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            ))}
        </div>
    );
}

export default Experience;