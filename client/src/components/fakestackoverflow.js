import React from 'react';
import {validate} from 'email-validator';
import Banner from './Banner.js';
import DisplayQuestions from './DisplayQuestions.js';
import Question from './Question.js';
import NewAnswer from './NewAnswer.js';
import NewQuestion from './NewQuestion.js';
import Tags from './Tags.js';
import Welcome from './Welcome.js';
import Login from './Login.js';
import Register from './Register.js';
import Profile from './Profile.js';
import ProfileTags from './ProfileTags.js';
import ProfileAnswers from './ProfileAnswers.js';
import Model from '../models/model.js'
import 'bootstrap/dist/css/bootstrap.css';


import { useState, useEffect } from 'react'
// import $ from 'jquery'
import { 
  getAnswers, 
  getQuestions, 
  getTags, 
  getUser, 
  postAnswer, 
  postQuestion, 
  postUser, 
  incrementViewCount, 
  isUnique, 
  verifyUser, 
  pushQuestionUpdate, 
  pushAnswerUpdate, 
  pushTagUpdate, 
  pushDeleteTag, 
  pushDeleteAnswer, 
  pushDeleteQuestion, 
  pushRemoveTagFromQuestion,
  pushComment,
  voteOnContent,
  pushLogout
} from '../calls/api.js';

function FakeStackOverflow() {
  const [model, setModel] = useState(new Model());
  const Pages = {
    Display_Questions: <DisplayQuestions model={model} setCurrentPage={setCurrentPage} setCurrentQuestion={setCurrentQuestion} getSearchResults={getSearchResults} getDate={getDate} getTime={getTime} changePage={changePage}></DisplayQuestions>,
    Question:          <Question         model={model} setCurrentPage={setCurrentPage} getDate={getDate} getTime={getTime} submitComment={submitComment} userVote={userVote} changePage={changePage}></Question>,
    Tags:              <Tags             model={model} setCurrentPage={setCurrentPage} clickTag={clickTag}></Tags>,
    New_Answer:        <NewAnswer        model={model} pushAnswer={pushAnswer}></NewAnswer>,
    New_Question:      <NewQuestion      model={model} pushQuestion={pushQuestion}></NewQuestion>,
    
    Welcome:           <Welcome  model={model} setCurrentPage={setCurrentPage}></Welcome>,
    Login:             <Login    model={model} setCurrentPage={setCurrentPage} loginUser={loginUser}></Login>,
    Register:          <Register model={model} setCurrentPage={setCurrentPage} registerUser={registerUser}></Register>,
    Profile:           <Profile  model={model} updateQuestion={updateQuestion} updateAnswer={updateAnswer} updateTag={updateTag} selectElement={selectElement} deleteAnswer={deleteAnswer} deleteQuestion={deleteQuestion} deleteTag={deleteTag} removeTagFromQuestion={removeTagFromQuestion} setCurrentPage={setCurrentPage} getTime={getTime} getDate={getDate}></Profile>,

    Profile_Tags:      <ProfileTags    model={model} selectElement={selectElement} profileClickTag={profileClickTag} updateTag={updateTag} deleteTag={deleteTag}></ProfileTags>,
    Profile_Answers:   <ProfileAnswers model={model} selectElement={selectElement} deleteAnswer={deleteAnswer} updateAnswer={updateAnswer} userVote={userVote} changePage={changePage} getDate={getDate} getTime={getTime}></ProfileAnswers>
  }
  const banner_pages = ['Display_Questions', 'Question', 'Tags', 'New_Answer', 'New_Question', 'Profile', 'Profile_Tags', 'Profile_Answers'];
  
  useEffect(() => {
    let cookies = document.cookie.split(';');
    cookies = cookies.map(cookie => {
      return {[cookie.split('=')[0].trim()]: cookie.split('=')[1]}
    });
    let questions;
    let answers;
    let tags;
    let user = '';
    (async () => {
      try {
        setModel((model) => {
          for (let cookie of cookies) {
            if (Object.keys(cookie)[0] === 'current_user') {
            }
            else {
              if (cookie[Object.keys(cookie)[0]] === 'true') {
                model[Object.keys(cookie)[0]] = true;
    
              }
              else if (cookie[Object.keys(cookie)[0]] === 'false') {
                model[Object.keys(cookie)[0]] = false;
    
              }
              else if (!isNaN(cookie[Object.keys(cookie)[0]]) && !Number.isNaN(parseInt(cookie[Object.keys(cookie)[0]]))) {
                model[Object.keys(cookie)[0]] = parseInt(cookie[Object.keys(cookie)[0]]);
              }
              else {
                model[Object.keys(cookie)[0]] = cookie[Object.keys(cookie)[0]];
              }
            }
          }
          return {
            ...model,
            // questions: questions,
            // answers: answers,
            // tags: tags,
            // current_user: user
          }
        })
        questions = await getQuestions();
        answers =   await getAnswers();
        tags =      await getTags();
        const cookie_user = cookies.find(cookie => Object.keys(cookie)[0] === 'current_user');
        let user_id;
        if (cookie_user && (cookies.find(cookie => Object.keys(cookie)[0] === 'current_user')['current_user'] !== '')) {
          user_id = JSON.parse(cookies.find(cookie => Object.keys(cookie)[0] === 'current_user')['current_user'])._id;
          user =      await getUser(user_id);
        }
        setModel((model) => {
          return {
            ...model,
            questions: questions,
            answers: answers,
            tags: tags,
            current_user: user
          }
        })
      }
      catch (error) {
        setModel((model) => {
          for (let cookie of cookies) {
            if (Object.keys(cookie)[0] === 'current_user') {
            }
            else {
              if (cookie[Object.keys(cookie)[0]] === 'true') {
                model[Object.keys(cookie)[0]] = true;
    
              }
              else if (cookie[Object.keys(cookie)[0]] === 'false') {
                model[Object.keys(cookie)[0]] = false;
    
              }
              else {
                model[Object.keys(cookie)[0]] = cookie[Object.keys(cookie)[0]];
              }
            }
          }
          let old_errs = model.errors;
          old_errs.push(error.toString());
          model.questions ??= [];
          model.answers ??= [];
          model.tags ??= [];
          model.current_user ??= {
            _id: '',
            username: '',
            reputation: 0,
            email: '',
            questions: [],
            answers: [],
            tags: [],
            voted_on: []
          }
          return {
            ...model,
            errors: old_errs
          }
        })
      }
    })();
  

      
  }, []);

  return (
    <div>
      {
        (banner_pages.includes(model.current_page) 
        ? <><Banner model={model} setCurrentPage={setCurrentPage} search={search} logout={logout}></Banner>
          <div id="padding"></div></>
        : '')
      }
      {Pages[model.current_page]}

    </div>
  )

  function setCurrentPage(newPage) {
    setModel(() => {
      document.cookie = 'current_page=' + newPage;
      document.cookie = 'fromSearch=' + false;
      document.cookie = 'fromTags=' + false;
      document.cookie = 'fromProfileTags=' + false;
      document.cookie = 'current_profile_page=' + 1;

      return {
        ...model, 
        current_page: newPage,
        current_questions_page: 1,
        current_profile_page: 1,
        fromSearch: false,
        fromTags: false,
        fromProfileTags: false,
        errors: []
      }});
  }

  function setCurrentQuestion(newQid) {
    incrementViewCount(newQid);
    setModel(() => {
      const question = model.questions.find(q => q._id === newQid);
      question.current_page = 1;
      question.current_comment_page = 1;
      
      const answers = model.answers.map(a => {return {...a, current_comment_page: 1}});
      const questions = model.questions.map(q => q._id === newQid ? question: q);
      
      question.views++;

      document.cookie = 'current_qid=' + newQid;
      document.cookie = 'current_page=' + model.Pages.Question;
      return {
        ...model,
        current_qid: newQid,
        current_page: model.Pages.Question,
        answers: answers,
        questions: questions
      }
    })
  }

  async function pushAnswer() {
    try {

      let text = document.getElementById("text").value;
      
      let errors = [];
      if (text.length === 0)      errors.push("Text cannot be empty!");
      
      if (errors.length > 0) {
        setModel(() => {
          return {
            ...model,
            errors: errors
          }});
          return -1;
        }
        
        let answer = {};  
        answer._id = 'a' + (Date.now() + Math.random());
        answer.text = text;
        answer.comments = [];
        answer.votes = 0;
        answer.current_comment_page = 1;
        answer.ans_by = model.current_user.username;
        answer._uid = model.current_user._id;

        answer.ans_date_time = await postAnswer(answer, model.current_qid, model.current_user._id);
        setModel(() => {
          const question = model.questions.find(q => q._id === model.current_qid);
          question.answers.unshift(answer._id);
          model.answers.push(answer);
          model.current_user.answers.push(answer._id);
  
          document.cookie = 'current_page=' + model.Pages.Question;
          return {
            ...model,
            errors: [],
            current_page: model.Pages.Question,
          }
      });
    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  async function pushQuestion() {
    try {

      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;
      let summary = document.getElementById("summary").value;
      let tags = document.getElementById("tags").value.toLowerCase();
  
      let errors = [];
      if (title.length === 0)    errors.push("No title given!");
      if (title.length >= 50)    errors.push("Title cannot be more than 140 characters!");
      // if (tags.length === 0)     errors.push("Tags cannot be empty!");
      // if (summary.length === 0)  errors.push("Summary cannot be empty!");
      if (summary.length >= 140) errors.push("Summary cannot be more than 140 characters!");
    
      let question = {};
      question._id = 'q' + (Date.now() + Math.random());
      question.title = title;
      question.text = text;
      question.asked_by = model.current_user.username;
      question._uid = model.current_user._id
      question.answers = [];
      question.comments = [];
      question.summary = summary;
      question.views = 0;
      question.votes = 0;
      
      let tag_names = tags.split(/\s+/).filter(tag => tag !== "");
      tag_names = [...new Set(tag_names)];
      
      const names_already_added = tag_names.filter(tagname => model.tags.some(tag => tag.name === tagname));
      const names_to_be_added = tag_names.filter(tagname => !names_already_added.includes(tagname));
      
      if (names_to_be_added.length > 0 && model.current_user.reputation < 100) errors.push("You must have at least 100 reputation to create a new tag!");
      
      if (errors.length > 0) {
        setModel(() => {
          return {
            ...model,
            errors: errors
          }})
        return -1;
      }
      const tags_already_added = names_already_added.map(tagname => {
        return {
          name: tagname, 
          _id: model.tags.find(tag => tag.name === tagname)._id,
          _uid: model.current_user._id
        }
      });
      const tags_to_be_added = names_to_be_added.map(tagname => {
        return {
          name: tagname,
          _id: 't' + (Date.now() + Math.random()),
          _uid: model.current_user._id
        }
      });
  
      question.tags = [...tags_already_added.map(tag => tag._id), ...tags_to_be_added.map(tag => tag._id)];
      question.ask_date_time = await postQuestion(question, tags_already_added, tags_to_be_added, model.current_user._id);
      
      setModel(() => {
        model.questions.unshift(question);
        model.tags.push(...tags_to_be_added);
        model.current_user.questions.push(question._id);
        model.current_user.tags.push(...tags_already_added.map(tag => tag._id), ...tags_to_be_added.map(tag => tag._id));
        // remove duplicates
        model.current_user.tags = [...new Set(model.current_user.tags)];
  
        document.cookie = 'current_page=' + model.Pages.Display_Questions;
        document.cookie = 'current_questions_page=' + 1;
        // console.log('after adding', model.questions);
        return {
          ...model,
          errors: [],
          current_page: model.Pages.Display_Questions,
          current_questions_page: 1
        }
      })
    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  function search(e) {
    if (e.key === "Enter") {
      setModel(() => {
        document.cookie = 'current_page=' + model.Pages.Display_Questions;
        document.cookie = 'current_questions_page=' + 1;
        document.cookie = 'fromSearch=' + true;
        document.cookie = 'fromTags=' + false;
        document.cookie = 'searchString=' + e.target.value;
        return {
          ...model,
          current_page: model.Pages.Display_Questions,
          current_questions_page: 1,
          fromSearch: true,
          fromTags: false,
          fromProfileTags: false,
          searchString: e.target.value
        }
      })
    }
  }

  function clickTag(tag) {
    setModel(() => {
      document.cookie = 'current_page=' + model.Pages.Display_Questions;
      document.cookie = 'current_questions_page=' + 1;
      document.cookie = 'fromSearch=' + false;
      document.cookie = 'fromTags=' + true;
      document.cookie = 'tag=' + tag;

      return {
        ...model,
        current_page: model.Pages.Display_Questions,
        current_questions_page: 1,
        fromSearch: false,
        fromTags: true,
        fromProfileTags: false,
        tag: tag,
      }
    })
  }
  
  async function registerUser() {
    try {

      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let verify_password = document.getElementById("verify_password").value;
      let _id = 'u' + (Date.now() + Math.random());
  
      let errors = [];
  
      if (password !== verify_password)                            errors.push("Passwords do not match!");
      if (password.length === 0)                                   errors.push("Password cannot be empty!");
      if (!validate(email))                                        errors.push("Email is not valid!");
      if (username.length === 0)                                   errors.push("Username cannot be enpty!");
      if (!(await isUnique(email)))                                errors.push("Email address taken!");   
      if (password.toLowerCase().includes(username.toLowerCase())) errors.push("Password cannot contain user details!")
      if (password.toLowerCase().includes(email.toLowerCase()))    errors.push("Password cannot contain user details!")
  
      
      if (errors.length > 0) {
        setModel(() => {
          return {
            ...model,
            errors: errors
          }});
          return -1;
      }
  
      const user = {
        _id, username, email, password
      }
      postUser(user);
  
      setModel(() => {
        // model.data.users.push(user);
        document.cookie = 'current_page=' + model.Pages.Login;
        return {
          ...model,
          errors: [],
          current_page: model.Pages.Login,
        }
      });
    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
    


  }
  
  async function loginUser() {
    try {

      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
  
      const {err, user} = await verifyUser(email, password);
      if (err !== '') {
        setModel(() => {
          return {
            ...model,
            errors: [err],
          }
        });
        return;
      }
      
      user.password = '';
      user.email = '';
  
      setModel(() => {
  
        document.cookie = 'current_page=' + model.Pages.Display_Questions;
        document.cookie = 'current_questions_page=' + 1;
        document.cookie = 'current_user=' + JSON.stringify(user);
        return {
          ...model,
          current_page: model.Pages.Display_Questions,
          current_questions_page: 1,
          errors: [],
          current_user: user
        }
      })
    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  async function logout() {
    try {
      await pushLogout();
      setModel(() => {
  
        document.cookie = 'current_user=';
        document.cookie = 'current_page=' + model.Pages.Welcome;
        return {
          ...model,
          current_user: '',
          errors: [],
          current_page: model.Pages.Welcome,
        }
      })

    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  function selectElement(id, type, tagid) {
    setModel(() => {

      document.cookie = 'currently_selected=' +  (id + ' ' + tagid);
      return {
        ...model,
        currently_selected: id + ' ' + tagid
      }
    })
  }

  async function updateQuestion(id, tagid) {
    // COPIED FOR DEBUGGING, REMOVE LATER
    try {
      const q_data = document.getElementById(id).childNodes;

      const question = {};

      question._id = id;
      question._uid = model.current_user._id;
      question.title = (q_data[0].firstChild.firstChild && q_data[0].firstChild.firstChild.firstChild) ? q_data[0].firstChild.firstChild.firstChild.value : q_data[0].firstChild.innerText;
      question.summary = (q_data[3].firstChild.firstChild && q_data[3].firstChild.firstChild.firstChild) ? q_data[3].firstChild.firstChild.firstChild.value : q_data[3].firstChild.innerText;
      question.text = (q_data[5].firstChild && q_data[5].firstChild.firstChild) ? q_data[5].firstChild.firstChild.value : q_data[5].innerText;

      const q_tags = q_data[6].childNodes;
      let newname;
      for (let q_tag of q_tags) {
        if (q_tag.firstChild && q_tag.firstChild.firstChild && q_tag.firstChild.firstChild.firstChild && q_tag.firstChild.firstChild.firstChild.firstChild) {
          newname = q_tag.firstChild.firstChild.firstChild.firstChild.value
        }
      }
      await pushQuestionUpdate(question, newname, tagid);
      synchronizeModel();
    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  async function updateAnswer(id) {
    try {
      const newtext = document.getElementById(id).firstChild.firstChild.value;
      const answer = model.answers.find(ans => ans._id === id);
      answer.text = newtext;
      await pushAnswerUpdate(id, newtext);
      synchronizeModel();

    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  async function updateTag(id) {
    try {
      const name = document.getElementById(id).firstChild.firstChild.value;
      await pushTagUpdate({_id: id, _uid: model.current_user._id, name});
      synchronizeModel();

    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  async function deleteAnswer(id) {
    // if (e.relatedTarget) {
      try {
        // e.stopPropagation();
        await pushDeleteAnswer(id, model.current_user._id);
        synchronizeModel();

      }
      catch (error) {
        return emptyModelWithErrors(error);
      }
    // }
  }

  async function deleteQuestion(id, tagid) {
    // if (e.relatedTarget) {
      try {
        // e.stopPropagation();
        await pushDeleteQuestion(id, tagid, model.current_user._id);
        synchronizeModel();

      }
      catch (error) {
        return emptyModelWithErrors(error);
      }
    // }
  }

  async function deleteTag(id) {
    // if (e.relatedTarget) {
      try {
        // e.stopPropagation();
        await pushDeleteTag(id, model.current_user._id);
        synchronizeModel();

      }
      catch (error) {
        return emptyModelWithErrors(error);
      }
    // }
  }

  async function removeTagFromQuestion(id, tid) {
    // if (e.relatedTarget) {
      try {
        // e.stopPropagation();
        await pushRemoveTagFromQuestion(id, tid, model.current_user._id);
        synchronizeModel();

      }
      catch (error) {
        return emptyModelWithErrors(error);
      }
    // }
  }

  async function submitComment(e, id) {
    if (e.keyCode === 13) {
      try {
        let errors = [];
        if (e.target.value.length > 140)         errors.push("Comment may not be more than 140 characters!");
        if (model.current_user === '')           errors.push("You must be logged in to comment!");
        if (model.current_user.reputation < 100) errors.push("You need 100 reputation to comment!");


        if (errors.length > 0) {
          setModel(() => {
            return {
              ...model,
              errors: errors
            }});
            return -1;
          }

        await pushComment(e.target.value, id, model.current_user.username);
  
        const user = await getUser(model.current_user._id);
        const tags = await getTags();
        let answers = await getAnswers();
        let questions = await getQuestions();
  
        const old_question = model.questions.find(q => q._id === id);
        questions = questions.map(q => (q._id === id) 
        ? {...q, current_comment_page: old_question.current_comment_page, current_page: old_question.current_page}
        : q); 
  
        // get the old question's page and current page before we update it
        questions = questions.map(q => {
          let old_q = model.questions.find(matching_q => q._id === matching_q._id);
          return {
            ...q, 
            current_comment_page: old_q.current_comment_page,
            current_page: old_q.current_page,
        }})
        answers = answers.map(a => {return {...a, current_comment_page: model.answers.find(old_a => old_a._id === a._id).current_comment_page}});
    
        e.target.value = '';
        setModel(() => {
  
          document.cookie = 'currently_selected=';
          return {
            ...model,
            current_user: user,
            currently_selected: '',
            errors: [],
            questions: questions,
            answers: answers,
            tags: tags 
          }
        })
      }
      catch (error) {
        return emptyModelWithErrors(error);
      }
    }
  }

  async function userVote(id, isUpvote) {
    try {
      let errors = [];
      if (model.current_user.reputation < 100) errors.push("You need 100 reputation to vote!");

      if (errors.length > 0) {
        setModel(() => {
          return {
            ...model,
            errors: errors
          }});
          return -1;
        }

      await voteOnContent(id, isUpvote, model.current_user._id);
  
      const user = await getUser(model.current_user._id);
      const tags = await getTags();
      let answers = await getAnswers();
      let questions = await getQuestions();
  
      const old_question = model.questions.find(q => q._id === id);
      questions = questions.map(q => (q._id === id) 
      ? {...q, current_comment_page: old_question.current_comment_page, current_page: old_question.current_page}
      : q); 
  
      // get the old question's page and current page before we update it
      questions = questions.map(q => {
        let old_q = model.questions.find(matching_q => q._id === matching_q._id);
        return {
          ...q, 
          current_comment_page: old_q.current_comment_page,
          current_page: old_q.current_page,
      }})
      answers = answers.map(a => {return {...a, current_comment_page: model.answers.find(old_a => old_a._id === a._id).current_comment_page}});
  
      setModel(() => {
  
        document.cookie = 'currently_selected=';
        return {
          ...model,
          current_user: user,
          currently_selected: '',
          errors: [],
          questions: questions,
          answers: answers,
          tags: tags
        }
      })
    }
    catch (error) {
      return emptyModelWithErrors(error);
    }
  }

  function changePage(id, prev, qcomments) {
    let increment = (prev) ? -1 : 1
    if (id === 'QuestionsList')
      setModel(() => {

        document.cookie = 'current_questions_page=' + (model.current_questions_page + increment);
        return {
          ...model,
          current_questions_page: model.current_questions_page + increment
        }
      })
    else if (id === 'ProfileAnswers') {
      setModel(() => {

        document.cookie = 'current_profile_page=' + (model.current_profile_page + increment);
        return {
          ...model,
          current_profile_page: parseInt(model.current_profile_page) + increment
        }
      })
    }
    else if (id[0] === 'a') {

      setModel(oldModel => {
        const answers = oldModel.answers.map(answer => 
          (answer._id === id) 
          ? {...answer, current_comment_page: answer.current_comment_page + increment} 
          : answer);

        // document.cookie = id + '-current_comment_page=' + model.answers.find(a => a._id === id).current_comment_page + increment;

        return {
          ...model,
          answers: answers
        }
      })
    }
    // changing the page of the comments
    else if (id[0] === 'q' && qcomments) {
      setModel(oldModel => {
        const questions = oldModel.questions.map(question => 
          (question._id === id) 
          ? {...question, current_comment_page: question.current_comment_page + increment} 
          : question);

        // document.cookie = id + '-current_comment_page=' + model.questions.find(q => q._id === id).current_comment_page + increment;

        return {
          ...model,
          questions: questions
        }
      })
    }
    // changing the page of the answers
    else if (id[0] === 'q' && !qcomments) {

      setModel(oldModel => {
        const questions = oldModel.questions.map(question => 
          (question._id === id) 
          ? {...question, current_page: question.current_page + increment} 
          : question);

        // document.cookie = id + '-current_page=' + model.questions.find(q => q._id === id).current_page + increment;
        
        return {
          ...model,
          questions: questions 
        }
      })
    }
  }
  
  function profileClickTag(text) {
    setModel(() => {
      document.cookie = 'current_page=' + model.Pages.Display_Questions;
      document.cookie = 'current_questions_page=' + 1;
      document.cookie = 'fromSearch=' + false;
      document.cookie = 'fromProfileTags=' + true;
      document.cookie = 'fromTags=' + false;
      document.cookie = 'tag=' + text;

      return {
        ...model,
        current_page: model.Pages.Display_Questions,
        current_questions_page: 1,
        fromSearch: false,
        fromTags: false,
        fromProfileTags: true,
        tag: text
      }
    })
  }

  async function synchronizeModel() {
    const user = await getUser(model.current_user._id);
    const tags = await getTags();
    const answers = await getAnswers();
    const questions = await getQuestions();

    setModel((model) => {

      document.cookie = 'currently_selected=';
      return {
        ...model,
        current_user: user,
        currently_selected: '',
        questions: questions,
        answers: answers,
        tags: tags
      }
    })
  }

  function emptyModelWithErrors(errors) {
    let cookies = document.cookie.split(';');
    cookies = cookies.map(cookie => {
      return {[cookie.split('=')[0].trim()]: cookie.split('=')[1]}
    });
    for (let cookie of cookies) {
      if (Object.keys(cookie)[0] === 'current_user') {
      }
      else {
        if (cookie[Object.keys(cookie)[0]] === 'true') {
          model[Object.keys(cookie)[0]] = true;

        }
        else if (cookie[Object.keys(cookie)[0]] === 'false') {
          model[Object.keys(cookie)[0]] = false;

        }
        else {
          model[Object.keys(cookie)[0]] = cookie[Object.keys(cookie)[0]];
        }
      }
    }
    let old_errs = model.errors;
    old_errs.push(errors.toString());
    model.questions ??= [];
    model.answers ??= [];
    model.tags ??= [];
    model.current_user ??= {
      _id: '',
      username: '',
      reputation: 0,
      email: '',
      questions: [],
      answers: [],
      tags: [],
      voted_on: []
    }
    setModel(() => {
      return {
        ...model,
        errors: old_errs,
        currently_selected: ''
      }

    })
  }
  function getSearchResults(search_string) {
    let questions = [];
  
    let space_separated_search = search_string.split(/\s+/);
    let words = [];
    let tags = [];
    for (let word of space_separated_search) {
      if (word[0] === '[' && word[word.length - 1] === ']') { 
        tags.push(word.substring(1, word.length - 1));
      }
      else {
        words.push(word);
      }
    }
  
    let tids = [];
    // get all tids corresponding to tags 
    for (let tag of tags) 
      for (let db_tag of model.tags) 
        if (tag.toLowerCase() === db_tag.name.toLowerCase()) 
          tids.push(db_tag._id);
  
    // for each question, check if any of the tags is in the question
    for (let question of model.questions) {
      for (let tid of tids) {
        if (question.tags.includes(tid)) {
          questions.push(question);
        }
      }
    }
  
    // for each question, check if any of the words of the search string are present in the question title or question text
    for (let question of model.questions) {
      let title_words = question.title.split(/\s+/);
      for (let title_word of title_words) {
        for (let query_word of words) {
          if (title_word.toLowerCase() === query_word.toLowerCase()) {
            questions.push(question);
          }
        }
      }
      let text_words = question.text.split(/\s+/);
      for (let text_word of text_words) {
        for (let query_word of words) {
          if (text_word.toLowerCase() === query_word.toLowerCase()) {
            questions.push(question);
          }
        }
      }
    }
    // remove duplicates, questions that might have been added on matches with tags and with words
    questions = [ ...new Set(questions)];
  
    return questions;
  }
  function getDate(datetime) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    datetime = new Date(datetime);

    let month = months[datetime.getMonth()];
    let day = datetime.getDate();
    let year = datetime.getFullYear();
    let date = `${month} ${day}, ${year}`;

    return date;
}
  function getTime(datetime) {
    datetime = new Date(datetime);

    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    minute = (minute < 10) ? '0' + minute : minute;
    let time = `${hour}:${minute}`;

    return time;
  }
}



export default FakeStackOverflow