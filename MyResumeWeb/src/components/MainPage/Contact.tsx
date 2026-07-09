import { Card, Button } from "react-bootstrap";
import type { InformationProps } from "../../types/InformationProps";
import "../../styles/Contact.css";
import DigitalGarden from "../Contact/Garden";

function Contact({ information }: { information: InformationProps }) {
  const emailAddress = information.email[0];

  return (
    <div>
      <div className="Contact contact-grid">
        {emailAddress && (
          <Card className="contact-card">
            <Card.Body className="contact-card-body">
              <Card.Subtitle className="contact-card-label">Email</Card.Subtitle>
              <Card.Text className="contact-card-value text-muted">{emailAddress}</Card.Text>
              <Button className="profile-btn" as="a" href={`mailto:${emailAddress}`} size="sm">
                Send Email
              </Button>
            </Card.Body>
          </Card>
        )}

        {information.linkedin && (
          <Card className="contact-card">
            <Card.Body className="contact-card-body">
              <Card.Subtitle className="contact-card-label">LinkedIn</Card.Subtitle>
              <Card.Text className="contact-card-value text-muted">Connect with me on LinkedIn</Card.Text>
              <Button className="profile-btn" as="a" href={information.linkedin} target="_blank" rel="noopener noreferrer" size="sm">
                LinkedIn Profile
              </Button>
            </Card.Body>
          </Card>
        )}

        {information.github && (
          <Card className="contact-card">
            <Card.Body className="contact-card-body">
              <Card.Subtitle className="contact-card-label">GitHub</Card.Subtitle>
              <Card.Text className="contact-card-value text-muted">View my public projects</Card.Text>
              <Button className="profile-btn" as="a" href={information.github} target="_blank" rel="noopener noreferrer" size="sm">
                GitHub Profile
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
      <div>
        <DigitalGarden />
      </div>
    </div>
    
  );
}

export default Contact;