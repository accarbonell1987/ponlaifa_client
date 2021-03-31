import React, { useRef, useState } from 'react';

import { Upload, Modal, Form, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getMessage } from '../../../utils/language';
import { getDate } from '../../../utils/date';

import { addVideo } from '../../../api/videoServices';
import { ShowError, ShowSuccess } from '../../../components';

export const AddModal = (props) => {
  const [isModalVisible, setIsModalVisible] = props.modalState;
  const submitButtonRef = useRef();
  const [fileList, setFileList] = useState([]);

  const handleOk = () => {
    submitButtonRef.current.click();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = async () => {
    let formData = new FormData();
    formData.append('file', fileList[0].originFileObj);

    // const name = fileList[0].originFileObj.name;
    const video = formData;

    const responseData = await addVideo(video);
    const { statusCode, response, message } = responseData.data;

    if (statusCode === 400) ShowError(message);
    else {
      const [data, setData] = props.useStateData;

      const pVideo = {
        key: response._id,
        ...response,
        createdAt: getDate(response.createdAt)
      };
      setData([...data, pVideo]);

      ShowSuccess(getMessage('USER_CONFIRMATIONADDED', null));
      setIsModalVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  const uploadProps = {
    // onChange({ file, fileList }) {
    //   if (file.status !== 'uploading') {
    //     console.log(file, fileList);
    //   }
    // }
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
        <Form.Item>
          <Upload
            {...uploadProps}
            onChange={handleUploadChange}
            fileList={fileList}
            beforeUpload={() => false}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>{getMessage('VIDEO_UPLOAD', null)}</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
