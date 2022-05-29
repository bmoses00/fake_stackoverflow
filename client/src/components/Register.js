import React from 'react';
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Register({model, setCurrentPage, registerUser}) {
  return (
    <>
      <Errors model={model}></Errors>
      <form id="answer_form" onSubmit={(e) => {e.preventDefault(); registerUser() }}>
      
      <div className="form_input"> Username</div>
      <br></br>
      <input id="username" className="input"></input>
      <br></br><br></br>  

      <div className="form_input"> Email</div>
      <br></br>
      <input id="email" className="input"></input>
      <br></br><br></br>  

      <div className="form_input"> Password</div>
      <br></br>
      <input type="password" id="password" className="input"></input>
      <br></br><br></br>  

      <div className="form_input"> Verify Password</div>
      <br></br>
      <input type="password" id="verify_password" className="input"></input>
      <br></br><br></br>  


      <input className="btn" type="submit" value="Register"></input>
    </form><br></br>
    <button className="btn" onClick={() => setCurrentPage(model.Pages.Welcome)}>Back to Welcome</button><br></br><br></br>

    </>
  )
}

export default Register