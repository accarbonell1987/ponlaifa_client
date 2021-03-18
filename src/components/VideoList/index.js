import React, { useState } from 'react';
import { Upload, Modal } from 'antd';

import { url, deleteVideo } from '../../api/videoServices';

import { PlayerResponsive, DeleteButton } from '../../components';

import './styles.scss';

export const VideoList = (props) => {
  const { file, eventToResponse, selectedVideoToResponse } = props;

  const isComingFromMain = selectedVideoToResponse !== null;

  const width = (window.innerWidth * 60) / 100;
  // const heigth = (window.innerHeight * 80) / 100;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [video, setVideo] = useState();

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

  const handleChange = async () => {
    if (eventToResponse !== null) {
      const [data, setData] = eventToResponse;
      return <DeleteButton id={file.uid} eventToExecute={deleteVideo} name={'VIDEO'} eventToResponse={[data, setData]} />;
    }
  };

  return (
    <div className="upload-list-inline">
      <Upload listType="picture" fileList={[file]} onPreview={handlePreview} onChange={handleChange}></Upload>

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
    </div>
  );
};
