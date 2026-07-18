import type { EducationProps } from "../../types/EducationProps";
import { formatDate } from "../../helpers/dates";
import "../../styles/Education.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function EducationIcon({ iconFilePath }: { iconFilePath: string }) {
    return (
        <img src={iconFilePath} alt="Education Icon" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
    );
}

function Education({ educations }: { educations: EducationProps[] }) {
    const sorted = [...educations].sort((a, b) => {
        const aDate = a.graduationDate ? new Date(a.graduationDate).valueOf() : 0;
        const bDate = b.graduationDate ? new Date(b.graduationDate).valueOf() : 0;
        return bDate - aDate;
    });

    return (
        <div className="education-section">
            {sorted.map((edu, index) => (
                <VerticalTimeline key={index} layout="2-columns" lineColor="#ff9900" animate={true}>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        contentStyle={{ background: 'rgba(27, 36, 55, 0.725)', borderRadius: '0.75rem', color: '#fff', boxShadow: '0 0 0 0px' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgba(27, 36, 55, 0.725)' }}
                        date={formatDate(edu.graduationDate)}
                        iconStyle={{ background: '#ff990000', color: '#fff', boxShadow: '0 0 0 4px #ff9900' }}
                        icon={ <EducationIcon iconFilePath={edu.iconFilePath} /> }
                        position={index % 2 === 0 ? 'left' : 'right'}
                    >
                        <h4 className="vertical-timeline-element-title" style={{ marginBottom: '0.5rem' }}>{edu.degree}</h4>
                        <h5 className="vertical-timeline-element-subtitle text-primary">{edu.institution}</h5>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            ))}
        </div>
    );
}

export default Education;