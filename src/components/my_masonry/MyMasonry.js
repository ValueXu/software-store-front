import { Rate, Tooltip } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  AutoSizer,
  Masonry,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
} from "react-virtualized";

import ImageMeasurer from "react-virtualized-image-measurer";
import { download } from "../../ajax/myAxios";

import "./MyMasonry.less";

class MyMasonry extends Component {
  state = {
    columnWidth: 200,
    // 列之间的间隔
    gutterSize: 10,

    overscanByPixels: 0,
  };

  //   默认单元的宽高（宽度一定，高度不固定）
  cache = new CellMeasurerCache({
    defaultHeight: 500,
    defaultWidth: 200,
    fixedWidth: true,
  });

  //  width初始化在renderMasonry中
  width = 0;
  //   columnCount初始化在calculateColumnCount中
  columnCount = 0;

  //   获取瀑布流的数据域，提供给容器大小改变后的回调函数使用
  setMasonryRef = (ref) => {
    //   ref来源于Masonry组件
    this.masonryRef = ref;
  };

  //   计算列的数量
  calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;
    this.columnCount = Math.floor(this.width / (columnWidth + gutterSize));
  };

  //   初始化瀑布流单元的定位
  initCellPositioner = () => {
    if (this.cellPositioner === undefined) {
      const { columnWidth, gutterSize } = this.state;
      this.cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: this.columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  };

  //   渲染瀑布流
  renderMasonry = ({ height, width }) => {
    this.width = width;
    this.calculateColumnCount();
    this.initCellPositioner();
    const { overscanByPixels, windowScrollerEnabled } = this.state;
    let list = this.props.list;
    return (
      <ImageMeasurer
        items={list}
        image={(item) => item.imgUrl}
        defaultHeight={500}
        defaultWidth={200}
      >
        {({ itemsWithSizes }) => {
          //   渲染单元的函数
          const cellRender = ({ index, key, parent, style }) => {
            const { item, size } = itemsWithSizes[index];
            const { columnWidth } = this.state;
            const height = columnWidth * (size.height / size.width);
            const onDownload = (e) => {
              // e.preventDefault();
              const username = this.props.userInfo.username;
              download(item.downloadUrl, item.id, username);
            };
            return (
              <CellMeasurer
                cache={this.cache}
                index={index}
                key={key}
                parent={parent}
              >
                <div
                  className="masonry-cell"
                  style={{
                    ...style,
                  }}
                >
                  <img
                    className="cell-img"
                    src={item.imgUrl}
                    alt={item.name}
                    style={{
                      height,
                    }}
                  />
                  <div className="cell-item">
                    软件名：
                    {item.name.length > 10 ? (
                      <Tooltip title={item.name}>
                        {item.name.slice(0, 10) + "......"}
                      </Tooltip>
                    ) : (
                      item.name
                    )}
                  </div>
                  <div className="cell-item">
                    评分：
                    <Rate onChange={() => {}} value={item.score} />
                  </div>
                  <div className="cell-item">
                    描述：
                    {item.description.length > 10
                      ? item.description.slice(0, 10) + "......"
                      : item.description}
                  </div>

                  <div className="cell-item">
                    <Link
                      to={"/detail/" + item.id}
                      style={{ marginRight: "1rem" }}
                    >
                      查看详情
                    </Link>
                    <Link to={"/recommend/" + item.id} onClick={onDownload}>
                      立即下载
                    </Link>
                    {/* <a
                      href={item.downloadUrl}
                      rel="noreferrer"
                      target="_blank"
                      onClick={onDownload}
                    >
                      立即下载
                    </a> */}
                  </div>
                </div>
              </CellMeasurer>
            );
          };
          return (
            <Masonry
              className="masonry"
              ref={this.setMasonryRef}
              autoHeight={windowScrollerEnabled}
              cellCount={itemsWithSizes.length}
              cellMeasurerCache={this.cache}
              cellPositioner={this.cellPositioner}
              cellRenderer={cellRender}
              height={height}
              overscanByPixels={overscanByPixels}
              scrollTop={this.scrollTop}
              width={width}
            />
          );
        }}
      </ImageMeasurer>
    );
  };

  //   瀑布流的容器大小改变时的操作
  onResize = ({ width }) => {
    this.width = width;
    this.calculateColumnCount();
    this.resetCellPositioner();
    if (this.masonryRef) {
      this.masonryRef.recomputeCellPositions();
    }
  };

  // 重置单元的定位
  resetCellPositioner = () => {
    const { columnWidth, gutterSize } = this.state;
    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  };

  render() {
    const { overscanByPixels } = this.state;
    return (
      <div className="my-masonry">
        <AutoSizer
          className="autosizer"
          onResize={this.onResize}
          overscanByPixels={overscanByPixels}
        >
          {({ height, width }) => this.renderMasonry({ width, height })}
        </AutoSizer>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return { userInfo: state.signChangeReducer.userInfo };
};

export default connect(stateToProps)(MyMasonry);
