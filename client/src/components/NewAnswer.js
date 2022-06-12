import React from 'react';
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewAnswer({model, pushAnswer}) {

  return (
    <Container>
    <Row className="mb-5">
      <Col>
      </Col>
    </Row>
    <Row className="mb-5"></Row>

    <Row>
      <Col md={4}></Col>
      <Col>
        <Card border='success' bg='light' className="text-center">
          <Errors model={model}></Errors>


          <Form id="answer_form" onSubmit={(e) => {e.preventDefault(); pushAnswer() }}>
            <div className="form_input"> Answer Text </div>
            <br></br>
            <textarea id="text" className="input"></textarea>
            <br></br><br></br>

            <Button variant="success" type="submit" value="Post Answer">Post Answer</Button><br></br><br></br>
          </Form><br></br>
        </Card>
      </Col>
      <Col md={4}></Col>
    </Row>
  </Container>
    // <>
    //   <Errors model={model}></Errors>
    //   <form id="answer_form" onSubmit={(e) => {e.preventDefault(); pushAnswer()}}>

      // <div className="form_input"> Answer Text </div>
      // <br></br>
      // <textarea id="text" className="input"></textarea>
      // <br></br><br></br>
      
    //   <input id="post_answer" type="submit" value="Post Answer"></input>
    // </form>
    // </>
  )
}

export default NewAnswer