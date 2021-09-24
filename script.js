
const accessToken = 'd96c145d91cc3fbd199fc361d1211cdf7d008c421ab968ddcdabee311d9e8d83';
const usersApiEndpoint = `https://gorest.co.in/public/v1/users?access-token=${accessToken}`;

const nav = document.getElementById('nav');
const modalWrapper = document.getElementById('modal-wrapper');
const loaderWrapper = document.getElementById('loader-wrapper');
const modalForm = document.getElementById('modal-form');
const requestFeedback = document.getElementById('request-feedback');

const createAndInsertUserContainer = (usersData, parentContainer) => {
  const newUserContainer = document.createElement('DIV');
  newUserContainer.classList.add('user', 'card', 'hoverable');
  parentContainer.prepend(newUserContainer);

  createAndInsertUserImage(usersData, newUserContainer);
  createAndInsertUserDetails(usersData, newUserContainer);
}

const createAndInsertUserImage = ({name}, parentContainer) => {
  const userImg = document.createElement('IMG');
  const randomNum = Math.floor(Math.random() * 70) + 1; // 70 is the max number for https://pravatar.cc/images
  userImg.src = `https://i.pravatar.cc/500?img=${randomNum}`;
  userImg.alt = `${name}-img`;
  userImg.classList.add("user__img");
  parentContainer.prepend(userImg);
}

const createAndInsertUserDetails = ({id, name, email, status}, parentContainer) => {
  const userDetailsContainer = document.createElement('DIV');
  userDetailsContainer.classList.add('main__info');
  userDetailsContainer.innerHTML = `
    <span class='light'>ID# ${id} </span>- ${name} 
  `;

  parentContainer.appendChild(userDetailsContainer);

  const focusContentContainer = document.createElement('DIV');
  focusContentContainer.classList.add('focus__content', 'light');

  const focusContentElements = [
    `Name: ${name}`, 
    `Email: ${email}`, 
    `Status: ${status}`,
  ];

  focusContentElements.forEach(element => {
    const elementContainer = document.createElement('P');
    elementContainer.textContent = element;
    focusContentContainer.appendChild(elementContainer);
  });

  parentContainer.appendChild(focusContentContainer);
}

const addNewUser = (data) => {
  const usersListContainer = document.getElementById('users-list');
  const errors = data[0]; 

  if (!errors) {
    createAndInsertUserContainer(data, usersListContainer);
    showRequestFeedback('success');
  } else showRequestFeedback('failed', errors); 
}

const createNewUser = ({name, gender, email}) => {
  showLoader();
  fetch(usersApiEndpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      gender: gender,
      email: email,
      status: 'active',
    })
  })
    .then(response => response.json())
    .then(result => {
      const data = result.data; // data[0] is the errors
      addNewUser(data);
      hideModal();
      hideLoader();
    })
    .catch(error => console.log(error));
};

const showRequestFeedback = (status, errors = {}) => {
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

const hideRequestFeedback = () => {
  requestFeedback.classList.remove('request-feedback--show');
}

const showLoader = () => {
  loaderWrapper.classList.remove('hide');
}

const hideLoader = () => {
  loaderWrapper.classList.add('hide');
}

const showModal = () => {
  modalWrapper.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  modalClosable();
}

const hideModal = () => {
  modalWrapper.classList.add('hide');
  document.body.style.overflow = 'auto';
}

const modalClosable = () => {
  modalWrapper.addEventListener('click', (event) => {
    if (!modalForm.contains(event.target)) hideModal();
  });
}

const submitForm = (event) => {
  event.preventDefault();
  console.log("Form submitted");
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

modalForm.addEventListener('submit', (event) => submitForm(event));

nav.addEventListener('click', () => {
  window.scrollTo(0, 0); // Scroll to the very top
  showModal();
});

