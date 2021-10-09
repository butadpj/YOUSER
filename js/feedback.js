// SELECTORS
let requestFeedback = document.getElementById('requestFeedback');
//

// FUNCTIONS
const fieldErrorMessage = (field) => {
  if (field === 'gender') return 'Gender should only be Male/Female';

  if (field === 'email') return 'Email has already been taken by someone else';

  // Default
  return "Something is wrong. Don't worry, it's not your fault";
}

const showRequestFeedback = (status, errors = {}) => {
  const feedBackShowTime = 3000; // milliseconds

  if (status === 'success') {
    requestFeedback.classList.remove('request-feedback--danger');
    requestFeedback.textContent = 'A new YOUSER added';
  }

  if (status === 'failed') {
    requestFeedback.classList.add('request-feedback--danger');
    requestFeedback.textContent = fieldErrorMessage(errors.field);
  }
    
  requestFeedback.classList.add('request-feedback--show');
  setTimeout(hideRequestFeedback, feedBackShowTime);
}

const hideRequestFeedback = () => {
  requestFeedback.classList.remove('request-feedback--show');
}
//

// EXPOSE
export { showRequestFeedback, hideRequestFeedback }