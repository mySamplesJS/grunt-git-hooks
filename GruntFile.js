module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
        githooks: {
            all: {
                options: {
                    template: 'hooks/pre-commit.js'
                },
                'pre-commit': 'eslint'
            }
        },
        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: ["assets/js/*.js"]
        }
	});
}
