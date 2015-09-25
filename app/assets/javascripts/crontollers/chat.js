/**
 * Created by jainishshah on 9/7/15.
 */
'use strict';

angular.module('myApp.chat', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl: 'view/chat.html',
            controller: 'chatCtrl'
        });
    }])

    .controller('chatCtrl', [function($scope,$http,socket) {
        var getNode = function(s){
                return document.querySelector(s);
            },
        //get required nodes
            status = getNode('.chat-status span'),
            messages = getNode('.chat-messages'),
            textarea = getNode('.chat-textarea'),
            chatName = getNode('.chat-name'),
            statusDefault = status.textContent,
            setStatus = function(s){
                status.textContent = s;
                if(s !== statusDefault){
                    var delay = setTimeout(function(){
                        setStatus(statusDefault);
                        clearInterval(delay);
                    },3000);
                }
            };
        try{
             socket = io.connect('http://127.0.0.1:8080');
        }catch (e){
            //set status to warn user
        }
        if(socket !== undefined){
            //listen for output
            socket.on('output',function(data){
                if(data.length){
                    //loop through results
                    for(var x=0; x<data.length; x++){
                        var message = document.createElement('div');
                        message.setAttribute('class', 'chat-message');
                        message.textContent = data[x].name +': ' + data[x].message ;
                        //append
                        messages.appendChild(message);
                        messages.insertBefore(message,messages.firstChild);
                    }
                }
            });
            //listen for status
            socket.on('status', function(data){
                setStatus((typeof data === 'object') ? data.message : data);
                if(data.clear === true){
                    textarea.value = ' ';
                }
            });
            //listen for key down
            textarea.addEventListener('keydown', function(event){
                var self = this;
                name = chatName.value;
                if(event.which === 13 && event.shiftKey === false){
                    socket.emit('input', {
                        name: name,
                        message: self.value
                    });
                    event.preventDefault();
                }
            });
        }


    }]);

