const axios = require('axios');

const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export const loginUser = async (username, password) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const endpoint = `${url}/user/login`;

  const user = {
    username: username,
    password: password
  };
  const data = await axios.post(endpoint, user);
  return data;
};

export const createUser = async (username, password, email, admin) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const endpoint = `${url}/user/create`;

  const user = {
    username: username,
    password: password,
    email: email,
    admin: admin
  };

  const data = await axios.post(endpoint, user);
  return data;
};

export const getUsers = async (token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/users`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/user/?id=${id}`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/user/delete`;
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

export const changePassword = async (id, oldPassword, newPassword) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const endpoint = `${url}/user/password`;

  const userData = {
    id: id,
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  const data = await axios.post(endpoint, userData);
  return data;
};

export const approveList = async (id, listId, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/user/approvelist/?id=${id}`;
    const data = await axios.put(endpoint, { listId: listId });

    return data;
  } catch (error) {
    throw error;
  }
};

export const dissaproveList = async (id, listId, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/user/disapprovelist/?id=${id}`;
    const data = await axios.put(endpoint, { listId: listId });

    return data;
  } catch (error) {
    throw error;
  }
};
