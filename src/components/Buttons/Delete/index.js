import React, { useState } from 'react';
import { Space, Button, Modal, Tooltip } from 'antd';

import { MinusSquareOutlined } from '@ant-design/icons';

import { getMessage } from '../../../utils/language';
import { ShowError } from '../../Alerts';

import './styles.scss';

export const DeleteButton = (props) => {
  const { id, eventToExecute, name, eventToResponse } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [size] = useState(1);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOkDelete = async () => {
    const deleteMethod = eventToExecute;

    const responseData = await deleteMethod(id);
    const { statusCode, response, message } = responseData.data;
    if (statusCode === 400) ShowError(message);
    else {
      const [data, setData] = eventToResponse;

      const newData = await Promise.all(data.filter((p) => p.key !== response._id));

      setData(newData);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Space size={size}>
      <Tooltip title={getMessage(`BUTTONDELETE`, null)}>
        <Button onClick={showModal} type="primary" danger icon={<MinusSquareOutlined />}></Button>
      </Tooltip>
      <Modal
        width={800}
        title={getMessage(`${name}_MODALDELETE_TITLE`, null)}
        visible={isModalVisible}
        onOk={handleOkDelete}
        onCancel={handleCancel}
        centered
      >
        {getMessage(`${name}_QUESTIONDELETE`, null)}
      </Modal>
    </Space>
  );
};
