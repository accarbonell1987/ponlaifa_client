import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { getDate } from '../../utils/date';

import { PlusOutlined } from '@ant-design/icons';

import { ShowError, VideoList } from '../../components';
import { getMessage } from '../../utils/language';
import { getVideos } from '../../api/videoServices';

import { url } from '../../api/videoServices';

import './styles.scss';

export const Videos = () => {
  const [data, setData] = useState([]);
  const [uploadFiles, setUploadFiles] = useState();

  useEffect(() => {
    const getAllVideos = async () => {
      const responseData = await getVideos();

      const { statusCode, response, message } = responseData.data;
      if (statusCode === 400) ShowError(`${getMessage('VIDEO_ERROR_LOADING', null)} - ${message}`);
      else {
        if (response) {
          const videos = response.map((p) => {
            const pVideo = {
              key: p._id,
              ...p,
              createdAt: getDate(p.createdAt)
            };
            return pVideo;
          });

          const UploadVideos = () => {
            const fileList = [];

            for (let i = 0; i < data.length; i++) {
              const video = data[i];
              const urlPoster = `${url}/video/poster/${video.name}`;
              const upload = {
                uid: video._id,
                name: video.name,
                status: 'done',
                url: urlPoster
              };

              fileList.push(upload);
            }
            return fileList;
          };

          setUploadFiles(UploadVideos);
          setData(videos);
        }
      }
    };

    getAllVideos();
  }, [data]);

  const renderList = () => {
    if (uploadFiles !== undefined && uploadFiles.length > 0) {
      return uploadFiles.map((p) => {
        return <VideoList file={p} eventToResponse={[data, setData]} selectedVideoToResponse={null} />;
      });
    }
  };

  return (
    <div className="cnt-general">
      <div className="cnt-buttons">
        <Button type="primary" icon={<PlusOutlined />}>
          {getMessage('BUTTONADD', null)}
        </Button>
        {/* <AddModal modalState={[isModalVisible, setIsModalVisible]} useStateData={[data, setData]} /> */}
      </div>
      <div className="cnt-content">{renderList()}</div>
    </div>
  );
};
