import React, { useEffect, useState } from 'react';

import { Button, Drawer, Collapse, List } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

import { ShowError, VideoList, PlayerResponsive } from '../../components';

import { getMessage } from '../../utils/language';
import { getUser } from '../../common/storage';

import { getLists } from '../../api/listServices';
import { getUserById } from '../../api/userServices';
import { url } from '../../api/videoServices';

import './styles.scss';

const { Panel } = Collapse;

export const Main = () => {
  const currentUser = getUser();

  const [visible, setVisible] = useState(false);

  const [lists, setLists] = useState([]);
  const [user, setUser] = useState();

  const [selectedVideo, setSelectedVideo] = useState();

  const height = (window.innerHeight * 80) / 100;

  // const getUserData = async () => {
  //   const responseUserData = await getUserById(currentUser.id);

  //   const { statusCode, response, message } = responseUserData.data;
  //   if (statusCode === 400) ShowError(`${getMessage('USER_ERROR_LOADING', null)} - ${message}`);
  //   else {
  //     if (response) setUser(response);
  //   }
  // };

  useEffect(() => {
    const getListData = async () => {
      const responseListData = await getLists();

      const { statusCode, response, message } = responseListData.data;
      if (statusCode === 400) ShowError(`${getMessage('LIST_ERROR_LOADING', null)} - ${message}`);
      else {
        if (response) {
          setLists(response);
        }
      }
    };

    getListData();
  });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
        <div className="align-to-list">
          <VideoList file={upload} eventToResponse={null} selectedVideoToResponse={setSelectedVideo} />
        </div>
      </List.Item>
    );
  };

  const getPanelsItems = (list) => {
    const videos = list.videos || [];

    if (videos.length > 0) {
      const items = videos.map((p) => {
        const file = {
          video: p
        };
        const item = getListItem(file);
        return item;
      });
      return (
        <Panel header={list.name} key={list._id}>
          <List>{items}</List>
        </Panel>
      );
    }
  };

  const getVideoLists = () => {
    const admin = currentUser ? currentUser.admin : false;
    if (!admin) setLists(user.lists);

    const panels = [];
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const panel = getPanelsItems(list);
      panels.push(panel);
    }

    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        {panels}
      </Collapse>
    );
  };

  return (
    <div className="cnt-general">
      <div className="cnt-buttons">
        <Button type="primary" icon={<UnorderedListOutlined />} onClick={showDrawer}>
          {getMessage('LABEL_LISTS', null)}
        </Button>
        <Drawer title={getMessage('LABEL_LISTS', null)} placement="right" onClick={onClose} onClose={onClose} visible={visible}>
          {getVideoLists()}
        </Drawer>
      </div>
      <div className="cnt-content">
        {selectedVideo ? <PlayerResponsive videoUrl={selectedVideo.urlVideo} height={height} /> : <PlayerResponsive />}
      </div>
    </div>
  );
};
