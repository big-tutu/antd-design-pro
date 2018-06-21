import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  DragDropContext,
  DropTarget,
} from 'react-dnd';
import {
  Card,
} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Item from './Item';
import styles from './style.less';

const update = require('immutability-helper');

const dropTarget = {
  drop(props, monitor, component) {
    console.log(component);
  },
};

DropTarget('container', dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
}));
@DragDropContext(HTML5Backend) // 绑定拖拽上下文，即父组件
export default class ExchangeDemo extends React.Component {
  state = {
    leftList: [
      {
        id: 1,
        text: 'React',
        type: 'left',
      },
      {
        id: 2,
        text: 'JavaScript',
        type: 'left',
      },
      {
        id: 3,
        text: 'Vue',
        type: 'left',
      },
      {
        id: 4,
        text: 'React Native',
        type: 'left',
      },
    ],
    rightList: [
      {
        id: 12,
        text: 'React',
        type: 'right',
      },
      {
        id: 5,
        text: 'JavaScript',
        type: 'right',
      },
    ],
  }
  exchangeItem = (drag, hover, type) => {
    console.log('hover', hover);
    const dragIndex = drag.index;
    const hoverIndex = hover.index;
    const { leftList, rightList } = this.state;
    if (type === 'left') {
      // const dargCard = leftList[dragIndex];
      this.setState(
        update(this.state, {
          leftList: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dargCard]],
          },
        })
      );
    } else if (type === 'right') {
      // const dargCard = rightList[dragIndex];
      this.setState(
        update(this.state, {
          rightList: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dargCard]],
          },
        })
      );
    }
  }
  render() {
    const { rightList, leftList } = this.state;
    return (
      <PageHeaderLayout title="左右交换">
        <Card className={styles.dragCard}>
          <div className={styles.leftContainer}>
            <h3>Left</h3>
            <div className={styles.content}>
              {leftList.map((val, index) => (
                <Item
                  id={val.id}
                  index={index}
                  text={val.text}
                  key={val.id}
                  exchangeItem={this.exchangeItem}
                  type={val.type}
                />
              ))}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <h3>Right</h3>
            <div className={styles.content}>
              {rightList.map((val, index) => (
                <Item
                  key={val.id}
                  type={val.type}
                  id={val.id}
                  index={index}
                  text={val.text}
                  exchangeItem={this.exchangeItem}
                />
              ))}
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
