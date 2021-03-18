import React, { useState, useEffect } from 'react';

import { Modal, Button, Checkbox, Tooltip, Space, List } from 'antd';
import { PicLeftOutlined } from '@ant-design/icons';

import { getMessage } from '../../../utils/language';
import { getDate } from '../../../utils/date';
import { ShowError, ShowSuccess } from '../../../components';

import { getLists } from '../../../api/listServices';
import { approveList, dissaproveList } from '../../../api/userServices';

import './styles.scss';

export const RelationModal = (props) => {
  const { record } = props;

  const [isModalVisible, setIsModalVisible] = useState();
  const [lists, setLists] = useState([]); //? todos las listas
  const [checkeds, setCheckeds] = useState([]);

  useEffect(() => {
    const getAllLists = async () => {
      const responseData = await getLists();

      const { statusCode, response, message } = responseData.data;
      if (statusCode === 400) ShowError(`${getMessage('LIST_ERROR_LOADING', null)} - ${message}`);
      else {
        if (response) {
          const allLists = response;

          const lists = allLists.map((p) => {
            const pList = {
              key: p._id,
              ...p,
              createdAt: getDate(p.createdAt)
            };
            return pList;
          });

          const checkeds = record.lists ? record.lists.map((p) => p._id) : [];
          setCheckeds(checkeds);
          setLists(lists);
        }
      }
    };

    getAllLists();
  }, [record.lists]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    lists.map((p) => {
      const isChecked = checkeds.find((q) => q === p.key);
      if (p.name !== 'default') {
        return isChecked ? approveList(record._id, p.key) : dissaproveList(record._id, p.key);
      }
      return null;
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
    const list = item.list;

    return (
      <List.Item key={list._id}>
        <Checkbox
          name={list._id}
          defaultChecked={item.checked}
          onChange={handleCheckBoxChange}
          disabled={list._id === 1}
        ></Checkbox>
        <div className="align-to-list">{list.name}</div>
      </List.Item>
    );
  };

  const getListItems = () => {
    const selectedLists = record.lists || [];

    if (lists.length > 0) {
      const items = lists.map((p) => {
        const checked = selectedLists.find((q) => q._id === p._id);
        const file = {
          checked: checked,
          list: p
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
      <Tooltip title={getMessage(`BUTTONLISTS`, null)}>
        {/* <Button onClick={showModal} icon={<PicLeftOutlined />}>{`${record.videos.length || 0}`}</Button> */}
        <Button onClick={showModal} icon={<PicLeftOutlined />} />
      </Tooltip>
      <Modal
        width={600}
        title={getMessage('BUTTONLISTS', null)}
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
