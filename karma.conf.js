'use strict';

module.exports = (config) => {
  var cfg = {
    autoWatch: true,

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'tests/**/*_test.js'
    ],

    exclude: [],

    port: 8080,

    reporters: [
      'dots',
      'coverage'
    ],

    preprocessors: {
      'src/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'main/app/',
      moduleName: 'nimbus.includes'
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-ng-html2js-preprocessor'
    ],

    browsers: [
      'Chrome',
      'ChromeCanary'
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browserNoActivityTimeout: 60000,

    singleRun: false,

    colors: true,

    logLevel: config.LOG_INFO
  };

  if (process.env.TRAVIS) {
    cfg.browsers = ['Chrome_travis_ci'];
  }

  config.set(cfg);
};
