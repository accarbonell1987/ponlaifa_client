import React, { useRef, useState } from 'react';

import { Upload, Modal, Form, Button, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getMessage } from '../../../utils/language';
import { getDate } from '../../../utils/date';

// import { addVideo } from '../../../api/videoServices';
import { ShowError, ShowSuccess } from '../../../components';

import axios from 'axios';

export const AddModal = (props) => {
  const [isModalVisible, setIsModalVisible] = props.modalState;
  const submitButtonRef = useRef();
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);

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

    const video = formData;

    const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const endpoint = `${url}/video/add`;

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);

        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
      }
    };

    const responseData = await axios.post(endpoint, video, config);
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

      ShowSuccess(getMessage('VIDEO_CONFIRMATIONADDED', null));
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
      title={getMessage('VIDEO_MODALADD_TITLE', null)}
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
          {progress > 0 ? <Progress percent={progress} /> : null}
        </Form.Item>
        <Form.Item>
          <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
