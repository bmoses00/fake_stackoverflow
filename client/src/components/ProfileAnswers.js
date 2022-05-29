import React from 'react'
import EditableLabel from 'react-inline-editing';
import Errors from './Errors.js';
import Vote from './Vote.js'
import ChangePage from './ChangePage.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Editable from 'react-bootstrap-editable';
import Button from 'react-bootstrap/Button';


function ProfileAnswers({model, deleteAnswer, selectElement, updateAnswer, userVote, getTime, getDate, changePage}) {
	
	const answers_list = model.answers.filter(a => model.current_user.answers.includes(a._id));
  let current_answers_list = [];
  for (let i = (parseInt(model.current_profile_page - 1)) * 5; i < answers_list.length && i < (parseInt(model.current_profile_page)) * 5; i++) {
    current_answers_list.push(answers_list[i]);
  }

	return (
		<>

			<br></br>
			<br></br>
			<Container fluid>
				<Row>
					<Col md={5}></Col>
					<Col md={3}>
				{
					(answers_list.length === 0)
					? 
					<h1>No Answers!</h1>
					:
					<>
						<h1>Your Answers</h1>
						<div>{answers_list.length} answer{(answers_list.length === 1) ? '' : 's'}</div>
					</>
				}
					</Col>
				</Row>
			</Container>
			<Errors model={model}></Errors>
			<br></br>
			<Container fluid>
			{current_answers_list.map(answer => {
				return (
					<Row key={answer._id} className='pb-5'>
						<Col md={1}>
							<Vote model={model} id={answer._id} userVote={userVote}></Vote>
						</Col>
						<Col md={8}>
							<h3><Editable initialValue={answer.text} isValueClickable={true} onSubmit={() => updateAnswer(answer._id)}></Editable></h3>
							<br></br>
							<Button variant="danger" onClick={() => deleteAnswer(answer._id)}>Delete Answer</Button>
						</Col>
						<Col md={3}>
							<div className="answer_info"> Ans by {answer.ans_by}
							<br></br> On {getDate(answer.ans_date_time)} 
							<br></br> At {getTime(answer.ans_date_time)} <br></br> </div>
						</Col>
					</Row>
				)
			})}
			</Container>
			<div id="padding"></div>
			<div id="padding"></div>

      <div className="fixed-bottom" id="footer">
        <br></br>
        <br></br>
        <Container fluid>
          <Row>
            <Col md={5}></Col>
            <Col md={2}>
							<ChangePage model={model} id='ProfileAnswers' maxPage={Math.ceil(answers_list.length / 5)} changePage={changePage}></ChangePage>
            </Col>
            <Col md={5}></Col>
          </Row>
        </Container>
        <br></br>
      </div>

		</>
	)
}

export default ProfileAnswers