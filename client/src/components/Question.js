import React from 'react'
import AnswersList from './AnswersList.js';
import QuestionText from './QuestionText.js';
import ChangePage from './ChangePage.js';
import Errors from './Errors.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Question({model, setCurrentPage, getDate, getTime, submitComment, userVote, changePage}) {
  const question = model.questions.find(q => q._id === model.current_qid);

  return (
    <>
      <div>
        <Errors model={model}></Errors>
        <QuestionText model={model} getDate={getDate} getTime={getTime} submitComment={submitComment} userVote={userVote} changePage={changePage}></QuestionText>
        <AnswersList model={model} getDate={getDate} getTime={getTime} submitComment={submitComment} userVote={userVote} changePage={changePage}></AnswersList>
      </div>
      <div id="padding"></div>
      <div id="padding"></div>
      <div id="padding"></div>

          
        
      <div className="fixed-bottom" id="footer">
        <br></br>
        <Container fluid><Row>
          <Col md={10}></Col>
          <Col md={2}><ChangePage model={model} id={question._id} maxPage={Math.ceil(question.answers.length / 5)} changePage={changePage}></ChangePage></Col>
        </Row></Container>
        <br></br><br></br>
        {
          (model.current_user !== '')
          ?
          <>
          <Container fluid>
            <Row>
              <Col md={5}></Col>
              <Col md={2}>
                <Button variant="primary" onClick={() => setCurrentPage(model.Pages.New_Answer)}>Answer Question</Button>
              </Col>
              <Col md={5}></Col>
            </Row>
          </Container>
          </>
          : ''
        }
        <br></br>
      </div>
    </>

  )
}

export default Question