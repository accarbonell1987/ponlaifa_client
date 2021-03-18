import React, { useEffect, useState } from 'react';
import { Space, Button, Tooltip } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import { getDate } from '../../utils/date';
import { ViewGrid, DeleteButton, ShowError } from '../../components';
import { getMessage } from '../../utils/language';
import { getLists, deleteList } from '../../api/listServices';

import { AddModal } from './Add';
import { RelationModal } from './Relation';

import './styles.scss';

export const Lists = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState([]);

  const columns = [
    {
      title: getMessage('LIST_LABEL_NAME', null),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: getMessage('LIST_LABEL_DESCRIPTION', null),
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: getMessage('LABEL_CREATEDDATE', null),
      dataIndex: 'createdAt',
      key: 'createdAt'
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
          <Tooltip title={getMessage('LIST_BUTTONDELETE', null)}>
            <DeleteButton id={record._id} eventToExecute={deleteList} name={'LIST'} eventToResponse={[data, setData]} />
          </Tooltip>
        </Space>
      )
    }
  ];

  useEffect(() => {
    const getAllLists = async () => {
      const responseData = await getLists();

      const { statusCode, response, message } = responseData.data;
      if (statusCode === 400) ShowError(`${getMessage('LIST_ERROR_LOADING', null)} - ${message}`);
      else {
        if (response) {
          const lists = response.map((p) => {
            const pList = {
              key: p._id,
              ...p,
              createdAt: getDate(p.createdAt)
            };
            return pList;
          });

          setData(lists);
        }
      }
    };

    getAllLists();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="cnt-general">
      <div className="cnt-buttons">
        <Button type="primary" icon={<PlusSquareOutlined />} onClick={showModal}>
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
