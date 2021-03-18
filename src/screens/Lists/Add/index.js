import React, { useRef } from 'react';

import { Modal, Form, Input, Button } from 'antd';

import { getMessage } from '../../../utils/language';
import { getDate } from '../../../utils/date';

import { createList } from '../../../api/listServices';

import { ShowError, ShowSuccess } from '../../../components';

const { TextArea } = Input;

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
    const { name, description } = values;

    const responseData = await createList(name, description);
    const { statusCode, response, message } = responseData.data;

    if (statusCode === 400) ShowError(message);
    else {
      const [data, setData] = props.useStateData;

      const newList = {
        key: response._id,
        ...response,
        createdAt: getDate(response.createdAt)
      };
      setData([...data, newList]);

      ShowSuccess(getMessage('LIST_CONFIRMATIONADDED', null));
      setIsModalVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={getMessage('LIST_MODALADD_TITLE', null)}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ admin: false }}>
        <Form.Item
          label={getMessage('LIST_LABEL_NAME', null)}
          name="name"
          rules={[
            {
              required: true,
              message: getMessage('LIST_ERROR_NAME_MESSAGE', null)
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={getMessage('LIST_LABEL_DESCRIPTION', null)} name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
