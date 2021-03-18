import React from 'react';

import { Table } from 'antd';

export const ViewGrid = (props) => {
  const { dataSource, columns } = props;

  return <Table dataSource={dataSource} columns={columns} />;
};
