import React from 'react'
import Errors from './Errors.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login({model, setCurrentPage, loginUser}) {
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

          <Form id="answer_form" onSubmit={(e) => {e.preventDefault(); loginUser() }}>
            <div className="form_input"> Email</div>
            <br></br>
            <input id="email" className="input"></input>
            <br></br><br></br>  

            <div className="form_input"> Password </div>
            <br></br>
            <input type="password" id="password" className="input"></input>
            <br></br><br></br>  

            <Button variant="success" type="submit" value="Login">Login</Button><br></br><br></br>
            <Button variant="outline-secondary" onClick={() => setCurrentPage(model.Pages.Welcome)}>Back to Welcome</Button><br></br><br></br>
          </Form><br></br>
        </Card>
      </Col>
      <Col md={4}></Col>
    </Row>
  </Container>
    // <>
    //   <Errors model={model}></Errors>
      // <form id="answer_form" onSubmit={(e) => {e.preventDefault(); loginUser() }}>

      // <div className="form_input"> Email</div>
      // <br></br>
      // <input id="email" className="input"></input>
      // <br></br><br></br>  

      // <div className="form_input"> Password </div>
      // <br></br>
      // <input type="password" id="password" className="input"></input>
      // <br></br><br></br>  

      // <input className="btn" type="submit" value="Login"></input>
      // </form><br></br>
      // <button className="btn" onClick={() => setCurrentPage(model.Pages.Welcome)}>Back to Welcome</button><br></br><br></br>
    // </>
  )
}

export default Login