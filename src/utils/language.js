const language = process.env.REACT_APP_LANGUAGE || 'es';
const string = require('../common/strings');

export const getMessage = (prefix, data) => {
  return string[`${language.toUpperCase()}_${prefix}`](data);
};
