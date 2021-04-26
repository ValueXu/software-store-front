import { Table } from "antd";
import React, { Component } from "react";

import "./DownloadRecords.less";

const result = {
  list: [
    {
      id: "01",
      software_id: "01",
      name: "GTA V",
      time: `${new Date()}`,
    },
    {
      id: "02",
      software_id: "01",
      name: "GTA V",
      time: `${new Date()}`,
    },
    {
      id: "03",
      software_id: "02",
      name: "二号软件",
      time: `${new Date()}`,
    },
    {
      id: "04",
      software_id: "02",
      name: "二号软件",
      time: `${new Date()}`,
    },
  ],
};
export default class DownloadRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: [],
    };
  }

  columns = [
    // {
    //   title: "编号",
    //   dataindex: "id",
    //   key: "id",
    // },
    {
      title: "软件名称",
      dataindex: "name",
      key: "name",
      render: (name) => {
        return <span>{name}</span>;
      },
    },
    {
      title: "下载时间",
      dataindex: "time",
      key: "time",
    },
  ];

  componentDidMount() {
    let datasource = result.list.map((item, index) => {
      return { ...item, key: index };
    });
    this.setState({
      datasource,
    });
  }
  render() {
    return (
      <div className="download-records">
        <Table
          className="download-records-table"
          columns={this.columns}
          dataSource={this.state.datasource}
        />
      </div>
    );
  }
}
