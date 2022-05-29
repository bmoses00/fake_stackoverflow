import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function QuestionsList({model, setCurrentQuestion, getDate, getTime, current_questions_list}) {


  return (
    <Container fluid>
      {current_questions_list.map(question => {
          return (
            <Row className='pb-5' key={question._id}>
              <Col md={1}>
                <div>{question.views} view{(question.views === 1) ? '' : 's'}</div>
                <div>{question.answers.length} answer{(question.answers.length === 1) ? '' : 's'}</div>
              </Col>
              <Col md={8}>
                <Button  onClick={() => setCurrentQuestion(question._id)} variant="link"><h3>{question.title}</h3></Button>
                <br></br><br></br>
                <div>{question.summary}</div>
                <div>{
											question.tags.map((tagid, index) => {
												return (
													<div key={tagid}>
														<div className="tag">{get_tagname(tagid, model)}</div>
                          {(index % 3 === 0 && index !== 0)
														? <><br></br><br></br></>
														: ''}
													</div>
												)
											})
										}
										</div>
              </Col>
              <Col md={3}>
                <div> 
                  Asked by {question.asked_by} <br></br> 
                  On {getDate(question.ask_date_time)} <br></br> 
                  At {getTime(question.ask_date_time)} 
                </div>
              </Col>
            </Row>
          )
        })}
    </Container>
  )
}

function get_tagname(tagid, model) {
  for (let tag of model.tags) 
    if (tag._id === tagid) 
      return tag.name;
}
  

export default QuestionsList