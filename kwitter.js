function kwitter_login() {
    var username = document.getElementById("user_name").value;
    window.location = "kwitter_room.html";
    localStorage.setItem("username" , username);
}