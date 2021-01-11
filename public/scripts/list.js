const socket = io();

$(function(){
    var createForm = $('#form_list');

    createForm.submit(function(e) {
        var listName = $('#input_name');

        var listData = {               
            name: listName.val()
        };

        e.preventDefault(); // prevents page reloading

        socket.emit('create list', listData);

        listName.val("");
   });

   socket.on('get lists', function(id) {
       socket.emit('get lists', id);
   });

   socket.on('show lists', function(data) {
       console.log(data);

      /* let tasksViewDiv = $('#tasks');

       tasksViewDiv.html("");

       if (data.length > 0) {
           for (var i = 0; i < data.length; i++) {
               tasksViewDiv.append(
                   `<div class="list-group-item container">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <label>
                                    <input type="checkbox">
                                    <span class="list-group-item-text">
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
                </div>`);
           }
       }*/
    });
});

function editTask(id) {
    socket.emit('edit task', id);
}

function deleteTask(id, listId) {
    let data = {
        id: id,
        listId: listId
    };

    socket.emit('delete task', data);
}


