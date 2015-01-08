module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({

	watch : {

		less : {
			files : ['app/styles/*.less'],
			tasks : ['css']
		},

		livereload : {
			files : ['app/index.html', '.tmp/styles/css/*.css'],
			options : {
				livereload : true
			}
		},
	},

	less : {
		dev : {
			files : {
				".tmp/styles/css/main.css": "app/styles/main.less"
			},
		},
	},

	autoprefixer : {
		dev : {
			files : {
				".tmp/styles/css/main.css": ".tmp/styles/css/main.css"
			},
		},
	},

	connect : {
		server : {
			options : {
				base : ['app','.tmp'],
				livereload : 35729
			},
		},
	},

	uglify: {
	    my_target: {
	      	files: [{
	          expand: true,
	          cwd: 'app/js',
	          src: ['*.js', '!*.min.js'],
	          dest: 'app/js/min/',
	          ext: '.min.js'
      		}]
	    }
	},

	/*copy: {
		main: {
		    files: [
		      {src: 'app/font/*', dest: 'prod/font/'},

		      {src: 'app/img/*', dest: 'prod/img/'},

		      {src: 'app/js/min/*', dest: 'prod/js/'},

		      {src: 'app/numeros/*', dest: 'prod/numeros/'},

		      {src: 'app/.tmp/styles/css/*', dest: 'prod/css/'},

		      {src: '*.js', dest: 'prod/js/',  filter: 'isFile'},

		    ]
	  	}
	},*/

	cssmin: {
	  target: {
	    files: [{
	      expand: true,
	      cwd: '.tmp/styles/css',
	      src: ['*.css', '!*.min.css'],
	      dest: '.tmp/styles/css/',
	      ext: '.min.css'
	    }]
	  }
	},

	cleanProd: {
		clean : ["prod/"]
	},

	clean : [".tmp/"]

});

// Load the plugin that provides the "less" task.
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-cssmin');


// Default task(s).
grunt.registerTask('default', ['css']);

grunt.registerTask('css', ['less','autoprefixer']);

grunt.registerTask('server', ['clean','css','connect','watch']);

grunt.registerTask('prod', ['uglify','copy']);

grunt.registerTask('cleanProd', ['cleanProd']);

};



// a taper en ligne de cmd pour installer les nouvelles taches
//npm install grunt-contrib-cssmin --save-dev
//npm install grunt-contrib-uglify --save-dev
//npm install grunt-contrib-copy --save-dev
