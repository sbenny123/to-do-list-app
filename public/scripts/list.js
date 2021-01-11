const socket = io();

$(function(){
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

   socket.on('get lists', function(id) {
       socket.emit('get lists', id);
   });

   socket.on('show lists', function(data) {
      let listsViewDiv = $('#lists');

       listsViewDiv.html("");

       if (data && data.length > 0) {
           listsViewDiv.append(`<ul class="list-group list-group-flush">`);
           for (var i = 0; i < data.length; i++) {
               listsViewDiv.append(
                   `<li class="list-group-item">
                        <a href="/tasks/${data[i].list_id}">${data[i].name}</a>
                    </li>`);
            }

            listsViewDiv.append(`</ul>`);
        } else {    
            listsViewDiv.html(
                `<div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                    </svg>
                    <div class="empty-state">
                        <p class="empty-state-heading">Looks like you don't have any lists</p>
                        <p class="empty-state-description">Add a list using the input box above</p>
                    </div>
                </div>`);
        }
    });
});


function showEdit() {

}

function editList(listData) {
    //socket.emit('edit list', id);
}

function deleteList(listId, userId) {
    let data = {
        listId: listId,
        userId: userId
    };

    socket.emit('delete list', data);
}


