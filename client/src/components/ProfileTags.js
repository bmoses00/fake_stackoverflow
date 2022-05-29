import React from 'react'
import Errors from './Errors.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Editable from 'react-bootstrap-editable';
// import {AiFillEdit} from 'react-icons/ai'


function ProfileTags({model, setCurrentPage, profileClickTag, deleteTag, selectElement, updateTag}) {
    function get_num_questions(tag) {
        let num_questions = 0;
        for (let qid of model.current_user.questions) { 
					let question = model.questions.find(q => q._id === qid);
          if (question.tags.includes(tag._id)) {
            num_questions++;
          }
        }
        return num_questions;
      }
    
      const tags = model.tags.filter(tag => get_num_questions(tag) > 0);
    
      return (
        <>
        <br></br>
        <br></br>
        <Container fluid>
          <Row>
            <Col md={5}></Col>
            <Col md={3}>
              <h1>Your Tags</h1>
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
                        <h3><Editable initialValue={tag.name} isValueClickable={true} onSubmit={() => updateTag(tag._id)}></Editable></h3><br></br>
                        <Container fluid>
                          <Row>
                            <Col md={10}>
                              <Button onClick={() => profileClickTag(tag.name)}>View All of Your Questions With This Tag</Button>

                            </Col>
                            <Col md={2}>
                              <Button variant="danger" onClick={() => deleteTag(tag._id)}>Delete Tag</Button>

                            </Col>
                          </Row>
                        </Container>
                        <br></br><br></br><br></br>
                        <div>You've posted {get_num_questions(tag)} question{(get_num_questions(tag) === 1) ? '' : 's'} with this tag</div>
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
        // <>
        //   <Header model={model} setCurrentPage={setCurrentPage}></Header>
        //   <Errors model={model}></Errors>
				// 	{
				// 		(rows.length === 0)
				// 		? <div>No tags!</div>
				// 		: ''
				// 	}
        //   <table id="tags_table">
        //     <tbody>{rows}</tbody>
        //   </table>
        // </>
      )
}

export default ProfileTags