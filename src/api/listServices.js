const axios = require('axios');

const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export const createList = async (name, description) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const endpoint = `${url}/list/create`;

  const list = {
    name: name,
    description: description
  };

  const data = await axios.post(endpoint, list);
  return data;
};

export const getLists = async (token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/lists`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteList = async (id, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/list/delete`;
    const data = await axios.delete(endpoint, {
      params: {
        id: id
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
};
