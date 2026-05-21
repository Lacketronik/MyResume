import React, { useState, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';

const PersistentAlert: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('resume-alert-dismissed');
    if (!isDismissed) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('resume-alert-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed-top w-100 p-2" style={{ zIndex: 1050}}>
      <Container>
        <Alert 
          variant="primary" 
          onClose={handleClose} 
          dismissible
          className="shadow-sm m-0 text-center mx-auto"
          style={{ width: 'min(90vw, 1070px)' }}
        >
          This web resume is continuously being worked on! 
          Email or connect with me for suggestions or feedback.
        </Alert>
      </Container>
    </div>
  );
};

export default PersistentAlert;