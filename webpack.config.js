
// 项目根目录下的新建的 webpack.config.js
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';

export default function (config, env) {
  console.log('webpackconfigjs', JSON.stringify(config.plugins));
  console.log('env', env);
  const { plugins } = config;
  const uglifyJsPluginIndex = plugins.findIndex(val => val.constructor.name === 'UglifyJsPlugin');
  if (uglifyJsPluginIndex > -1) {
    plugins.splice(uglifyJsPluginIndex, 1, (new ParallelUglifyPlugin({
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
  }
  const newConfig = {
    ...config,
    plugins,
  };
  // merge or override
  return newConfig;
}
