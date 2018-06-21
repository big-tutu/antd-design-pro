import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { Card, Checkbox } from 'antd';
import {
  DragTarget,
  DragDropContext,
  ConnectDropTarget,
  DropTargetMonitor,
  XYCoord,
  DropTarget,
} from 'react-dnd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Box from './Box';

const update = require('immutability-helper');

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
};


const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.moveBox(item.id, left, top);
  },
};

@DragDropContext(HTML5Backend) // 绑定拖拽上下文，即父组件
@DropTarget('box', boxTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
      },
      hideSourceOnDrag: false,
    };
  }
  moveBox = (id, left, top) => {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      })
    );
  }
  handlehideSourceOnDrag = () => {
    this.setState({
      hideSourceOnDrag: !this.state.hideSourceOnDrag,
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    const { hideSourceOnDrag } = this.state;
    const { boxes } = this.state;
    return (
      <PageHeaderLayout title="拖拽移动">
        <Card>
          <div style={{ marginBottom: 30 }}>
            <label htmlFor="hideSourceOnDrag">
              <Checkbox
                onChange={this.handlehideSourceOnDrag}
              />
              <small>Hide the source item while dragging</small>
            </label>
          </div>
          {
            connectDropTarget &&
            connectDropTarget(
              <div style={styles}>
                {Object.keys(boxes).map((key) => {
                  const { left, top, title } = boxes[key];
                  return (
                    <Box
                      key={key}
                      id={key}
                      left={left}
                      top={top}
                      hideSourceOnDrag={hideSourceOnDrag}
                    >
                      {title}
                    </Box>
                  );
                })}
              </div>,
            )
          }
        </Card>
      </PageHeaderLayout>
    );
  }
}
