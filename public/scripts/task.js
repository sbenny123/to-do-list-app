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
       let content = "";

       tasksViewDiv.html("");

       if (data && data.length > 0) {
           for (var i = 0; i < data.length; i++) {
               content += 
               `<div class="list-group-item container">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <label>`;
                         
                if (data[i].completed) {
                    content +=`<input type="checkbox" class="checked" checked onclick="toggleCheckbox('${data[i]._id}', '${data[i].list_id}', 'false')">`;
                } else {
                    content += `<input type="checkbox" onclick="toggleCheckbox('${data[i]._id}', '${data[i].list_id}', 'true')">`;
                }
                                    
                content += 
                `<span class="list-group-item-text">                              
                    ${data[i].name}                                
                </span>
            </label>
        </div>
        <div class="col-6 col-md-4 btn-right">
            <button type="button" class="btn btn-primary" id="btn_delete" onclick="deleteTask('${data[i]._id}', '${data[i].list_id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    </div>
</div>`;

            }
            
        } else {
            content +=
            `<div class="empty-state text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                </svg>
                <div>
                    <p class="empty-state-heading">Looks like you don't have any tasks</p>
                    <p class="empty-state-description">Add a task using the input box above</p>
                </div>
            </div>`;

           }

           tasksViewDiv.append(content);
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


function editTask(taskId, listId, taskName) {
    let data = {
        taskId: taskId,
        listId: listId,
        taskName: taskName
    };

    socket.emit('edit task', data);
}


// Emit delete task call to delete the task and re-update the view without refreshing
function deleteTask(taskId, listId) {
    let data = {
        taskId: taskId,
        listId: listId
    };

    socket.emit('delete task', data);
}


