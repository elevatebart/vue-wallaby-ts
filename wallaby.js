const wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./build/webpack.test.conf')

module.exports = function (wallaby) {
  webpackConfig.resolve.alias = {'@': require('path').join(wallaby.projectCacheDir, 'src'), 'vue$': 'vue/dist/vue.esm.js'}
  webpackConfig.module.rules = webpackConfig.module.rules.filter(r => !'.ts'.match(r.test) && !'.js'.match(r.test));
  webpackConfig.module.rules.find(r => r.loader === 'vue-loader').options.loaders.js = '';

  const wallabyPostprocessor = wallabyWebpack(webpackConfig)

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'src/**/*.*', load: false},
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.ts': wallaby.compilers.typeScript({module: 'CommonJs', target: 'ES5'})
    },

    preprocessors: {
      '**/*.vue': f => f.content.replace('lang="ts"', '').replace('.ts', '.js')
    },

    tests: [
      {pattern: 'test/unit/**/*.spec.ts', load: false},
    ],

    postprocessor: wallabyPostprocessor,
    testFramework: 'mocha',
    setup: function () {
      window.__moduleBundler.loadTests()
      window.expect = chai.expect
      window.sinon = sinon
      var should = chai.should()
    },
    debug: true
  }
}
