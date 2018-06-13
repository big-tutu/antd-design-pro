import React from 'react';
import Vplayer from '../../components/VideoPlayer';
import {
  Card,
} from 'antd';

const PageOne = () => {
  let vplayer = null;
  const options = { // 播放器配置项
    el: '', // 播放器容器 可选
    autoplay: '',
    controls: '', // 是否显示控制条
    loop: '', // 是否循环播放
    muted: '', // 是否静音
    width: '', // 设置播放器高宽 （width: '100%', height: '300px'）
    fluid: '', // boolean 流程布局
    aspectRatio: '', // 与fluid配合使用，设置播放器宽高比'16:9'
    inactivityTimeout: '', // 自动隐藏控制条时间
    plugins: {}, // 配置插件
  };

  // 视频播放参数项
  const playOps = {
    url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', // 根据是否付费 可选
    userId: '',
    lessonId: '',
    businessType: '',
  };

  // api 接口
  function getPlayer(player) {
    vplayer = player;
    player.on('timeupdate', () => {
      const time = player.currentTime();
      console.log(`当前播放时间：${time}`);
    });
    player.poster('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524545045219&di=fcedd760f14f397f1f90249ad4f7e1f1&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa6efce1b9d16fdfa39541e82b88f8c5494ee7ba6.jpg');
  }
  return (
    <Card title="视频播放器">
      <Vplayer
        options={options}
        playOps={playOps}
        // getPlayer={getPlayer}
      />
    </Card>
  );
};

export default PageOne;
