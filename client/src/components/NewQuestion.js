import React from 'react'
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewQuestion({model, pushQuestion}) {
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


          <Form id="answer_form" onSubmit={(e) => {e.preventDefault(); pushQuestion() }}>
            <div className="form_input"> Question Title </div>
            <sub> Title should not contain more than 100 characters </sub>
            <br></br>
            <input id="title" className="input"></input>
            <br></br><br></br>

            <div className="form_input"> Question Summary </div>
            <sub> Add a Summary</sub>
            <br></br>
            <textarea id="summary" className="input"></textarea>
            <br></br><br></br>
            
            <div className="form_input"> Question Text </div>
            <sub> Add Details </sub>
            <br></br>
            <textarea id="text" className="input"></textarea>
            <br></br><br></br>

            <div className="form_input">  Tags</div>
            <sub> Add keywords separated by whitespace </sub>
            <br></br>
            <input id="tags" className="input"></input>
            <br></br><br></br>

            <Button variant="success" type="submit" value="Post Question">Post Question</Button><br></br><br></br>
          </Form><br></br>
        </Card>
      </Col>
      <Col md={4}></Col>
    </Row>
  </Container>
    // <>
    //   <Errors model={model}></Errors>

      // <form id="form" onSubmit={(e) => {e.preventDefault(); pushQuestion()}}>
      //   <div className="form_input"> Question Title </div>
      //   <sub> Title should not contain more than 100 characters </sub>
      //   <br></br>
      //   <input id="title" className="input"></input>
      //   <br></br><br></br>

      //   <div className="form_input"> Question Summary </div>
      //   <sub> Add a Summary</sub>
      //   <br></br>
      //   <textarea id="summary" className="input"></textarea>
      //   <br></br><br></br>
        
      //   <div className="form_input"> Question Text </div>
      //   <sub> Add Details </sub>
      //   <br></br>
      //   <textarea id="text" className="input"></textarea>
      //   <br></br><br></br>

      //   <div className="form_input">  Tags</div>
      //   <sub> Add keywords separated by whitespace </sub>
      //   <br></br>
      //   <input id="tags" className="input"></input>
      //   <br></br><br></br>
      
    //     <input id="post_question" type="submit" value="Post Question"></input>
    //   </form>
    // </>
  )
}

export default NewQuestion