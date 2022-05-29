import React from 'react'
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Tags({model, setCurrentPage, clickTag}) {
  function get_num_questions(tag) {
    let num_questions = 0;
    for (let question of model.questions) { 
      if (question.tags.includes(tag._id)) {
        num_questions++;
      }
    }
    return num_questions;
  }

  const tags = model.tags.filter(tag => get_num_questions(tag) > 0);

  let rows = [];
  for (let row = 0; row < Math.ceil(tags.length / 3.0); row++) {
    let row_data = <tr key={row}>{tags.map((tag, index) => {
      let num_questions = get_num_questions(tag);
      let plural = (num_questions !== 1) ? 's' : '';
      return (index >= row * 3 && index < (row + 1) * 3) 
        ? <td key={tag._id}><div className="link_tag"><div className="tag_text" onClick={clickTag}>{tag.name}</div><br></br> {num_questions} question{plural}</div></td>
        : null
    })}</tr>
    rows.push(row_data);
  }
  return (
    <>
      <br></br>
      <br></br>
      <Container fluid>
        <Row>
          <Col md={5}></Col>
          <Col md={3}>
            <h1>All Tags</h1>
            <div>{tags.length} question{(tags.length === 1) ? '' : 's'}</div>
          </Col>
        </Row>
      </Container>

      <Errors model={model} setCurrentPage={setCurrentPage}></Errors>
      {/* <hr></hr> */}
      <br></br>
      <Container fluid>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <ListGroup>
              {
                tags.map(tag => {
                  return (
                    <ListGroup.Item key={tag._id}>
                      <Button onClick={() => clickTag(tag.name)}>{tag.name}</Button>
                      <br></br><br></br>
                      <div>{get_num_questions(tag)} question{(get_num_questions(tag) === 1) ? '' : 's'}</div>
                    </ListGroup.Item>
                  )
                })
              }

            </ListGroup>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
      <br></br>
    </>
  )
}

export default Tags