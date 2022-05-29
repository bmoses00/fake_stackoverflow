import React from 'react'
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Editable from 'react-bootstrap-editable';
import { MdOutlineRemoveCircle } from 'react-icons/md'

function Profile({model, updateQuestion, updateAnswer, updateTag, selectElement, deleteAnswer, deleteQuestion, deleteTag, removeTagFromQuestion, setCurrentPage, getDate, getTime}) {
  const questions_list = model.questions.filter(q => model.current_user.questions.includes(q._id));
  const answers_list = model.answers.filter(a => model.current_user.answers.includes(a._id));
  const tags_list = model.tags.filter(t => model.current_user.tags.includes(t._id));

  const milliseconds_member = new Date() - new Date(model.current_user.date_joined).getTime();
  const milliseconds_in_day = 8.64e7;
  const days_member = milliseconds_member / milliseconds_in_day;
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={10}>
            <Errors model={model}></Errors>
            <div id="profile_desc">
                <br></br><br></br>
                <h1>Your Profile:</h1>
                <br></br>
                <h6>Reputation: {model.current_user.reputation}</h6>
                <h6>Member for {Math.floor(days_member)} day{Math.floor(days_member) === 1 ? '' : 's'}</h6>
                <hr></hr>
            </div>
          </Col>
          <Col md={2} id="sidenav">
              {
                answers_list.length === 0
                ? <h5>No Answers!</h5>
                : <Button variant="link" onClick={() => setCurrentPage(model.Pages.Profile_Answers)}><h3>View Your Answers</h3></Button>
              }
            <br></br><br></br>
              {
                tags_list.length === 0
                ? <h5>No Tags!</h5>
                : <Button variant="link" onClick={() => setCurrentPage(model.Pages.Profile_Tags)}><h3>View Your Tags</h3></Button>
              }
          </Col>
        </Row>
        <Row>
          <br></br>
          <Col md={5}></Col>
          <Col md={2}>
            {
              questions_list.length === 0
              ? <h3>No Questions!</h3>
              : <h3>Your Questions:</h3>
            }
          </Col>
          <Col md={5}></Col>
        </Row>
        {questions_list.map(question => {
          return (
            <Row className='pb-5' key={question._id}>
              <Col md={1}>
                <div>{question.views} view{(question.views === 1) ? '' : 's'}</div>
                <div>{question.answers.length} answer{(question.answers.length === 1) ? '' : 's'}</div>
              </Col>
              <Col md={9} id={question._id}>
                <h3><Editable initialValue={question.title} isValueClickable={true} onSubmit={() => updateQuestion(question._id)}></Editable></h3>
                <br></br><br></br>
                <i><Editable className="editableText" initialValue={question.summary} isValueClickable={true} onSubmit={() => updateQuestion(question._id)}></Editable></i>
                <br></br>
                <Editable className="editableText" initialValue={question.text} isValueClickable={true} onSubmit={() => updateQuestion(question._id)}></Editable>
                <div>{
											question.tags.map((tagid, index) => {
												return (
													<div key={tagid}>
														<div className="tag-light">
                              <Editable initialValue={get_tagname(tagid, model)} isValueClickable={true} onSubmit={() => updateQuestion(question._id, tagid)}></Editable>
                            </div>
                            <MdOutlineRemoveCircle onClick={() => removeTagFromQuestion(question._id, tagid)}className="removeTag"></MdOutlineRemoveCircle><br></br><br></br>
                          {/* {(index % 3 === 0 && index !== 0)
														? <><br></br><br></br></>
														: ''} */}
													</div>
												)
											})
										}
										</div><br></br><br></br>
                <Button variant="danger" onClick={() => deleteQuestion(question._id)}>Delete Question</Button>
                
              </Col>
              <Col md={2}>
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
    </>
  )
}

function get_tagname(tagid, model) {
  for (let tag of model.tags) 
    if (tag._id === tagid) 
      return tag.name;
}

export default Profile