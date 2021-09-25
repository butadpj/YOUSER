// SELECTORS
const loaderWrapper = document.getElementById('loaderWrapper');

// FUNCTIONS
export const showLoader = () => {
  loaderWrapper.classList.remove('hide');
}

export const hideLoader = () => {
  loaderWrapper.classList.add('hide');
}