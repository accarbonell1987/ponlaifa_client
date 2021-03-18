import React from 'react';
import { Popconfirm, message } from 'antd';

export const DeleteConfirm = (props) => {
  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  return (
    <Popconfirm title="Are you sure to delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
      {/* <a href="#">Delete</a> */}
    </Popconfirm>
  );
};
