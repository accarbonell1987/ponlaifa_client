const USER = '**cbhsss**user';
const LIST = '**cbhsss**list';
const VIDEO = '**cbhsss**video';

exports.getUser = () => {
  return JSON.parse(localStorage.getItem(USER));
};
exports.setUser = (data) => {
  localStorage.setItem(USER, JSON.stringify(data));
};
exports.removeUser = () => {
  localStorage.removeItem(USER);
};

exports.setActiveList = (data) => {
  localStorage.setItem(LIST, JSON.stringify(data));
};
exports.getActiveList = () => {
  return JSON.parse(localStorage.getItem(LIST));
};

exports.setActiveVideo = (data) => {
  localStorage.setItem(VIDEO, JSON.stringify(data));
};
exports.getActiveVideo = () => {
  return JSON.parse(localStorage.getItem(VIDEO));
};
