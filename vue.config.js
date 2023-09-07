module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 设置别名，以@代表src目录的绝对路径
        '@': require('path').resolve(__dirname, 'src'),
        // 设置别名，以$static代表static目录的绝对路径
        $static: require('path').resolve(__dirname, 'static'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
    },
  },
};
