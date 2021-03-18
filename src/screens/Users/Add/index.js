import React, { useRef } from 'react';

import { Modal, Form, Input, Switch, Button } from 'antd';

import { getMessage } from '../../../utils/language';
import { getDate } from '../../../utils/date';

import { createUser } from '../../../api/userServices';
import { ShowError, ShowSuccess } from '../../../components';

export const AddModal = (props) => {
  const [isModalVisible, setIsModalVisible] = props.modalState;
  const submitButtonRef = useRef();

  const handleOk = () => {
    submitButtonRef.current.click();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const { username, email, password, admin } = values;
    // console.log(values);

    const responseData = await createUser(username, password, email, admin);
    const { statusCode, response, message } = responseData.data;

    if (statusCode === 400) ShowError(message);
    else {
      const [data, setData] = props.useStateData;

      const newUser = {
        key: response._id,
        ...response,
        createdAt: getDate(response.createdAt)
      };
      setData([...data, newUser]);

      ShowSuccess(getMessage('USER_CONFIRMATIONADDED', null));
      setIsModalVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={getMessage('USER_MODALADD_TITLE', null)}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ admin: false }}>
        <Form.Item
          label={getMessage('USER_LABEL_USERNAME', null)}
          name="username"
          rules={[
            {
              required: true,
              message: getMessage('USER_ERROR_USERNAME_MESSAGE', null)
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={getMessage('USER_LABEL_EMAIL', null)}
          name="email"
          rules={[
            {
              type: 'email',
              message: getMessage('USER_ERROR_INVALID_EMAIL_MESSAGE', null)
            },
            {
              required: true,
              message: getMessage('USER_ERROR_EMAIL_MESSAGE', null)
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={getMessage('USER_LABEL_PASSWORD', null)}
          name="password"
          rules={[{ required: true, message: getMessage('USER_ERROR_PASSWORD_EMPTY', null) }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={getMessage('USER_LABEL_REPEATPASSWORD', null)}
          name="repeatpassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: getMessage('USER_ERROR_CONFIRMPASSWORD_EMPTY', null) },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error(getMessage('USER_ERROR_PASSWORD_NOTMATCH', null)));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="admin" valuePropName="checked" label={getMessage('USER_LABEL_ISADMIN', null)}>
          <Switch defaultChecked={false} />
        </Form.Item>
        <Form.Item>
          <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
