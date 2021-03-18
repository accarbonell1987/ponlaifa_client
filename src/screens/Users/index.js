import React, { useEffect, useState } from 'react';

import { getDate } from '../../utils/date';

import { Space, Button, Tooltip, Switch } from 'antd';

import { ViewGrid, DeleteButton, ChangePasswordButton, ShowError } from '../../components';
import { UsergroupAddOutlined } from '@ant-design/icons';

import { getMessage } from '../../utils/language';
import { getUsers, deleteUser } from '../../api/userServices';

import { AddModal } from './Add';
import { RelationModal } from './Relations';

import './styles.scss';

export const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState([]);

  const columns = [
    {
      title: getMessage('USER_LABEL_USERNAME', null),
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: getMessage('USER_LABEL_EMAIL', null),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: getMessage('LABEL_CREATEDDATE', null),
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: getMessage('USER_LABEL_ISADMIN', null),
      key: 'admin',
      render: (e, record) => (
        <Space size="middle">
          <Switch checked={record.admin} disabled />
          {record.admin ? `Si` : `No`}
        </Space>
      )
    },
    {
      title: getMessage('USER_LABEL_CONFIRMED', null),
      key: 'confirmed',
      render: (e, record) => (
        <Space size="middle">
          <Switch checked={record.confirmed} disabled />
          {record.confirmed ? `Si` : `No`}
        </Space>
      )
    },
    {
      title: getMessage('LABEL_ACTIONS', null),
      key: 'operation',
      width: 100,
      render: (record) => (
        <Space size="small">
          <Tooltip title={getMessage('LIST_BUTTONDELETE', null)}>
            <RelationModal record={record} />
          </Tooltip>
          <Tooltip title={getMessage('USER_BUTTONCHANGEPASSWORD', null)}>
            <ChangePasswordButton id={record._id} />
          </Tooltip>
          <Tooltip title={getMessage('BUTTONDELETE', null)}>
            <DeleteButton id={record._id} eventToExecute={deleteUser} name={'USER'} eventToResponse={[data, setData]} />
          </Tooltip>
        </Space>
      )
    }
  ];

  useEffect(() => {
    const getAllUsers = async () => {
      const responseData = await getUsers();

      const { statusCode, response, message } = responseData.data;
      if (statusCode === 400) ShowError(`${getMessage('USER_ERROR_LOADING', null)} - ${message}`);
      else {
        if (response) {
          const users = response.map((p) => {
            const pUser = {
              key: p._id,
              ...p,
              createdAt: getDate(p.createdAt)
            };
            return pUser;
          });

          setData(users);
        }
      }
    };

    getAllUsers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="cnt-general">
      <div className="cnt-buttons">
        <Button type="primary" icon={<UsergroupAddOutlined />} onClick={showModal}>
          {getMessage('BUTTONADD', null)}
        </Button>
        <AddModal modalState={[isModalVisible, setIsModalVisible]} useStateData={[data, setData]} />
      </div>
      <div className="cnt-content">
        <ViewGrid columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
