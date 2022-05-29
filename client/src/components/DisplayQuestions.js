import React from 'react'

import QuestionsList from './QuestionsList.js';
import ChangePage from './ChangePage.js';
import Errors from './Errors.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DisplayQuestions({model, setCurrentPage, setCurrentQuestion, getSearchResults, getDate, getTime, changePage}) {
  function get_tid(tagname) {
    for (let tag of model.tags) 
      if (tag.name === tagname) 
        return tag._id;
  }

  let                        questions_list = model.questions;
  if (model.fromTags)        questions_list = model.questions.filter(question => question.tags.includes(get_tid(model.tag)));
  if (model.fromProfileTags) questions_list = model.current_user.questions.filter(qid => model.questions.find(q => q._id === qid).tags.includes(get_tid(model.tag))).map(qid => model.questions.find(q => q._id === qid));
  if (model.fromSearch)      questions_list = getSearchResults(model.searchString);
  
  // display max five questions at a time
  let current_questions_list = [];
  for (let i = (model.current_questions_page - 1) * 5; i < questions_list.length && i < (model.current_questions_page) * 5; i++) {
    current_questions_list.push(questions_list[i]);
  }
  let title;
  if (model.fromTags)             title = `Questions tagged [${model.tag}]`;
  else if (model.fromSearch)      title = (questions_list.length === 0) ? 'No Results Found' : `Results of search "${model.searchString}"`;
  else if (model.fromProfileTags) title = `Questions posted by you with tag [${model.tag}]`;
  else                            title = 'All Questions';

  return (
    <>
      <br></br>
      <br></br>
      <Container fluid>
        <Row>
          <Col md={5}></Col>
          <Col md={3}>
            <h1>{title}</h1>
            <div>{questions_list.length} question{(questions_list.length === 1) ? '' : 's'}</div>
          </Col>
        </Row>
      </Container>

      <Errors model={model} setCurrentPage={setCurrentPage}></Errors>
      <hr></hr>
      <QuestionsList model={model} current_questions_list={current_questions_list} setCurrentQuestion={setCurrentQuestion} getSearchResults={getSearchResults} getDate={getDate} getTime={getTime} changePage={changePage}></QuestionsList>
      <div id="padding"></div>
      <div id="padding"></div>


      <div className="fixed-bottom" id="footer">
        <br></br>
        <br></br>
        <Container fluid>
          <Row>
            <Col md={5}></Col>
            <Col md={2}>
              <ChangePage model={model} id='QuestionsList' maxPage={Math.ceil(questions_list.length / 5)} changePage={changePage}></ChangePage>
            </Col>
            <Col md={5}></Col>
          </Row>
        </Container>
        <br></br>
      </div>

    </>
  )
}

export default DisplayQuestions