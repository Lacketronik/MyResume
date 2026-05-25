import Introduction from "../components/MainPage/Introduction";
import Experience from "../components/MainPage/Experience";
import Education from "../components/MainPage/Education";
import Certification from "../components/MainPage/Certification";
import Project from "../components/MainPage/Project";
import { Tabs, Tab } from "react-bootstrap";
import PersistentAlert from "../components/MainPage/Banner";
import type { PortfolioProps } from "../types/PortfolioProps";

function MainPage({ portfolio }: { portfolio: PortfolioProps }) {

  return (
    <div className="MainPage">
        <PersistentAlert />
      <Introduction information={portfolio.information} files={portfolio.files} />
        <Tabs defaultActiveKey="experience" id="main-page-tabs" className="justify-content-center mb-3 fs-2">
            <Tab eventKey="experience" title="Experience">
                <Experience experiences={portfolio.experiences} />
            </Tab>
            <Tab eventKey="education" title="Education">
                <Education educations={portfolio.educations} />
            </Tab>
            <Tab eventKey="certification" title="Certification">
                <Certification certs={portfolio.certifications} />
            </Tab>
            <Tab eventKey="projects" title="Projects">
                <Project projects={portfolio.projects} files={portfolio.files} imageDetails={portfolio.imageDetails} />
            </Tab>
        </Tabs>
    </div>
  );
}

export default MainPage