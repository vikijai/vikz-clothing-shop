export const fetchApi = (url, method, formData) => {
  // console.log(JSON.stringify(formData))
  if (method === 'GET') {
    return fetch(url)
      .then((res) => {
        // if successful
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          return {
            statusCode: 404,
            status: res.status,
            error: new Error('Invalid Response')
          };
        }
      })
      .catch((err) => {
        // if error occurs
        console.log(err);
        return {
          statusCode: 404,
          status: err.status,
          error: new Error('Invalid Response')
        };
      })
      .finally(() => {
        console.log('It is over!');
      });
  } else if (method === 'PUT') {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        // if successful
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          return {
            statusCode: 404,
            status: res.status,
            error: new Error('Invalid Response')
          };
        }
      })
      .catch((err) => {
        // if error occurs
        console.log(err);
        return {
          statusCode: 404,
          status: err.status,
          error: new Error('Invalid Response')
        };
      })
      .finally(() => {
        console.log('It is over!');
      });
  } else if (method === 'POST') {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        // if successful
        console.log(res)
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          return {
            statusCode: 404,
            status: res.status,
            error: new Error('Invalid Response')
          };
        }
      })
      .catch((err) => {
        // if error occurs
        console.log(err);
        return {
          statusCode: 404,
          status: err.status,
          error: new Error('Invalid Response')
        };
      })
      .finally(() => {
        console.log('It is over!');
      });
  }
};
