
var getClientHeight = function (){
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};
var toast = function(info){
  Materialize.toast(info, 1000, 'rounded');
}

$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.tooltipped').tooltip({delay: 50});
  $('.collapsible').collapsible({
    accordion : false
  });
});
