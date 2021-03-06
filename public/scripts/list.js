const socket = io();

$(function(){
    /**
     * Creation of list and getting new view using socket.io
     */
    var createForm = $('#form_list');

    createForm.submit(function(e) {
        var userId = $('#hidden_user_id');
        var listName = $('#input_name');

        var listData = {  
            user_id: userId.val(),             
            name: listName.val()
        };

        e.preventDefault(); // prevents page reloading

        socket.emit('create list', listData);

        listName.val("");
   });


   // Make call back to server to get the lists
   socket.on('get lists', function(id) {
       socket.emit('get lists', id);
   });


   // Update the html after retrieving data from controller functions
   socket.on('show lists', function(data) {     
    let listsViewDiv = $('#lists');
    let content = "";

    listsViewDiv.html("");

    if (data && data.length > 0) {
       content += 
       `<div class="row">
            <ul class="list-group list-group-flush">`;

           for (var i = 0; i < data.length; i++) {
               content +=
                   `<li class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-10">                           
                                <a class="text-decoration-none" href="/tasks/${data[i].list_id}">${data[i].name}</a>
                            </div>
                            <div class="col-2 btn-right">
                                <button type="button" class="btn btn-primary" id="btn_delete" onclick="deleteList('${data[i].list_id}', '${data[i].user_id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>`;
            }
            
            content += `</ul>`;

        } else {    
            content +=
                `<div class="empty-state text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <div>
                        <p class="empty-state-heading">Looks like you don't have any lists</p>
                        <p class="empty-state-description">Add a list using the input box above</p>
                    </div>
                </div>`;
        }

        listsViewDiv.append(content);
    });
});


function showEdit(data) {
}


function editList(listId, userId, listName) {
    let data = {
        listId: listId,
        userId: userId,
        listName: listName
    };

    socket.emit('edit list', data);
}


// Emit delete list call to delete the list and re-update the view without refreshing
function deleteList(listId, userId) {
    let data = {
        listId: listId,
        userId: userId
    };

    socket.emit('delete list', data);
}


