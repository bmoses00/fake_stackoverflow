export default class Model {
  constructor() {
    this.Pages = {
      Display_Questions: 'Display_Questions',
      New_Question: 'New_Question',
      Question: 'Question',
      New_Answer: 'New_Answer',
      Tags: 'Tags',
      Welcome: 'Welcome',
      Login: 'Login',
      Register: 'Register',
      Profile: 'Profile',
      Profile_Tags: 'Profile_Tags',
      Profile_Answers: 'Profile_Answers'
    }

    this.current_page = this.Pages.Welcome;
    this.current_qid = '';
    this.current_questions_page = 1;
    this.current_user = '';

    this.fromTags = false;
    this.tag = '';

    this.fromSearch = false;
    this.searchString = '';

    this.currently_selected = '';

    this.errors = [];
    this.questions = [];
    this.answers = [];
    this.comments = [];
    this.tags = [];
  }
}
