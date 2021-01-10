/*var socketApi = require('../../helpers/socketApi.helper');
var socket = io();

(function () {
    $("#form").submit(function(e) {

        console.log("here");
        e.preventDefault(); // prevents page reloading

        socketApi.createTask($("#input-name").val());
        $("#input-name").val("");
    return true;
    });
})();*/



$(function(){
    const socket = io();
    var form = $('#form_task');

    form.submit(function(e) {
        var taskName = $('#input_name');
        var listId = $('#hidden_list_id');

        var taskData = {               
            name: taskName.val(),              
            list_id: listId.val()
        };

        e.preventDefault(); // prevents page reloading

        socket.emit('create task', taskData);

        //socketApi.createTask(taskData); //socket.emit('new task', taskData);

        taskName.val("");
   });

   socket.on('create task', function(data) {
    $.get
    });
});

