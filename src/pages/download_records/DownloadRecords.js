import { notification, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ajax } from "../../ajax/myAxios";

import "./DownloadRecords.less";

class DownloadRecords extends Component {
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
    this.requestRecord();
  }
  requestRecord = () => {
    const { userInfo } = this.props;
    const username = userInfo.username;
    const config = {
      method: "GET",
      url: "/record/getAllByUsername",
      params: {
        username,
      },
    };
    let _this = this;
    ajax(config).then((res) => {
      if (res.code === 1) {
        let datasource = res.result.map((item, index) => {
          return { ...item, key: index.toString() };
        });
        _this.setState({
          datasource,
        });
      } else if (!res.msg) {
        notification.error({
          message: "错误",
          description: `${res.msg}`,
        });
      }
    });
  };
  render() {
    return (
      <div className="download-records">
        <Table
          className="download-records-table"
          columns={this.columns}
          dataSource={this.state.datasource}
          style={{ borderWidth: "1px", borderColor: "rgba(0,0,0,0.7)" }}
        />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    userInfo: state.signChangeReducer.userInfo,
  };
};

export default connect(stateToProps)(DownloadRecords);
