import React from 'react'
import Errors from './Errors.js';

function NewQuestion({model, pushQuestion}) {
  return (
    <>
      <Errors model={model}></Errors>

      <form id="form" onSubmit={(e) => {e.preventDefault(); pushQuestion()}}>
        <div className="form_input"> Question Title </div>
        <sub> Title should not contain more than 100 characters </sub>
        <br></br>
        <input id="title" className="input"></input>
        <br></br><br></br>

        <div className="form_input"> Question Summary </div>
        <sub> Add a Summary</sub>
        <br></br>
        <textarea id="summary" className="input"></textarea>
        <br></br><br></br>
        
        <div className="form_input"> Question Text </div>
        <sub> Add Details </sub>
        <br></br>
        <textarea id="text" className="input"></textarea>
        <br></br><br></br>

        <div className="form_input">  Tags</div>
        <sub> Add keywords separated by whitespace </sub>
        <br></br>
        <input id="tags" className="input"></input>
        <br></br><br></br>
      
        <input id="post_question" type="submit" value="Post Question"></input>
      </form>
    </>
  )
}

export default NewQuestion