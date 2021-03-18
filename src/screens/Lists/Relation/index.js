import React, { useState, useEffect } from 'react';

import { Modal, Button, Checkbox, Tooltip, Space, List } from 'antd';
import { PicLeftOutlined } from '@ant-design/icons';

import { getMessage } from '../../../utils/language';
import { getDate } from '../../../utils/date';
import { ShowError, ShowSuccess, VideoList } from '../../../components';

import { getVideos, updateListVideo } from '../../../api/videoServices';

import { url } from '../../../api/videoServices';

import './styles.scss';

export const RelationModal = (props) => {
  const { record } = props;

  const [isModalVisible, setIsModalVisible] = useState();
  const [videos, setVideos] = useState([]); //? todos los videos
  const [checkeds, setCheckeds] = useState([]);

  useEffect(() => {
    const getAllVideos = async () => {
      const responseData = await getVideos();

      const { statusCode, response, message } = responseData.data;
      if (statusCode === 400) ShowError(`${getMessage('LIST_ERROR_LOADING', null)} - ${message}`);
      else {
        if (response) {
          const unassigned = response.filter((p) => p.list === null);
          const assigned = record.videos || [];

          const allVideos = [...unassigned, ...assigned];

          const videos = allVideos.map((p) => {
            const pVideo = {
              key: p._id,
              ...p,
              createdAt: getDate(p.createdAt)
            };
            return pVideo;
          });

          const checkeds = record.videos ? record.videos.map((p) => p._id) : [];
          setCheckeds(checkeds);
          setVideos(videos);
        }
      }
    };

    getAllVideos();
  }, [record, record.videos]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    videos.map((p) => {
      const isChecked = checkeds.find((q) => q === p.key);
      return isChecked ? updateListVideo(p.key, record._id) : updateListVideo(p.key, null);
    });
    ShowSuccess(`${getMessage(`SUCCESS_DESCRIPTION`, `modificación`)}`);

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckBoxChange = (e) => {
    const checked = e.target.checked;
    const id = e.target.name;

    if (checked) checkeds.push(id);
    else {
      const deleteFromChecked = checkeds.filter((p) => p !== id);
      setCheckeds(deleteFromChecked);
    }
  };

  const getListItem = (item) => {
    const video = item.video;
    const urlPoster = `${url}/video/poster/${video.name}`;

    const upload = {
      uid: video._id,
      name: video.name,
      status: 'done',
      url: urlPoster
    };
    return (
      <List.Item key={video._id}>
        <Checkbox name={video._id} defaultChecked={item.checked} onChange={handleCheckBoxChange}></Checkbox>
        <div className="align-to-list">
          <VideoList file={upload} eventToResponse={null} selectedVideoToResponse={null} />
        </div>
      </List.Item>
    );
  };

  const getListItems = () => {
    const selectedVideos = record.videos || [];

    if (videos.length > 0) {
      const items = videos.map((p) => {
        const checked = selectedVideos.find((q) => q._id === p._id);
        const file = {
          checked: checked,
          video: p
        };
        const item = getListItem(file);
        return item;
      });
      return <List>{items}</List>;
    }
    return <h1>{getMessage(`EMPTY`, null)}</h1>;
  };

  return (
    <Space size={1}>
      <Tooltip title={getMessage(`BUTTONVIDEO`, null)}>
        {/* <Button onClick={showModal} icon={<PicLeftOutlined />}>{`${record.videos.length || 0}`}</Button> */}
        <Button onClick={showModal} icon={<PicLeftOutlined />} />
      </Tooltip>
      <Modal
        width={600}
        title={getMessage('BUTTONVIDEO', null)}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        {getListItems()}
      </Modal>
    </Space>
  );
};
