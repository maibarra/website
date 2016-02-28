/*
 * Project configuration
 * =====================
 */

'use strict';

var ROOT = './';

// Where this project source code lives.
var SRC = 'src';

// Where final distribution files will be copied.
var DIST = 'dist';

// Where compiled scripts will be placed.
var BUILD = 'build';

// Where static assets (textures, fonts, sprites, sounds etc.) live.
var STATIC = 'static';

// Which Phaser build was selected to develop the game.
//var PHASER = 'node_modules/phaser/build/custom/phaser-arcade-physics.js';
//var PHASESLIDE = 'node_modules/phaseslider/phase-slide.js';

module.exports = {

  // Build output directories.
  dirs: {
    build: BUILD,
    dist: DIST,
    root: ROOT,
    src: SRC
  },

  // File paths and glob patterns.
  files: {
    jade: SRC + '/index.jade',

    // Finds the stylus to be compiled to css.
    stylus: SRC + '/styles/main.styl',

    // Finds this project static assets to be copied for distribution.
    assets: STATIC + '/**',

    // Finds the scripts to be compiled.
    scripts: SRC + '/**/*.js',

    // The Scripts.
    components: [
      'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ],

    vendors: [
      //'bower_components/zepto/zepto.min.js',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/history.js/scripts/bundled/html5/native.history.js',
      'bower_components/waypoints/lib/noframework.waypoints.min.js'
    ]
  }

};
