import React, { Component, PropTypes } from 'react';
// import { findDOMNode } from 'react-dom';
import {
  DragSource,
  DropTarget,
  // ConnectDropTarget,
  // ConnectDragSource,
  // DropTargetMonitor,
  // DropTargetConnector,
  // DragSourceConnector,
  // DragSourceMonitor,
} from 'react-dnd';
import {
  Icon,
} from 'antd';
// import { connect } from 'tls';


const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

// 拖拽资源
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};


// 拖拽目标
const dropTaget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (hoverIndex === dragIndex) {
      return;
    }
    // const hoverBoundingReact = findDOMNode(component).getBoundingClientRect();
    // 获取中间位置
    // const hoverMiddleY = (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2;
    // 声明鼠标位置
    // const clientOffset = monitor.getClientOffset();

    // const hoverClientY = (clientOffset.y - hoverBoundingReact.top) / 2;


    // 下移的时候
    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //   return;
    // }

    // 上移的时候
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return;
    // }
    props.moveCard(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
  // dorp(props, monitor, component) {

  // }
};

@DropTarget('card', dropTaget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(
  'card',
  cardSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  }),
)
export default class CardItem extends React.Component {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      type,
      connectDragPreview,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return (
      type === 1 ?
        connectDragSource &&
        connectDropTarget &&
        connectDragSource(
          connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>)
        ) :
        type === 2 ? (
          connectDragPreview &&
          connectDragSource &&
          connectDropTarget &&
          connectDragPreview( // 预览
            <div style={{ ...style, opacity }}>
              <span>{text}</span>
              {connectDragSource(connectDropTarget( // 绑定拖拽资源和拖拽目标
                <a style={{ float: 'right' }}>拖拽</a>
              ))}
            </div>
          )
        ) :
          type === 3 ? (
            'dddd'
          ) : 'what'
    );
  }
}
