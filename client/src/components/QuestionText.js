import React from 'react'
import Comments from './Comments.js'
import Vote from './Vote.js'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function QuestionText({model, getDate, getTime, submitComment, userVote, changePage}) {
  const question = model.questions.find(q => q._id === model.current_qid);

  return (
    <div>
      <Card>
        <Card.Body>
          <h1>{question.title}</h1>
          <div>{question.views} view{(question.views !== 1 ? 's' : '')}</div>
          <div>{question.answers.length} answer{(question.answers.length !== 1 ? 's' : '')}</div>
          <br></br>
          <Container fluid>
            <Row>
              <Col md={1}>
                <Vote model={model} id={question._id} userVote={userVote}></Vote>
              </Col>
              <Col md={9}>
                <div>{question.text}</div>
              </Col>
              <Col md={2}>
                <div> Asked by {question.asked_by} <br></br> On {getDate(question.ask_date_time)} <br></br> At {getTime(question.ask_date_time)} </div>
              </Col>
            </Row>
          </Container>

        </Card.Body>
      </Card>
      <div><br></br>
        <Comments comments={question.comments} submitComment={submitComment} id={question._id} model={model} changePage={changePage}></Comments>
      </div>
    </div>
  )
};

export default QuestionText