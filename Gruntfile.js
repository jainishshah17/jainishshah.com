/**
 * Created by jainishshah on 8/23/15.
 */
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-ssh');
    grunt.initConfig({
        shell: {
            build_war: {
                command: [
                    'jar -cvf jainishshah.war *',
                ].join('&&')
            },
            build_docker: {
                command: [
                    'docker build --tag="jainishshah17/jainishshah.com" .',
                    'docker push jainishshah17/jainishshah.com'
                ].join('&&'),
                options: {
                    execOptions: {
                        maxBuffer: Infinity
                    }
                }
            }
        },
        secret: grunt.file.readJSON(grunt.option("config")+'.json'),
        sshconfig: {
            dev: {
                host: '<%= secret.host %>',
                username: '<%= secret.username %>',
                password: '<%= secret.password %>',
                port: '<%= secret.port %>',
                privateKey: '<%= grunt.file.read(secret.privateKey) %>',
                passphrase: '<%= secret.passphrase %>'
            }
        },
        sshexec: {
            run_xray: {
                command: [
                    'echo <%= secret.password %> | sudo -S whoami',
                    'sudo docker pull jainishshah17/jainishshah.com',
                    'sudo docker run -d -p 80:8080 --name="jainish" jainishshah17/jainishshah.com'
                ].join('&&')
            }
        }
    });
    grunt.registerTask('build', ['shell:build_docker']);
    grunt.registerTask('default', ['shell']);
    grunt.registerTask('deploy',['sshexec']);
}
