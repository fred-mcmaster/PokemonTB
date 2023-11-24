import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function DeleteTeamButton({ teams, deleteTeam }) {

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

  const handleDeleteTeam = () => {

    if (teamName.trim() === '') {
      setShowAlert(true);
    } else {

      deleteTeam(teamName);

      handleCloseModal();
    }
  };

  const handleTeamSelect = (e) => {
      // Update the teamName state when the user selects a team
      setTeamName(e.target.value);
  };

  return (
    <div className="my-3 mx-1">
      <Button variant="warning" onClick={handleButtonClick}>
        Delete Team
      </Button>{' '}
      
      {/* Modal for deleting a team */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete A Pokemon Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select aria-label="teamList" onChange={handleTeamSelect} value={teamName}>
            <option>Select a team</option>
            {teams.map((team) => (
            <option key={team.name} value={team.name}>
                {team.name}
            </option>
            ))} 
            </Form.Select>         
            {/* Alert message for empty team name */}
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                You did not select a team yet
              </Alert>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteTeam}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteTeamButton;
