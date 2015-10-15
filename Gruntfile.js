/**
 * Created by jainishshah on 8/23/15.
 */
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.initConfig({
        shell: {
            build_war: {
                command: [
                    'jar -cvf ROOT.war *',
                ].join('&&')
            },
            build_docker: {
                command: [
                    'docker build --tag="jainishshah17/website" .'
                ],
                options: {
                    execOptions: {
                        maxBuffer: Infinity
                    }
                }
            },
            run_xray: {
                command: [
                    'docker push jainishshah17/website',
                    'docker run -d -p 80:8080 --name="jainish" jainishshah17/website'
                ].join('&&')
            }
        }
    });
    grunt.registerTask('build', ['shell:build_docker']);
    grunt.registerTask('default', ['shell']);
}
