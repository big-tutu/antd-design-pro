import React from 'react';
import { DragSource } from 'react-dnd';

const styles = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

// 可拖拽资源
const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top }; // 资源所有的属性
  },
};

@DragSource('box', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends React.Component {
  render() {
    const {
      hideSourceOnDrag,
      left,
      top,
      connectDragSource,
      isDragging,
      children,
    } = this.props;
    if (isDragging && hideSourceOnDrag) { // 在拖拽，并且设置了隐藏拖拽资源
      return null;
    }
    return (
      connectDragSource && connectDragSource(
        <div style={{ ...styles, left, top }}>{children}</div>
      )
    );
  }
}
