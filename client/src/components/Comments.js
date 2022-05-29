import React from 'react';
import ChangePage from './ChangePage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Comments({comments, submitComment, id, model, changePage}) {

  let post;
  if      (id[0] === 'q') post = model.questions.find(q => q._id === id)
  else if (id[0] === 'a') post = model.answers.find(a => a._id === id)

  let current_comments_list = [];
  for (let i = (post.current_comment_page - 1) * 3; i < comments.length && i < (post.current_comment_page) * 3; i++) {
    current_comments_list.push(comments[i]);
  }

  return (
    <Container fluid>
      <Row key={-5} className='mb-3'>
        <Col md={3}></Col>
        <Col md={9}><h6>Comments:</h6></Col>
      </Row>
      {
        current_comments_list.map((comment, index) => 
            <Row key={index}>
              <Col md={3}></Col>
              <Col md={7}>{comment.text}</Col>
              <Col md={2}>{comment.comment_by}</Col>
            </Row>
        )
      }
      <Row key={-4} className='mb-2'></Row>
      <Row key={-3} className='mb-2'>
        <Col md={3}></Col>
        <Col md={5}><textarea id="comment" onKeyDown={e => submitComment(e, id)}></textarea></Col>
        <Col md={4}></Col>
      </Row>
      <Row key={-2} >
        <Col md={3}></Col>
        <Col md={9}><ChangePage model={model} id={id} maxPage={Math.ceil(comments.length / 3)} changePage={changePage} qcomments={true}></ChangePage></Col>
      </Row>
    </Container>

  )
}

export default Comments