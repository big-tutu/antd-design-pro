import React from 'react';
import { DragDropContext } from 'react-dnd';
import {
  Card,
  Radio,
} from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardItem from './Card';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const update = require('immutability-helper');

const RadioGroup = Radio.Group;


@DragDropContext(HTML5Backend)
export default class DragDemo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    value: 1,
    cards: [
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ],
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }


  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dargCard = cards[dragIndex];
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dargCard]],
        },
      })
    );
  }
  render() {
    const { cards } = this.state;
    return (
      <PageHeaderLayout title="简单拖拽排序">
        <Card>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>整体拖拽</Radio>
            <Radio value={2}>独立的拖拽按钮</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </RadioGroup>
          <div style={{ width: 400, marginTop: 30 }}>
            {
              cards.map((card, i) => (
                <CardItem
                  index={i}
                  key={card.id}
                  text={card.text}
                  id={card.id}
                  moveCard={this.moveCard}
                  type={this.state.value}
                />
              ))
            }
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

