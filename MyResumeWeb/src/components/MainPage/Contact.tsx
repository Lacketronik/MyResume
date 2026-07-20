import { Card, Button } from "react-bootstrap";
import type { InformationProps } from "../../types/InformationProps";
import "../../styles/Contact.css";
import DigitalGarden from "../Contact/Garden";
import type { ActivityStatusProp } from "../../types/ActivityStatusProp";

function Contact({ information, activityStatus, isLoading, hasError }: { information: InformationProps; activityStatus: ActivityStatusProp[]; isLoading: boolean; hasError: boolean }) {
  const emailAddress = information.email[0];

  return (
    <div>
      <div className="Contact contact-grid">
        {emailAddress && (
          <Card className="contact-card">
            <Card.Body className="contact-card-body">
              <Card.Subtitle className="contact-card-label" style={{ textAlign: "center" }}>
                Email
              </Card.Subtitle>
              <Card.Text className="contact-card-value text-muted" style={{ textAlign: "center" }}>
                {emailAddress}
              </Card.Text>
              <Button className="profile-btn" as="a" href={`mailto:${emailAddress}`} size="sm" style={{ textAlign: "center" }}>
                Send Email
              </Button>
            </Card.Body>
          </Card>
        )}

        {information.linkedin && (
          <Card className="contact-card">
            <Card.Body className="contact-card-body">
              <Card.Subtitle className="contact-card-label" style={{ textAlign: "center" }}>
                LinkedIn
              </Card.Subtitle>
              <Card.Text className="contact-card-value text-muted" style={{ textAlign: "center" }}>
                Connect with me on LinkedIn
              </Card.Text>
              <Button className="profile-btn" as="a" href={information.linkedin} target="_blank" rel="noopener noreferrer" size="sm" style={{ textAlign: "center" }}>
                LinkedIn Profile
              </Button>
            </Card.Body>
          </Card>
        )}

        {information.github && (
          <Card className="contact-card">
            <Card.Body className="contact-card-body">
              <Card.Subtitle className="contact-card-label" style={{ textAlign: "center" }}>
                GitHub
              </Card.Subtitle>
              <Card.Text className="contact-card-value text-muted" style={{ textAlign: "center" }}>
                View my public projects
              </Card.Text>
              <Button className="profile-btn" as="a" href={information.github} target="_blank" rel="noopener noreferrer" size="sm" style={{ textAlign: "center" }}>
                GitHub Profile
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
      <div>
        <DigitalGarden 
          activityStatus={activityStatus} 
          isLoading={isLoading} 
          hasError={hasError}  
        />
      </div>
    </div>
    
  );
}

export default Contact;