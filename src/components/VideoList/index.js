import React, { useState } from 'react';
import { Upload, Modal } from 'antd';

import { url, deleteVideo } from '../../api/videoServices';
import { getMessage } from '../../utils/language';

import { ShowError } from '../Alerts';

import { PlayerResponsive } from '../../components';

import './styles.scss';

export const VideoList = (props) => {
  const { file, eventToResponse, selectedVideoToResponse } = props;
  const name = 'VIDEO';

  const isComingFromMain = selectedVideoToResponse !== null;

  const width = (window.innerWidth * 60) / 100;
  // const heigth = (window.innerHeight * 80) / 100;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [video, setVideo] = useState();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const handlePreview = async (file) => {
    const urlVideo = `${url}/video/${file.name}`;
    const videoFile = { ...file, urlVideo: urlVideo };
    if (!isComingFromMain) {
      setVideo(videoFile);
      setIsModalVisible(true);
    } else {
      selectedVideoToResponse(videoFile);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkDelete = async () => {
    const responseData = await deleteVideo(deleteId);

    const { statusCode, response, message } = responseData.data;
    if (statusCode === 400) ShowError(message);
    else {
      const [data, setData] = eventToResponse;

      const newData = await Promise.all(data.filter((p) => p.key !== response._id));

      setData(newData);
      setDeleteModalVisible(false);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };
  const deleteVideoModal = (file) => {
    setDeleteId(file.uid);
    setDeleteModalVisible(true);
  };

  return (
    <div className="upload-list-inline">
      <Upload listType="picture" fileList={[file]} onPreview={handlePreview} onRemove={deleteVideoModal} />

      <Modal
        destroyOnClose={true}
        visible={isModalVisible}
        title={video ? `Video: ${video.name}` : `Empty`}
        footer={null}
        onCancel={handleCancel}
        centered
        width={width}
      >
        {video ? <PlayerResponsive videoUrl={video.urlVideo} /> : <PlayerResponsive />}
      </Modal>

      <Modal
        width={800}
        title={getMessage(`${name}_MODALDELETE_TITLE`, null)}
        visible={isDeleteModalVisible}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        centered
      >
        {getMessage(`${name}_QUESTIONDELETE`, null)}
      </Modal>
    </div>
  );
};
