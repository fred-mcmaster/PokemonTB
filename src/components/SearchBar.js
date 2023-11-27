import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const SearchBar = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
        setShowAlert(true);
    } else {
        onSearch(searchTerm);
        setShowAlert(false);
    }
  };

  return (
    <div>
      <Form className="row">
         <Form.Group className="col-md-6 mb-3" controlId="search">
            <Form.Control
                type="text"
                placeholder="Enter Pokemon name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                />
         </Form.Group>    
         <Button className="col-md-1 mb-3" variant="dark" onClick={handleSearch}>
         Search
         </Button>

          {/* Alert message for empty team name */}
          {showAlert && (
          <Alert className="col-md-6 mb-3" variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Please enter your seach input!
          </Alert>
          )}
      </Form>  
      
    </div>
  );
};

export default SearchBar;
