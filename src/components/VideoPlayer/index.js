import React, { Component } from 'react';
import VPlayer from './vplayer.min.js';

import styles from './index.less';
// 配置项，暴露方法即可,


export default class Vplayer extends Component {
  static protecterOps = {
    linkProtecterQuery: 'http://training.test.ximalaya.com/co-pcs/play/lesson/video/{lessonId}',
    linkProtecterCDN: '',
    isBackend: true,
    accountInfo: {},
  }
  static handleEvents = ['pause', 'getState', 'controls', 'isFullscreen', 'currentTime', 'playbackRate', 'poster', 'currentSrc', 'getDuration', 'getRemainingTime', 'getBufferedInfo'];
  constructor(props) {
    super(props);
    this.state = {};
    this.xmVplayer = null;
    this.options = {
      controls: props.controls || true,
      loop: props.loop || false,
      inactivityTimeout: props.inactivityTimeout || true,
    };
    this.player = null;
  }
  componentDidMount = () => {
    this.initVplayer();
  }

  initVplayer = () => {
    const self = this;
    const { playOps: { lessonId, userId, url }, protecterOps, getPlayer } = this.props;
    const player = new VPlayer({
      el: this.xmVplayer,
      autoplay: false,
      plugins: {
        // 防盗链参数配置
        linkProtecter: {
          linkProtecterQuery: 'http://training.test.ximalaya.com/co-pcs/play/lesson/video/{lessonId}'.replace('{lessonId}', lessonId),
          linkProtecterCDN: '',
          isBackend: true,
          accountInfo: {
            uid: userId, // 用户uid
          },
          ...protecterOps,
        },
      },
    }, ...self.options);
    player.play({
      id: lessonId,
      businessType: 134, // 业务类型 可选
      // src: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/master.m3u8',
      src: url,
    });
    getPlayer && getPlayer(player);
  }

  render() {
    const { width } = this.props.options;
    return (
      <div id="xm-vplayer" style={{ width }} className={styles.xmVplayer}>
        <video ref={(mol) => { this.xmVplayer = mol; }} />
      </div>
    );
  }
}

