import React from 'react';
import Errors from './Errors.js';

function NewAnswer({model, pushAnswer}) {

  return (
    <>
      <Errors model={model}></Errors>
      <form id="answer_form" onSubmit={(e) => {e.preventDefault(); pushAnswer()}}>

      <div className="form_input"> Answer Text </div>
      <br></br>
      <textarea id="text" className="input"></textarea>
      <br></br><br></br>
      
      <input id="post_answer" type="submit" value="Post Answer"></input>
    </form>
    </>
  )
}

export default NewAnswer