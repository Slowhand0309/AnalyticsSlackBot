'use strict';
require('dotenv').config();

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-ect');

  grunt.initConfig({
   // Task for execute.
   exec: {
      init: {
         command: 'node_modules/node-google-apps-script/bin/gapps init ' + process.env.GAS_PROJECT_KEY
      },
      upload: {
         command: 'node_modules/node-google-apps-script/bin/gapps upload'
      },
      echo: {
         command: 'echo ' + process.env.GAS_PROJECT_KEY
      }
   },

   // Task for ect.
   ect: {
     render: {
       files: {
         'src/main.js' : ['template/main.js.ect']
       },
       variables: {
         // Google analytics profile id.
         profileId: process.env.ANALYTICS_PROFILEID,
         // User name.
         userName: process.env.USER_NAME,
         // Post Avatar icon url on slack.
         iconUrl: process.env.ICON_URL,
         // Post slack url.
         slackUrl: process.env.SLACK_URL
       }
     }
   }
  });

  grunt.registerTask('default', ['ect']);
  grunt.registerTask('init', ['exec:init']);
  grunt.registerTask('upload', ['exec:upload']);
};
