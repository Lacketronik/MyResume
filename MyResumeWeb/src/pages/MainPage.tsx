import Introduction from "../components/MainPage/Introduction";
import Experience from "../components/MainPage/Experience";
import Education from "../components/MainPage/Education";
import Certification from "../components/MainPage/Certification";
import type { ExperienceProps } from "../types/ExperienceProps";
import type { EducationProps } from "../types/EducationProps";
import type { CertificationProps } from "../types/CertificationProps";
import type { InformationProps } from "../types/InformationProps";
import { Tabs, Tab } from "react-bootstrap";

function MainPage({ information }: { information: InformationProps }) {
    // sample data for testing
    const experienceData: ExperienceProps[] = [
        {
            position: "Software Engineer",
            company: "Tech Company",
            startDate: new Date("2020-01-01"),
            endDate: new Date("2022-12-31"),
            responsibilities: [
                "Developed and maintained web applications using React and Node.js.",
                "Collaborated with cross-functional teams to design and implement new features.",
                "Optimized application performance and scalability."
            ]
        },
        {
            position: "DevOps Engineer",
            company: "Cloud Solutions Inc.",
            startDate: new Date("2023-01-01"),
            endDate: new Date("Present"),
            responsibilities: [
                "Managed cloud infrastructure using AWS and Azure.",
                "Implemented CI/CD pipelines to automate deployment processes.",
                "Monitored and optimized system performance and reliability."
            ]
        }
    ];

    const educationData: EducationProps[] = [
        {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            graduationDate: new Date("2019-06-30")
        },
        {
            institution: "Online University",
            degree: "Master of Science in Software Engineering",
            graduationDate: new Date("2022-12-31")
        }
    ];

    const certificationData: CertificationProps[] = [
        {
            id: 1,
            title: "Certified React Developer",
            provider: "React Certification Board",
            examCode: "CRD-2021",
            issueDate: new Date("2021-05-15"),
            expirationDate: new Date("2024-05-15"),
            status: 'Active' as 'Active',
            verificationLink: "https://example.com/verify-cert"
        },
        {
            id: 2,
            title: "AWS Certified Solutions Architect",
            provider: "Amazon Web Services",
            examCode: "AWS-CSA-2022",
            issueDate: new Date("2022-03-10"),
            expirationDate: new Date("2025-03-10"),
            status: 'Active' as 'Active',
            verificationLink: "https://example.com/verify-cert"
        }
    ];

  return (
    <div className="MainPage">
      <Introduction information={information} />
        <Tabs defaultActiveKey="experience" id="main-page-tabs" className="justify-content-center mb-3 fs-2">
            <Tab eventKey="experience" title="Experience">
                <Experience experiences={experienceData} />
            </Tab>
            <Tab eventKey="education" title="Education">
                <Education educations={educationData} />
            </Tab>
            <Tab eventKey="certification" title="Certification">
                <Certification certs={certificationData} />
            </Tab>
        </Tabs>
    </div>
  );
}

export default MainPage