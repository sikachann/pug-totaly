const webpack = require('webpack');
const path = require('path');
const globule = require('globule');
const ENV = 'production';
const dir = {
  src: path.join(__dirname, 'app/src'),
  public: path.join(__dirname, 'app/dist')
};
const convertExtensions = {
  js: 'js'
};
const mode = ENV;
const entry = {
  js: {}
};

Object.keys(convertExtensions).forEach(from => {
  const to = convertExtensions[from];
  globule.find([`**/*.${from}`, `!**/_*.${from}`], { cwd: dir['src'] }).forEach(filename => {
    let _output = filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`);
    let _source = path.join(dir['src'], filename);
    if (_output.indexOf('js/') !== -1) {
      _output = _output.replace('js/', 'js/');
      entry['js'][_output] = _source;
    }
  });
});

const config = {
  mode: mode,
  entry: entry['js'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: dir['public']
  },
  plugins: [
    //new HtmlWebpackPlugin({ inject: true, inlineSource: '.(js)$' }),
    //new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
  resolve: {
    extensions: ['.js'],
  },
  performance: {
    maxEntrypointSize: 1457521,
    maxAssetSize: 1457521
  }
};

module.exports = [config];
