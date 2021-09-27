// IMPORTS
import { usersApiEndpoint } from './api_variables.js';
import { addNewUser } from './dom.js';
import fetchMethod from './fetch_method.js';
import { showLoader, hideLoader } from './loader.js';
//

// SELECTORS
const modalWrapper = document.getElementById('modalWrapper');
const modalForm = document.getElementById('modalForm');
//

// FUNCTIONS
const hideModal = () => {
  modalWrapper.classList.add('hide');
  document.body.style.overflow = 'auto';
}

const showModal = () => {
  modalWrapper.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}

const createNewUser = ({name, gender, email}) => {
  showLoader();

  const usersData = {
    name: name, 
    gender: gender,
    email: email,
    status: 'active',
  }
  
  fetchMethod.post(
    usersApiEndpoint, 
    usersData, 
    (result) => {
      const data = result.data; // data[0] is the errors
      addNewUser(data);
      hideModal();
      hideLoader();
    }
  );
};

const submitForm = (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const genderInput = document.getElementById('gender-input');

  const inputDataObject = {
    name: nameInput.value, 
    email: emailInput.value, 
    gender: genderInput.value
  };

  createNewUser(inputDataObject);
}
//

// LISTENERS
modalWrapper.addEventListener('click', (event) => {
  // Close modal if clicked outside
  if (!modalForm.contains(event.target)) hideModal();
});

modalForm.addEventListener('submit', (event) => submitForm(event));
//

// EXPOSE
export { hideModal, showModal }
