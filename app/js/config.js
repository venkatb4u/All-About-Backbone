// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
 
  paths: {
    jquery: '../../vendor/jquery/jquery-1.10.0.min',
    templates: '../templates',
    underscore: '../../vendor/templateLibs/underscore',
    handlebars: '../../vendor/templateLibs/handlebars',
    backbone: '../../vendor/backboneLibs/backbone',
    backboneLocalstorage: '../../vendor/backboneLibs/backbone.localStorage',
    text: '../../vendor/requireLibs/text',
    common: 'modules/common'
  },
   shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    backboneLocalstorage: {
      deps: ['backbone'],
      exports: 'Store'
    }
  }
});
