import { Table } from "antd";
import moment from "moment";
import React, { Component } from "react";

import "./DownloadRecords.less";

const result = {
  list: [
    {
      id: "01",
      software_id: "01",
      name: "GTA V",
      time: `1619425636567`,
    },
    {
      id: "02",
      software_id: "01",
      name: "GTA V",
      time: `1613425668834`,
    },
    {
      id: "03",
      software_id: "02",
      name: "二号软件",
      time: `1617424673584`,
    },
    {
      id: "04",
      software_id: "02",
      name: "二号软件",
      time: `1614325579584`,
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
    {
      title: "软件名称",
      dataIndex: "name",
      key: "name",
      defaultSorterOrder: "descend",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "下载时间",
      dataIndex: "time",
      key: "time",
      render: (time) => {
        return <div>{moment(parseInt(time)).format("lll")}</div>;
      },
      defaultSorterOrder: "descend",
      sorter: (a, b) => {
        return parseInt(a.time) - parseInt(b.time);
      },
    },
  ];

  componentDidMount() {
    let datasource = result.list.map((item, index) => {
      return { ...item, key: index.toString() };
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
