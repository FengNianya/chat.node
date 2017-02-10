
socket = io.connect();

socket.on('connect', function(){
  socket.on('login', function(name){
    toast(name+" on the line");
  });
  socket.on('usersList', function(names){
    var str = '';
    names.forEach(function(name){
      str += "<li class='collection-item'>"+ name +'</li>';
    });
    $('#users').html(str);
    $('#onlineNum').text(names.length);
  });
  socket.on('chat', function(data){
    var time = new Date();
    $('#chat-body').append(
    "<div class='col s11'>"
      +"<div class='card-panel'>"
        +"<span class='grey-text'>" + data.username + "：</span>"
        +"<span class='chat-content'>" + data.msg + "</span>"
        +"<span class='grey-text right'>" + time.getHours() + ":" + time.getMinutes() + "</span>"
      +"</div>"
    +"</div>"
    );
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
  });
});
socket.on('error', function(err){
  toast('connect error');
  socket.removeAllListeners('connect');
  io.sockets = {};
});
