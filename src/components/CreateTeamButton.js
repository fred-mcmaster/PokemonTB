import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function CreateTeamButton({ createNewTeam }) {

  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the form input when the modal is closed
    setTeamName('');
    setShowAlert(false);
  };

  const handleCreateTeam = () => {
    // Validate teamName before creating the team
    if (teamName.trim() === '') {
      setShowAlert(true);
    } else {
      // Pass the teamName to the createNewTeam function
      createNewTeam(teamName);

      handleCloseModal();
    }
  };

  return (
    <div className="my-3 mx-1">
      <Button variant="primary" onClick={handleButtonClick}>
        New Team
      </Button>{' '}
      
      {/* Modal for creating a new team */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Pokemon Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="teamName">
              <Form.Label>Team name</Form.Label>
              <Form.Control
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                autoFocus
              />
              <Form.Text className="text-muted">
                Please make sure to create a team with a unique name.
              </Form.Text>
            </Form.Group>          
            {/* Alert message for empty team name */}
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Team name cannot be empty!
              </Alert>
            )}
          </Form>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCreateTeam}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTeamButton;
