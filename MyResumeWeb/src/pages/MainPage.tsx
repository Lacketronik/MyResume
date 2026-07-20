import "../styles/MainPage.css";
import Introduction from "../components/MainPage/Introduction";
import Experience from "../components/MainPage/Experience";
import Education from "../components/MainPage/Education";
import Certification from "../components/MainPage/Certification";
import Contact from "../components/MainPage/Contact";
import Project from "../components/MainPage/Project";
// import PersistentAlert from "../components/MainPage/Banner";
import type { PortfolioProps } from "../types/PortfolioProps";
import type { ActivityStatusProp } from "../types/ActivityStatusProp";
import { ActivityStatusService } from "../services/ActivityStatusService";
import { useEffect, useState } from "react";

function MainPage({ portfolio, activeTab }: { portfolio: PortfolioProps, activeTab: string }) {
  const [activityStatus, setActivityStatus] = useState<ActivityStatusProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchActivityStatus = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const status = await ActivityStatusService.getActivityStatus();
        setActivityStatus(status);
      } catch (error) {
        console.error('Error fetching activity status:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityStatus();
  }, []);

  return (
    <div className="MainPage">
      {/* <PersistentAlert /> */}
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
            {activeTab === "contact" && (
              <Contact 
                information={portfolio.information} 
                activityStatus={activityStatus} 
                isLoading={isLoading}
                hasError={hasError}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage