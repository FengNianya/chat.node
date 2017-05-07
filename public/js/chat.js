
$(document).ready(function(){
  var chatHeight = getClientHeight() - $('#chatForm').innerHeight() - 100;
  $('#chat').css('height', chatHeight + 'px');
  $('#chat').scrollTop($('#chat')[0].scrollHeight);
  $('#users').css('max-height', $('.collection-item').innerHeight() * 8 + 6 + 'px');

  socket.emit('login', $('#admin').text());
  $(".back").click(function(){
    socket.emit('logout', $('#admin').text());
    socket.removeAllListeners('connect');
    io.sockets = {};
  });
});
