import React from 'react'
import Button from 'react-bootstrap/Button'

function ChangePage({model, id, maxPage, changePage, qcomments}) {
	let current_page;
	if (id === 'QuestionsList') {
		current_page = model.current_questions_page;
	}
	else if (id === 'ProfileAnswers') {
		current_page = parseInt(model.current_profile_page);
	}
	else if (id[0] === 'q' && qcomments) {
		current_page = model.questions.find(q => q._id === id).current_comment_page;
	}
	else if (id[0] === 'q' && !qcomments) {
		current_page = model.questions.find(q => q._id === id).current_page;
	}
	else if (id[0] === 'a') {
		current_page = model.answers.find(a => a._id === id).current_comment_page;
	}


  	let prevDisabled = current_page === 1;
	let nextDisabled = current_page === maxPage;

	let prevClass = (prevDisabled) ? 'vote-inactive' : 'vote-active';
	let nextClass = (nextDisabled) ? 'vote-inactive' : 'vote-active';

  return (
    <div>
			{
				(maxPage > 0) 
				? 
				<>
				{' '}
      			<Button disabled={prevDisabled} className={prevClass} id="prev" onClick={() => changePage(id, true, qcomments)}>Prev</Button>
      			{' '}{current_page}  /  {maxPage}{' '}
      			<Button disabled={nextDisabled} className={nextClass} id="next" onClick={() => changePage(id, false, qcomments)}>Next</Button>
				</>
				: ''
			}
    </div>
  )
}

export default ChangePage