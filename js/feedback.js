// FUNCTIONS
export const showRequestFeedback = (status, errors = {}) => {
  if (status === 'success') {
    requestFeedback.textContent = 'A new YOUSER added';
  } else if (status === 'failed') {
    // If there's an error
    if (errors.field === 'gender') {
      requestFeedback.textContent = 'Gender should only be either Male/Female';
    } else if (errors.field === 'email') {
      requestFeedback.textContent = 'Email has already been taken by someone else';
    } else  {
      requestFeedback.textContent = "Something is wrong. Don't worry, it's not your fault";
    }
  }
    requestFeedback.classList.add('request-feedback--show');
    setTimeout(hideRequestFeedback, 2500);
}

export const hideRequestFeedback = () => {
  requestFeedback.classList.remove('request-feedback--show');
}
