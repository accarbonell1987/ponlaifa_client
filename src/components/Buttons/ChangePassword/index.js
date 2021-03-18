import React, { useState, useRef } from 'react';
import { Space, Button, Modal, Tooltip, Form, Input } from 'antd';

import { LockOutlined } from '@ant-design/icons';

import { getMessage } from '../../../utils/language';
import { changePassword } from '../../../api/userServices';
import { ShowError, ShowSuccess } from '../../Alerts';

export const ChangePasswordButton = (props) => {
  const { id } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // const [size] = useState(1);
  const [form] = Form.useForm();
  const submitButtonRef = useRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    submitButtonRef.current.click();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const { oldpassword, password } = values;

    const responseData = await changePassword(id, oldpassword, password);
    setConfirmLoading(false);

    const { statusCode, message } = responseData.data;
    if (statusCode === 400) ShowError(message);
    else {
      const operation = getMessage(`USER_MODALCHANGEPASSWORD_TITLE`, null);
      const message = getMessage(`SUCCESS_DESCRIPTION`, operation);

      ShowSuccess(message);
      setIsModalVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <Space>
      <Tooltip title={getMessage(`USER_BUTTONCHANGEPASSWORD`, null)}>
        <Button onClick={showModal} icon={<LockOutlined />} />
      </Tooltip>
      <Modal
        title={getMessage(`USER_MODALCHANGEPASSWORD_TITLE`, null)}
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={getMessage('USER_LABEL_OLDPASSWORD', null)}
            name="oldpassword"
            rules={[{ required: true, message: getMessage('USER_ERROR_OLDPASSWORD_EMPTY', null) }]}
          >
            <Input.Password />
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
          <Form.Item>
            <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};
