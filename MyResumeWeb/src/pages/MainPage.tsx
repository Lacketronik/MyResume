import Introduction from "../components/MainPage/Introduction";
import Experience from "../components/MainPage/Experience";
import Education from "../components/MainPage/Education";
import Certification from "../components/MainPage/Certification";
import Project from "../components/MainPage/Project";
import PersistentAlert from "../components/MainPage/Banner";
import type { PortfolioProps } from "../types/PortfolioProps";

function MainPage({ portfolio, activeTab }: { portfolio: PortfolioProps, activeTab: string }) {
  return (
    <div className="MainPage">
      <PersistentAlert />
      <div className="main-page-layout">
        <aside className="profile-sidebar">
          <Introduction information={portfolio.information} files={portfolio.files} />
        </aside>

        <section className="main-content-panel">
          <div className="tab-content-area">
            {activeTab === "projects" && <Project projects={portfolio.projects} files={portfolio.files} imageDetails={portfolio.imageDetails} />}
            {activeTab === "experience" && <Experience experiences={portfolio.experiences} />}
            {activeTab === "education" && <Education educations={portfolio.educations} />}
            {activeTab === "certification" && <Certification certs={portfolio.certifications} />}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage