import type { InformationProps } from "../../types/InformationProps";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";

function Introduction({ information }: { information: InformationProps }) {
  return (
    <div className="Introduction">
      <h1>{information.name}</h1>
      <h2>{information.role.join(" | ")}</h2>
      <Button variant="outline-primary" href={information.linkedin} target="_blank" rel="noopener noreferrer" size="sm">
        LinkedIn Profile
      </Button>
      {information.resumeFileID && (
        <Button variant="outline-success" href={`https://example.com/uc?id=${information.resumeFileID}`} target="_blank" rel="noopener noreferrer" size="sm" className="ms-2">
          Download Resume
        </Button>
      )}
      <br></br>
      <Card style={{ width: '85%', borderLeft: '5px solid #0d6efd', borderRight: '5px solid #0d6efd' }} className="shadow mx-auto my-4 bg-dark text-light text-start"    >
        <Card.Body className="p-4">
        {information.introduction.map((paragraph, index) => (
          <Card.Text className="text-secondary small lh-base mb-2" key={index}>
            {paragraph}
            <br></br>
          </Card.Text>
        ))}
        </Card.Body>
      </Card>
      <br></br>
    </div>
  );
}

export default Introduction