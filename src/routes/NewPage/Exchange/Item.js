import React from 'react';
import {
  DragSource,
  DropTarget,
} from 'react-dnd';
// import { connect } from 'tls';


const styles = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'move',
};
const itemSource = {
  beginDrag(props) {
    return {
      ...props,
    };
  },
};

const dropTarget = {
  hover(props, monitor) {
    console.log('hover', props);
    const { type } = props;
    const dragItem = monitor.getItem();
    const dragIndex = dragItem.index;
    const hoverIndex = props.index;
    if (hoverIndex === dragIndex) {
      return;
    }
    props.exchangeItem(dragItem, props, type);
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component) {
    console.log('drop', props);
    console.log('drop', monitor);
    console.log('drop', component);
  },
};

@DropTarget('item', dropTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('item', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Item extends React.Component {
  handleClick = (e) => {
    console.log('Click', e);
  }
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      id,
      connectDropTarget,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(<div onClick={this.handleClick} style={{ ...styles, opacity }}>{text}</div>)
      )
    );
  }
}
