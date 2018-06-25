// 打包时间： 1 分 40秒
// 项目启动时间：30 秒
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';

export default function (config, env) {
  console.log('webpackconfigjs', JSON.stringify(config.plugins));
  console.log('env', env);
  const { plugins } = config;
  plugins.splice(3, 1, (new ParallelUglifyPlugin({
    cacheDir: '.cache/',
    uglifyJS: {
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    },
  })));
  // const UglifyJsPluginIndex = plugins.findIndex(item => item.includes('UglifyJsPlugin'));
  // console.log('UglifyJsPluginIndex', UglifyJsPluginIndex);
  const newConfig = {
    ...config,
    plugins,
  };
  // merge or override
  return newConfig;
}
