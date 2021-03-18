import { message } from 'antd';

export const ShowSuccess = (msg) => {
  message.success({
    content: msg,
    className: 'custom-class'
  });
};

export const ShowError = (msg) => {
  message.error({
    content: msg,
    className: 'custom-class'
  });
};

// export const renderErrorMessage = (error) => {
//   console.log(error);
//   return <Alert message={error} type="error" showIcon style={{ marginBottom: '0.5em' }} />;
// };

// //! types: success, info, warning, error
// export const renderSuccessMessage = (message, description, type) => {
//   return <Alert message={message} description={description} type={type} showIcon />;
// };
