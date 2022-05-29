import React from 'react'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'

function Vote({model, id, userVote}) {
  let post;
  if (id[0] === 'a')
    post = model.answers.find(a => a._id === id);
  else if (id[0] === 'q')
    post = model.questions.find(q => q._id === id);

  // these buttons should only exist for a logged-in user
  let upvoteDisabled =   model.current_user && model.current_user.voted_on.some(voteRecord => voteRecord.id === id && voteRecord.upvote);
  let downvoteDisabled = model.current_user && model.current_user.voted_on.some(voteRecord => voteRecord.id === id && !voteRecord.upvote);
  
  let upvoteClass = (upvoteDisabled) ? 'vote-inactive' : 'vote-active';
  let downvoteClass = (downvoteDisabled) ? 'vote-inactive' : 'vote-active';

  return (
      <>
        {
          (model.current_user)
          ? <>
              <ImArrowUp disabled={upvoteDisabled} className={upvoteClass} onClick={() => userVote(id, true)}></ImArrowUp><br></br>
              <b>{post.votes >= 0 ? '\u00a0' : ''}{post.votes}</b><br></br>
              <ImArrowDown disabled={downvoteDisabled} className={downvoteClass} onClick={() => userVote(id, false)}></ImArrowDown>
              </>
            : ''
        }
      </>
  )
}

export default Vote