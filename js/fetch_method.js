// FUNCTIONS
const getMethod = (url, callBackFunction) => {
  fetch(url)
  .then(response => response.json())
  .then(result => callBackFunction(result))
  .catch(error => console.log(error));
}

const postMethod = (url, data, callBackFunction) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => callBackFunction(result))
  .catch(error => console.log(error));
}
//

const fetchMethod = {
  get: getMethod,
  post: postMethod,
}

// EXPOSE
export default fetchMethod
