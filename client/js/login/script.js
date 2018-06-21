$(function() {
  $('#username-form').submit((e) => {
    let username = $(".username-txt").val();
    $(".username-txt").val('');
    if(typeof(Storage) === "undefined") { // local storage is not supported
      window.location = "game.html?q=" +username; // use query strings instead
    } else {
      sessionStorage.setItem('username', username);
      window.location = "game.html";
      e.preventDefault();
    }
  });
});
