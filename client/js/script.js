function getUrlParameter(name) { /* Not my function */
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$(function() {
  let socket = io();
  if(typeof(Storage) === "undefined") { // local storage isn't supported
    // get username via Query String
    var username = getUrlParameter('username'); // var for global access
  } else {
    var username = sessionStorage.getItem('username'); // get the username from session (let in login page) (var for global access)
  }

  if(!username) { // redirect to login if the player doesn't have a username
    window.location = "index.html";
  }

  socket.emit('createPlayer', username); // create the new player with their username
});
