
$(document).ready(function(){
  var err = $('#error').text();
  if(err !== ''){
    toast(err);
  }
});
