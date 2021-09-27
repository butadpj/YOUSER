// IMPORTS
import { showRequestFeedback } from "./feedback.js";
//

// FUNCTIONS
const addNewUser = (data) => {
  const usersListContainer = document.getElementById('users-list');
  const errors = data[0]; 

  if (!errors) {
    createAndInsertUserContainer(data, usersListContainer);
    showRequestFeedback('success');
  } else showRequestFeedback('failed', errors); 
}

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

const createAndInsertUserDetails = (
  {
    id, 
    name, 
    email, 
    status
  }, 
  parentContainer
  ) => {
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
//

// EXPOSE
export { addNewUser }