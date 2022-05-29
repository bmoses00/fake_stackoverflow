import React from 'react'

function Header({model, setCurrentPage, getSearchResults}) {
	let left_col;
	let center_col;

  function get_tid(tagname) {
    for (let tag of model.tags) 
      if (tag.name === tagname) 
        return tag._id;
  }
  switch(model.current_page) {
    case model.Pages.Display_Questions:
      if (model.fromTags) {
        let questions_list = model.questions.filter(question => question.tags.includes(get_tid(model.tag)));
        left_col = `${questions_list.length} question`;
        if (questions_list.length !== 1) left_col += 's';
        center_col = `Questions tagged [${model.tag}]`
      }
      else if (model.fromSearch) {
        let questions_list = getSearchResults(model.searchString)
        left_col = `${questions_list.length} question`;
        if (questions_list.length !== 1) left_col += 's';
        if (questions_list.length === 0) left_col = "No Questions Found";
        center_col = "Search Results";
      }
      else if (model.fromProfileTags) {
        // add all the user's questions with that tag
        let questions_list = model.current_user.questions.filter(qid => model.questions.find(q => q._id === qid).tags.includes(get_tid(model.tag)));
        left_col = `${questions_list.length} question`;
        if (questions_list.length !== 1) left_col += 's';
        center_col = `Questions tagged [${model.tag}] and posted by you`
      }
      else {

        left_col = `${model.questions.length} question`;
        if (model.questions.length !== 1) left_col += 's';
        center_col = "All Questions";
      }
      break;
    case model.Pages.Question:
      const question = model.questions.filter(q => q._id === model.current_qid)[0];
      left_col = `${question.answers.length} answer`;
      if (question.answers.length !== 1) left_col += 's';
      center_col = question.title;
      break;
    case model.Pages.Tags:
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
      left_col = `${tags.length} tag`
			if (tags.length !== 1) left_col += 's';
      center_col = "All Tags";
      break;
    default:
  }

  return (
    <div>
      <div className="side_col">{left_col}</div>
      <div className="second_col">{center_col}</div>
      {/* <th className="side_col"><button id="ask_question" onClick={() => setCurrentPage(model.Pages.New_Question)}>Ask a question</button></th> */}
    </div>
  )
}

export default Header