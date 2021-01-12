const socket = io();

$(function(){
    /**
     * Creation of task and getting new view using socket.io
     */
    var createForm = $('#form_task');

    createForm.submit(function(e) {
        var taskName = $('#input_name');
        var listId = $('#hidden_list_id');

        var taskData = {               
            name: taskName.val(),              
            list_id: listId.val()
        };

        e.preventDefault(); // prevents page reloading

        socket.emit('create task', taskData);

        taskName.val("");
   });


   // Make call back to server to get the tasks
   socket.on('get tasks', function(id) {
       socket.emit('get tasks', id);
   });


   // Update the html after retrieving data from controller functions
   socket.on('show tasks', function(data) {
       let tasksViewDiv = $('#tasks');

       tasksViewDiv.html("");

       if (data.length > 0) {
           for (var i = 0; i < data.length; i++) {
               let content = 
               `<div class="list-group-item container">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <label>`;
                         
                if (data[i].completed) {
                    content +=`<input type="checkbox" checked onclick="toggleCheckbox('${data[i]._id}', '${data[i].list_id}', 'false')">`;
                } else {
                    content += `<input type="checkbox" onclick="toggleCheckbox('${data[i]._id}', '${data[i].list_id}', 'true')">`;
                }
                                    
                content += 
                `<span class="list-group-item-text">
                    <i class="fa fa-fw"></i>                              
                    ${data[i].name}                                
                </span>
            </label>
        </div>
        <div class="dropdown col-6 col-md-4">
            <button type="button" class="btn btn-secondary" id="btn_more_actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
            </button>
            <div class="dropdown-menu" aria-labelledby="btn_more_actions">
                <button type="button" class="dropdown-item" id="btn_edit" onclick="editTask('${data[i]._id}')">Edit item</button>
                <button type="button" class="dropdown-item" id="btn_delete" onclick="deleteTask('${data[i]._id}', '${data[i].list_id}')">Delete item</button>
            </div>
        </div>
    </div>
</div>`;

                tasksViewDiv.append(content);

           }
       }
    });
});


function showEdit() {
}


// Update task to be completed - doesn't delete task but marks as "completed"
function toggleCheckbox(taskId, listId, isCompleted) {
    let data = {
        taskId: taskId,
        listId: listId,
        completed: isCompleted
    };

    socket.emit('update task', data);
}


function editTask(listId, userId) {
    let data = {
    };

    socket.emit('edit task', id);
}


// Emit delete task call to delete the task and re-update the view without refreshing
function deleteTask(taskId, listId) {
    let data = {
        taskId: taskId,
        listId: listId
    };

    socket.emit('delete task', data);
}


