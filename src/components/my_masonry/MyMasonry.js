import React, { Component } from "react";
import {
  AutoSizer,
  Masonry,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
} from "react-virtualized";

import ImageMeasurer from "react-virtualized-image-measurer";

import "./MyMasonry.less";

export default class MyMasonry extends Component {
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
                  <div>软件名：{item.name}</div>
                  <div>描述：{item.description}</div>
                  <span>
                    <a
                      href={"/detail/?id=" + item.id}
                      style={{ marginRight: "1rem" }}
                    >
                      查看详情
                    </a>
                    <a href={item.downloadUrl}>立即下载</a>
                  </span>
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
