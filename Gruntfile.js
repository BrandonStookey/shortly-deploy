module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      js: {
        // src: ['public/lib/jquery.js', 'public/lib/underscore.js','public/lib/backbone.js','public/lib/handlebars.js', 'public/client/*.js'],
        src: 'public/client/*.js',
        dest: 'public/dist/built.js'
      },
      css: {
        src: ['public/style.css'],
        dest: 'public/dist/built.css'
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {
      js: {
        files:{
          'public/dist/built.min.js': ['public/dist/built.js']
        }
      }
    },

    jshint: {
      files:[
        'public/lib/jquery.js', 'public/lib/underscore.js','public/lib/backbone.js','public/lib/handlebars.js', 'public/client/*.js'
      ],
      options: {
        force: 'false',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      dist:{
        files:{
          'public/dist/style.min.css': 'public/style.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');  /////we need to css min!!////////////////////
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    console.log("PORT: ", target);
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    // jshint
    //if(!true){
      //console.log(error!)
      //break;
      //}
    // concat
    'concat',
    // uglify

    ////////add css min///////
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      console.log("Pushing to production!"),
      'shell'
      // add your production server task here
      // upload to heroku
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    //test
    // build
    // test
    'build',
      // if fail
        // log error & break
    // push to target location
    'upload'
  ]);


};
