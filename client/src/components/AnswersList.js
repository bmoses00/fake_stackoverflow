import React from 'react'
import Comments from './Comments.js'
import Vote from './Vote.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AnswersList({model, getDate, getTime, submitComment, userVote, changePage}) {

  const question = model.questions.find(q => q._id === model.current_qid);
  let current_answers_list = [];
  for (let i = (question.current_page - 1) * 5; i < question.answers.length && i < (question.current_page) * 5; i++) {
    current_answers_list.push(question.answers[i]);
  }

	return (
		<>
			<hr></hr><h3>Answers:</h3><br></br><br></br>
			{current_answers_list.map(aid => {
				const answer = model.answers.find(a => a._id === aid);
				return (
					<div key={aid}>
					<Container fluid key={aid}>
						<Row>
							<Col md={1}><Vote model={model} id={aid} userVote={userVote}></Vote></Col>
							<Col md={9}>{answer.text}</Col>
							<Col md={2}>
								<div> On {getDate(answer.ans_date_time)} <br></br> At {getTime(answer.ans_date_time)}</div>
							</Col>
						</Row>
					</Container><br></br><br></br>
					<Comments comments={answer.comments} submitComment={submitComment} id={aid} model={model} changePage={changePage}></Comments>
					<hr></hr>
					</div>
				)
			})}
		</>
	)
};
  

export default AnswersList