import Introduction from "../components/MainPage/Introduction";
import Experience from "../components/MainPage/Experience";
import Education from "../components/MainPage/Education";
import Certification from "../components/MainPage/Certification";
import type { ExperienceProps } from "../types/ExperienceProps";
import type { EducationProps } from "../types/EducationProps";
import type { CertificationProps } from "../types/CertificationProps";
import type { InformationProps } from "../types/InformationProps";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExperienceService from "../services/ExperienceService";
import EducationService from "../services/EducationService";
import CertificationService from "../services/CertificationService";

function MainPage({ information }: { information: InformationProps }) {
    const [experienceData, setExperienceData] = useState<ExperienceProps[]>([]);
    const [educationData, setEducationData] = useState<EducationProps[]>([]);
    const [certificationData, setCertificationData] = useState<CertificationProps[]>([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const experiences = await ExperienceService.getExperiences();
                setExperienceData(experiences);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            }
        };

        const fetchEducation = async () => {
            try {
                const educations = await EducationService.getEducation();
                setEducationData(educations);
            } catch (error) {
                console.error("Error fetching education:", error);
            }
        };

        const fetchCertifications = async () => {
            try {
                const certifications = await CertificationService.getCertifications();
                setCertificationData(certifications);
            } catch (error) {
                console.error("Error fetching certifications:", error);
            }
        };

        fetchExperiences();
        fetchEducation();
        fetchCertifications();
    }, []);

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