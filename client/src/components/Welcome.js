import React from 'react';
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Welcome({model, setCurrentPage}) {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <Errors model={model}></Errors>
        </Col>
      </Row>
      <Row className="mb-5"></Row>

      <Row>
        <Col md={4}></Col>
        <Col>
          <Card border='success' bg='light' className="text-center">
            <Card.Header>
              Welcome to Fake Stackoverflow!
            </Card.Header>
            <Card.Body>
              <Button variant="success" id="login" onClick={() => setCurrentPage(model.Pages.Login)}>Login</Button><br></br><br></br>
              <Button variant="success" id="register" onClick={() => setCurrentPage(model.Pages.Register)}>Register</Button><br></br><br></br>
              <Button variant="outline-secondary" id="guest" onClick={() => setCurrentPage(model.Pages.Display_Questions)}>Continue as Guest</Button>

            </Card.Body>

          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  )
}

export default Welcome