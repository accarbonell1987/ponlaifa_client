const axios = require('axios');

export const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export const getVideos = async (token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/videos`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUnasignedVideos = async (token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/videos/unasigned`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getVideoPoster = async (name, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/video/poster`;
    const data = await axios.get(endpoint, {
      params: {
        name: name
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteVideo = async (id, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/video/delete`;
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

export const updateListVideo = async (id, listId, token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/video/?id=${id}`;
    const data = await axios.put(endpoint, { listId: listId });

    return data;
  } catch (error) {
    throw error;
  }
};

export const addVideo = async (name, video, token) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const endpoint = `${url}/video/add`;

  const videoJSON = {
    name: name,
    video: video
  };

  const data = await axios.post(endpoint, videoJSON);
  return data;
};
