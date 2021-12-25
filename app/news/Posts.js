'use strict';

// http://www.dailynews.lk/line/bbc
const getPosts = (url, callback) => {
  fetch(url).then(response => response.json())
    .then((response) => {
      callback(response)
    })
    .catch((error) => {
      alert(error)
    })
}

export { getPosts as default };
