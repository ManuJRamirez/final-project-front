export const apiRest = () => {
  const baseUrl = 'http://localhost:8080/';
  //const baseUrl = 'http://16.170.166.103:8080/';

  const get = async endpoint => {
    const url = baseUrl + endpoint;
    let response;
    try {
      response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const message = data.message || 'Ha ocurrido un error';
        throw new Error(message);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const getFiltros = async (endpoint, filtros) => {
    const url = baseUrl + endpoint;
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(filtros),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const message = data.message || 'Ha ocurrido un error';
        throw new Error(message);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const remove = async endpoint => {
    const url = baseUrl + endpoint;
    const token = localStorage.getItem('token');
    let response;
    try {
      response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const message = data.message || 'No ha sido posible borrar el elemento';
        throw new Error(message);
      }
      const newToken = response.headers.get('Authorization');
      if (newToken) {
        localStorage.setItem('token', newToken.split(' ')[1]);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };
  const createAcc = async (endpoint, data) => {
    const url = baseUrl + endpoint;

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const message = data.error || 'No ha sido posible registar la cuenta';
        throw new Error(message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };

  const loginAcc = async (endpoint, body) => {
    const url = baseUrl + endpoint;
    let response;

    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data.token;
      } else {
        const message =
          data.message || 'No ha sido posible establecer la conexión.';
        throw new Error(message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };

  const createAd = async (endpoint, body) => {
    const url = baseUrl + endpoint;
    const token = localStorage.getItem('token');
    let response;

    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        return data;
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };
  const updateAd = async (endpoint, body) => {
    const url = baseUrl + endpoint;
    const token = localStorage.getItem('token');
    let response;

    try {
      response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        return data;
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };
  const post = async (endpoint, data) => {
    const url = baseUrl + endpoint;

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const message =
          data.error || 'No ha sido posible establecer la conexión.';
        throw new Error(message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };
  const postAuthUrl = async (endpoint, data) => {
    const url = baseUrl + endpoint;

    const urlActual = window.location.href;
    const params = new URLSearchParams(new URL(urlActual).search);
    const token = params.get('token');

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const message =
          data.error || 'No ha sido posible establecer la conexión.';
        throw new Error(message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
  };

  return {
    get: get,
    getFiltros: getFiltros,
    delete: remove,
    createAcc: createAcc,
    loginAcc: loginAcc,
    createAd: createAd,
    updateAd: updateAd,
    post: post,
    postAuthUrl: postAuthUrl,
  };
};
