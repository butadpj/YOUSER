// SELECTORS
const loaderWrapper = document.getElementById('loaderWrapper');
//

// FUNCTIONS
const showLoader = () => {
  loaderWrapper.classList.remove('hide');
}

const hideLoader = () => {
  loaderWrapper.classList.add('hide');
}
//

// EXPOSE
export { showLoader, hideLoader }
